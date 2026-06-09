import type { FormDefinition } from '../../types';
import { formikMuiGenerator } from './formikMuiGenerator';
import type { GeneratedCode } from './types';

export const generateCode = (form: FormDefinition): GeneratedCode =>
  formikMuiGenerator.generate(form);

export { formikMuiGenerator };
export type { GeneratedCode, CodeGeneratorAdapter } from './types';
