import type { FormDefinition, FormField } from '../types';
import { conditionsToExpression } from './conditionToExpression';

export interface CompiledVisibility {
  fieldId: string;
  expression: string;
}

export const compileVisibilityRules = (form: FormDefinition): CompiledVisibility[] =>
  form.rules.visibility.map((rule) => ({
    fieldId: rule.targetFieldId,
    expression: conditionsToExpression(rule.conditions, rule.logic),
  }));

export const getStandaloneFields = (form: FormDefinition): FormField[] =>
  form.fields.filter((f) => !f.sectionId);

export const getSectionFields = (
  form: FormDefinition,
  sectionId: string,
): FormField[] =>
  form.fields
    .filter((f) => f.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);

export const getVisibilityExpression = (
  form: FormDefinition,
  fieldId: string,
): string | null => {
  const rule = form.rules.visibility.find((r) => r.targetFieldId === fieldId);
  if (!rule) return null;
  return conditionsToExpression(rule.conditions, rule.logic);
};

export const toComponentName = (formName: string): string =>
  formName
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('') || 'GeneratedForm';
