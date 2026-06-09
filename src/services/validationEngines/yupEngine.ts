import { generateYupSchema } from '../codeGenerator/generateYupSchema';
import type { ValidationEngine } from './types';

export const yupEngine: ValidationEngine = {
  id: 'yup',
  label: 'Yup',
  generate: (form) => {
    const module = generateYupSchema(form);
    const embedded = module
      .replace("import * as Yup from 'yup';\n\n", '')
      .replace('export const validationSchema', 'const validationSchema');

    return {
      module,
      embedded,
      imports: "import * as Yup from 'yup';",
      formikBinding: 'validationSchema={validationSchema}',
    };
  },
};
