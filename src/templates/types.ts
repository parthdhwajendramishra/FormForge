import type { FormDefinition } from '../types';

export type TemplateCategory =
  | 'basic'
  | 'validation'
  | 'conditional'
  | 'repeatable'
  | 'business';

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  /** Short copy for landing page cards */
  marketingDescription?: string;
  category: TemplateCategory;
  /** Features demonstrated by this template */
  features: string[];
  /** Show on landing page showcase */
  featured: boolean;
  definition: FormDefinition;
}

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  basic: 'Basic Forms',
  validation: 'Validation Showcase',
  conditional: 'Conditional Logic',
  repeatable: 'Repeatable Sections',
  business: 'Business Forms',
};

export const TEMPLATE_CATEGORY_ORDER: TemplateCategory[] = [
  'basic',
  'validation',
  'conditional',
  'repeatable',
  'business',
];
