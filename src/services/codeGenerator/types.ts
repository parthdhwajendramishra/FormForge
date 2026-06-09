import type { FormDefinition } from '../../types';

export interface GeneratedCode {
  component: string;
  validationSchema: string;
  initialValues: string;
  fileName: string;
  /** @deprecated Use validationSchema */
  yupSchema: string;
}

export interface CodeGeneratorAdapter {
  id: 'formik-mui' | 'rhf-mui' | 'json-schema';
  generate: (form: FormDefinition) => GeneratedCode;
}
