import type { FormDefinition } from '../../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const isObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === 'object' && val !== null && !Array.isArray(val);

export const validateFormDefinition = (data: unknown): ValidationResult => {
  const errors: string[] = [];

  if (!isObject(data)) {
    return { valid: false, errors: ['Root must be an object'] };
  }

  if (typeof data.id !== 'string') errors.push('Missing or invalid id');
  if (typeof data.name !== 'string') errors.push('Missing or invalid name');
  if (!Array.isArray(data.fields)) errors.push('fields must be an array');
  if (!Array.isArray(data.sections)) errors.push('sections must be an array');
  if (!isObject(data.rules)) errors.push('rules must be an object');

  if (Array.isArray(data.fields)) {
    data.fields.forEach((field, i) => {
      if (!isObject(field)) {
        errors.push(`fields[${i}] must be an object`);
        return;
      }
      if (typeof field.id !== 'string') errors.push(`fields[${i}].id is required`);
      if (typeof field.name !== 'string') errors.push(`fields[${i}].name is required`);
      if (typeof field.label !== 'string') errors.push(`fields[${i}].label is required`);
      if (typeof field.type !== 'string') errors.push(`fields[${i}].type is required`);
    });
  }

  return { valid: errors.length === 0, errors };
};

export const parseFormDefinition = (data: unknown): FormDefinition | null => {
  const result = validateFormDefinition(data);
  if (!result.valid) return null;
  return data as FormDefinition;
};

export const parseFormDefinitions = (
  data: unknown,
): { forms: FormDefinition[]; errors: string[] } => {
  if (Array.isArray(data)) {
    const errors: string[] = [];
    const forms: FormDefinition[] = [];
    data.forEach((item, i) => {
      const result = validateFormDefinition(item);
      if (result.valid) {
        forms.push(item as FormDefinition);
      } else {
        errors.push(`Item ${i}: ${result.errors.join(', ')}`);
      }
    });
    return { forms, errors };
  }

  const result = validateFormDefinition(data);
  if (result.valid) {
    return { forms: [data as FormDefinition], errors: [] };
  }
  return { forms: [], errors: result.errors };
};
