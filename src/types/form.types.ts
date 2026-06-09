import type { FormField } from './field.types';
import type {
  DependencyRule,
  RepeatableSection,
  ValidationRule,
  VisibilityRule,
} from './rule.types';

export interface FormRules {
  visibility: VisibilityRule[];
  validation: Record<string, ValidationRule[]>;
  dependencies: DependencyRule[];
}

export interface FormDefinition {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  sections: RepeatableSection[];
  rules: FormRules;
  createdAt: string;
  updatedAt: string;
  version: 1;
}

export interface FormForgeStorage {
  forms: FormDefinition[];
  activeFormId: string | null;
}

export const createEmptyFormRules = (): FormRules => ({
  visibility: [],
  validation: {},
  dependencies: [],
});
