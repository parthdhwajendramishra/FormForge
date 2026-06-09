import type { Condition, RuleLogic } from '../types';

const formatValue = (value: string | number | boolean): string => {
  if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
  if (typeof value === 'boolean') return String(value);
  return String(value);
};

export const conditionToExpression = (condition: Condition): string => {
  const field = `values.${condition.field}`;
  const value = formatValue(condition.value);

  switch (condition.operator) {
    case 'equals':
      return `${field} === ${value}`;
    case 'notEquals':
      return `${field} !== ${value}`;
    case 'greaterThan':
      return `Number(${field}) >= ${value}`;
    case 'lessThan':
      return `Number(${field}) < ${value}`;
    case 'contains':
      return `${field}?.includes(${value})`;
    case 'startsWith':
      return `${field}?.startsWith(${value})`;
    default:
      return 'true';
  }
};

export const conditionsToExpression = (
  conditions: Condition[],
  logic: RuleLogic = 'and',
): string => {
  if (conditions.length === 0) return 'true';
  const expressions = conditions.map(conditionToExpression);
  const joined = expressions.join(logic === 'and' ? ' && ' : ' || ');
  return expressions.length > 1 ? `(${joined})` : joined;
};
