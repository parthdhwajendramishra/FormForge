import type { FormDefinition } from '../../types';
import { evaluateConditions } from '../../engine/conditionEvaluator';

export const isFieldVisible = (
  form: FormDefinition,
  fieldId: string,
  values: Record<string, unknown>,
): boolean => {
  const rules = form.rules.visibility.filter((r) => r.targetFieldId === fieldId);
  if (rules.length === 0) return true;
  return rules.some((rule) => evaluateConditions(rule.conditions, values, rule.logic));
};
