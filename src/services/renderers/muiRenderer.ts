import { formikMuiGenerator } from '../codeGenerator/formikMuiGenerator';
import type { FormRenderer } from './types';

export const muiRenderer: FormRenderer = {
  id: 'mui',
  label: 'Material UI',
  generate: (form) => formikMuiGenerator.generate(form),
};
