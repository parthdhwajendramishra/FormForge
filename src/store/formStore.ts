import { create } from 'zustand';
import { getFieldTypeConfig } from '../constants/fieldTypes';
import type {
  DependencyRule,
  FormDefinition,
  FormField,
  FormForgeStorage,
  RepeatableSection,
  ValidationRule,
  VisibilityRule,
} from '../types';
import { createEmptyFormRules } from '../types';
import { generateId } from '../utils/id';
import { getNextFieldOrder, sortFieldsByOrder, toCamelCase } from '../utils/fieldOrdering';
import { getTemplateById } from '../templates';

interface FormStoreState {
  forms: FormDefinition[];
  activeFormId: string | null;
}

interface FormStoreActions {
  createForm: (name?: string) => void;
  createFromTemplate: (templateId: string) => void;
  deleteForm: (id: string) => void;
  setActiveForm: (id: string) => void;
  updateFormMeta: (partial: Partial<Pick<FormDefinition, 'name' | 'description'>>) => void;
  addField: (partial: Partial<FormField> & { type: FormField['type'] }) => void;
  updateField: (id: string, partial: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  reorderField: (id: string, direction: 'up' | 'down') => void;
  addSection: (section: Omit<RepeatableSection, 'id'>) => void;
  updateSection: (id: string, partial: Partial<RepeatableSection>) => void;
  deleteSection: (id: string) => void;
  addVisibilityRule: (rule: Omit<VisibilityRule, 'id'>) => void;
  updateVisibilityRule: (id: string, partial: Partial<VisibilityRule>) => void;
  deleteVisibilityRule: (id: string) => void;
  updateValidationRules: (fieldId: string, rules: ValidationRule[]) => void;
  addDependencyRule: (rule: Omit<DependencyRule, 'id'>) => void;
  updateDependencyRule: (id: string, partial: Partial<DependencyRule>) => void;
  deleteDependencyRule: (id: string) => void;
  importForm: (definition: FormDefinition, replace?: boolean) => void;
  hydrate: (storage: FormForgeStorage) => void;
}

export type FormStore = FormStoreState & FormStoreActions;

const cloneForm = (form: FormDefinition): FormDefinition =>
  JSON.parse(JSON.stringify(form)) as FormDefinition;

const createEmptyForm = (name = 'Untitled Form'): FormDefinition => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    fields: [],
    sections: [],
    rules: createEmptyFormRules(),
    createdAt: now,
    updatedAt: now,
    version: 1,
  };
};

const updateActiveForm = (
  state: FormStoreState,
  updater: (form: FormDefinition) => FormDefinition,
): Partial<FormStoreState> => {
  if (!state.activeFormId) return {};
  const forms = state.forms.map((form) => {
    if (form.id !== state.activeFormId) return form;
    const updated = updater(form);
    return { ...updated, updatedAt: new Date().toISOString() };
  });
  return { forms };
};

const cascadeDeleteField = (form: FormDefinition, fieldId: string): FormDefinition => {
  const validation = { ...form.rules.validation };
  delete validation[fieldId];

  return {
    ...form,
    fields: form.fields.filter((f) => f.id !== fieldId),
    sections: form.sections.map((section) => ({
      ...section,
      fieldIds: section.fieldIds.filter((id) => id !== fieldId),
    })),
    rules: {
      visibility: form.rules.visibility.filter((r) => r.targetFieldId !== fieldId),
      validation,
      dependencies: form.rules.dependencies.filter(
        (r) => r.sourceFieldId !== fieldId && r.targetFieldId !== fieldId,
      ),
    },
  };
};

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  activeFormId: null,

  createForm: (name) => {
    const form = createEmptyForm(name);
    set((state) => ({
      forms: [...state.forms, form],
      activeFormId: form.id,
    }));
  },

  createFromTemplate: (templateId) => {
    const template = getTemplateById(templateId);
    if (!template) return;

    const now = new Date().toISOString();
    const form: FormDefinition = {
      ...cloneForm(template),
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      forms: [...state.forms, form],
      activeFormId: form.id,
    }));
  },

  deleteForm: (id) => {
    set((state) => {
      const forms = state.forms.filter((f) => f.id !== id);
      let activeFormId = state.activeFormId;
      if (activeFormId === id) {
        activeFormId = forms.length > 0 ? forms[0].id : null;
      }
      return { forms, activeFormId };
    });
  },

  setActiveForm: (id) => set({ activeFormId: id }),

  updateFormMeta: (partial) =>
    set((state) => updateActiveForm(state, (form) => ({ ...form, ...partial }))),

  addField: (partial) =>
    set((state) =>
      updateActiveForm(state, (form) => {
        const config = getFieldTypeConfig(partial.type);
        const label = partial.label ?? config.defaultLabel;
        const name = partial.name ?? toCamelCase(label) + (form.fields.length + 1);
        const field: FormField = {
          id: generateId(),
          name,
          label,
          type: partial.type,
          required: partial.required ?? false,
          placeholder: partial.placeholder,
          defaultValue: partial.defaultValue,
          order: getNextFieldOrder(form.fields),
          options: config.hasOptions
            ? (partial.options ?? [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
              ])
            : undefined,
          sectionId: partial.sectionId,
          helperText: partial.helperText,
        };
        return { ...form, fields: [...form.fields, field] };
      }),
    ),

  updateField: (id, partial) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        fields: form.fields.map((f) => (f.id === id ? { ...f, ...partial } : f)),
      })),
    ),

  deleteField: (id) =>
    set((state) => updateActiveForm(state, (form) => cascadeDeleteField(form, id))),

  reorderField: (id, direction) =>
    set((state) =>
      updateActiveForm(state, (form) => {
        const sorted = sortFieldsByOrder(form.fields);
        const index = sorted.findIndex((f) => f.id === id);
        if (index === -1) return form;

        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= sorted.length) return form;

        const current = sorted[index];
        const swap = sorted[swapIndex];
        const fields = form.fields.map((f) => {
          if (f.id === current.id) return { ...f, order: swap.order };
          if (f.id === swap.id) return { ...f, order: current.order };
          return f;
        });
        return { ...form, fields };
      }),
    ),

  addSection: (section) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        sections: [...form.sections, { ...section, id: generateId() }],
      })),
    ),

  updateSection: (id, partial) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        sections: form.sections.map((s) => (s.id === id ? { ...s, ...partial } : s)),
      })),
    ),

  deleteSection: (id) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        sections: form.sections.filter((s) => s.id !== id),
        fields: form.fields.map((f) =>
          f.sectionId === id ? { ...f, sectionId: undefined } : f,
        ),
      })),
    ),

  addVisibilityRule: (rule) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          visibility: [...form.rules.visibility, { ...rule, id: generateId() }],
        },
      })),
    ),

  updateVisibilityRule: (id, partial) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          visibility: form.rules.visibility.map((r) =>
            r.id === id ? { ...r, ...partial } : r,
          ),
        },
      })),
    ),

  deleteVisibilityRule: (id) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          visibility: form.rules.visibility.filter((r) => r.id !== id),
        },
      })),
    ),

  updateValidationRules: (fieldId, rules) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          validation: { ...form.rules.validation, [fieldId]: rules },
        },
      })),
    ),

  addDependencyRule: (rule) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          dependencies: [...form.rules.dependencies, { ...rule, id: generateId() }],
        },
      })),
    ),

  updateDependencyRule: (id, partial) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          dependencies: form.rules.dependencies.map((r) =>
            r.id === id ? { ...r, ...partial } : r,
          ),
        },
      })),
    ),

  deleteDependencyRule: (id) =>
    set((state) =>
      updateActiveForm(state, (form) => ({
        ...form,
        rules: {
          ...form.rules,
          dependencies: form.rules.dependencies.filter((r) => r.id !== id),
        },
      })),
    ),

  importForm: (definition, replace = false) => {
    set((state) => {
      const existingIndex = state.forms.findIndex((f) => f.id === definition.id);
      if (existingIndex >= 0 && replace) {
        const forms = [...state.forms];
        forms[existingIndex] = { ...definition, updatedAt: new Date().toISOString() };
        return { forms, activeFormId: definition.id };
      }
      const form: FormDefinition = {
        ...definition,
        id: replace && existingIndex >= 0 ? definition.id : generateId(),
        updatedAt: new Date().toISOString(),
      };
      return {
        forms: [...state.forms, form],
        activeFormId: form.id,
      };
    });
  },

  hydrate: (storage) =>
    set({
      forms: storage.forms,
      activeFormId: storage.activeFormId,
    }),
}));

export const selectActiveForm = (state: FormStore): FormDefinition | null =>
  state.forms.find((f) => f.id === state.activeFormId) ?? null;

const EMPTY_FIELDS: FormField[] = [];

export const selectSortedFields = (state: FormStore): FormField[] => {
  const form = selectActiveForm(state);
  if (!form || form.fields.length === 0) return EMPTY_FIELDS;
  return sortFieldsByOrder(form.fields);
};
