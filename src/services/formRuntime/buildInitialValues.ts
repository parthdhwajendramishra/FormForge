import type { FormDefinition, FormField, RepeatableSection } from '../../types';
import { getSectionFields } from '../../engine/ruleCompiler';

const getFieldDefault = (field: FormField): unknown => {
  if (field.defaultValue !== undefined) return field.defaultValue;

  switch (field.type) {
    case 'number':
      return '';
    case 'checkbox':
      return false;
    case 'file':
      return null;
    default:
      return '';
  }
};

const buildSectionEntry = (form: FormDefinition, section: RepeatableSection): Record<string, unknown> => {
  const fields = getSectionFields(form, section.id);
  return Object.fromEntries(fields.map((f) => [f.name, getFieldDefault(f)]));
};

export const buildInitialValues = (form: FormDefinition): Record<string, unknown> => {
  const values: Record<string, unknown> = {};

  form.fields
    .filter((f) => !f.sectionId)
    .forEach((field) => {
      values[field.name] = getFieldDefault(field);
    });

  form.sections.forEach((section) => {
    if (section.minEntries > 0) {
      values[section.name] = Array.from({ length: section.minEntries }, () =>
        buildSectionEntry(form, section),
      );
    } else {
      values[section.name] = [];
    }
  });

  return values;
};
