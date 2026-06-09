import type { ConditionOperator } from '../types';

export interface OperatorConfig {
  value: ConditionOperator;
  label: string;
}

export const CONDITION_OPERATORS: OperatorConfig[] = [
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not Equals' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
  { value: 'startsWith', label: 'Starts With' },
];

export const VALIDATION_RULE_TYPES = [
  { value: 'required', label: 'Required' },
  { value: 'minLength', label: 'Min Length' },
  { value: 'maxLength', label: 'Max Length' },
  { value: 'min', label: 'Min Value' },
  { value: 'max', label: 'Max Value' },
  { value: 'regex', label: 'Regex Pattern' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
] as const;
