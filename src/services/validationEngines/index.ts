import type { FormDefinition } from '../../types';
import type { ValidationEngine, ValidationLibrary } from './types';
import { yupEngine } from './yupEngine';
import { zodEngine } from './zodEngine';

const engineRegistry: Record<ValidationLibrary, ValidationEngine> = {
  yup: yupEngine,
  zod: zodEngine,
};

export const getValidationEngine = (library: ValidationLibrary): ValidationEngine =>
  engineRegistry[library] ?? yupEngine;

export const generateValidationSchema = (
  form: FormDefinition,
  library: ValidationLibrary,
) => getValidationEngine(library).generate(form);

export { yupEngine, zodEngine };
export type { ValidationEngine, ValidationLibrary, ValidationSchemaOutput } from './types';
export { VALIDATION_ENGINE_OPTIONS } from './types';
