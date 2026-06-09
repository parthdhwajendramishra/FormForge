import type { FormDefinition } from '../../types';

export type ValidationLibrary = 'yup' | 'zod';

export interface ValidationEngineOption {
  id: ValidationLibrary;
  label: string;
}

export interface ValidationSchemaOutput {
  /** Full standalone schema module */
  module: string;
  /** Schema body embedded inside a component file */
  embedded: string;
  /** Import lines required by the component */
  imports: string;
  /** Formik validationSchema prop value */
  formikBinding: string;
}

export interface ValidationEngine {
  id: ValidationLibrary;
  label: string;
  generate: (form: FormDefinition) => ValidationSchemaOutput;
}

export const VALIDATION_ENGINE_OPTIONS: ValidationEngineOption[] = [
  { id: 'yup', label: 'Yup' },
  { id: 'zod', label: 'Zod' },
];
