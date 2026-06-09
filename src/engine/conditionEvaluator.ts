import type { Condition, RuleLogic } from '../types';

const evaluateCondition = (
  condition: Condition,
  values: Record<string, unknown>,
): boolean => {
  const fieldValue = values[condition.field];
  const target = condition.value;

  switch (condition.operator) {
    case 'equals':
      return fieldValue === target;
    case 'notEquals':
      return fieldValue !== target;
    case 'greaterThan':
      return Number(fieldValue) >= Number(target);
    case 'lessThan':
      return Number(fieldValue) < Number(target);
    case 'contains':
      return String(fieldValue ?? '').includes(String(target));
    case 'startsWith':
      return String(fieldValue ?? '').startsWith(String(target));
    default:
      return true;
  }
};

export const evaluateConditions = (
  conditions: Condition[],
  values: Record<string, unknown>,
  logic: RuleLogic = 'and',
): boolean => {
  if (conditions.length === 0) return true;
  if (logic === 'and') {
    return conditions.every((c) => evaluateCondition(c, values));
  }
  return conditions.some((c) => evaluateCondition(c, values));
};
