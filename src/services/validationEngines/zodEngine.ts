import type { ValidationEngine } from './types';
import { generateZodSchema } from './generateZodSchema';

export const zodEngine: ValidationEngine = {
  id: 'zod',
  label: 'Zod',
  generate: (form) => {
    const module = generateZodSchema(form);
    const embedded = module
      .replace("import { z } from 'zod';\n\n", '')
      .replace('export const validationSchema', 'const validationSchema');

    return {
      module,
      embedded,
      imports: "import { z } from 'zod';\nimport { toFormikValidationSchema } from 'zod-formik-adapter';",
      formikBinding: 'validationSchema={toFormikValidationSchema(validationSchema)}',
    };
  },
};
