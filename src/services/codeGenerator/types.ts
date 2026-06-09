import type { FormDefinition } from '../../types';

export interface GeneratedCode {
  component: string;
  yupSchema: string;
  initialValues: string;
  fileName: string;
}

export interface CodeGeneratorAdapter {
  id: 'formik-mui' | 'rhf-mui' | 'json-schema';
  generate: (form: FormDefinition) => GeneratedCode;
}
