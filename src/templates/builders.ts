import type { Condition, FormDefinition, ValidationRule, VisibilityRule } from '../types';
import { createEmptyFormRules } from '../types';
import type { FormField } from '../types/field.types';
import type { DependencyRule } from '../types/rule.types';
import { generateId } from '../utils/id';

const NOW = new Date().toISOString();

export const cond = (
  field: string,
  operator: Condition['operator'],
  value: Condition['value'],
): Condition => ({
  id: generateId(),
  field,
  operator,
  value,
});

export const req = (message?: string): ValidationRule => ({
  id: generateId(),
  type: 'required',
  message,
});

export const createTemplateShell = (
  slug: string,
  name: string,
  description: string,
): Omit<FormDefinition, 'fields' | 'rules'> => ({
  id: `template-${slug}`,
  name,
  description,
  version: 1,
  createdAt: NOW,
  updatedAt: NOW,
  sections: [],
});

export const buildTemplate = (
  shell: Omit<FormDefinition, 'fields' | 'rules'>,
  fields: FormField[],
  rules?: Partial<{
    visibility: VisibilityRule[];
    validation: Record<string, ValidationRule[]>;
    dependencies: DependencyRule[];
  }>,
): FormDefinition => ({
  ...shell,
  fields,
  rules: {
    ...createEmptyFormRules(),
    visibility: rules?.visibility ?? [],
    validation: rules?.validation ?? {},
    dependencies: rules?.dependencies ?? [],
  },
});
