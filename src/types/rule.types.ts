export type ConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'lessThan'
  | 'contains'
  | 'startsWith';

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string | number | boolean;
}

export type RuleLogic = 'and' | 'or';

export interface VisibilityRule {
  id: string;
  targetFieldId: string;
  conditions: Condition[];
  logic: RuleLogic;
}

export type ValidationRuleType =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'regex'
  | 'email'
  | 'phone';

export interface ValidationRule {
  id: string;
  type: ValidationRuleType;
  value?: string | number;
  message?: string;
  conditions?: Condition[];
  logic?: RuleLogic;
}

export interface DependencyRule {
  id: string;
  sourceFieldId: string;
  targetFieldId: string;
  conditions: Condition[];
  logic: RuleLogic;
  action: 'showOptions' | 'setRequired' | 'setVisible';
  payload?: unknown;
}

export interface RepeatableSection {
  id: string;
  name: string;
  label: string;
  fieldIds: string[];
  minEntries: number;
  maxEntries: number;
}
