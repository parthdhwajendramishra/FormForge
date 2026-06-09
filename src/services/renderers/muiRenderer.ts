import { formikMuiGenerator } from '../codeGenerator/formikMuiGenerator';
import { generateValidationSchema } from '../validationEngines';
import type { FormRenderer } from './types';
import { generateMuiZodComponent } from './mui/generateMuiZodComponent';

export const muiRenderer: FormRenderer = {
  id: 'mui',
  label: 'Material UI',
  generate: (form, options) => {
    if (options.validationLibrary === 'zod') {
      const base = formikMuiGenerator.generate(form);
      const validation = generateValidationSchema(form, 'zod');
      return {
        component: generateMuiZodComponent(form),
        validationSchema: validation.module,
        initialValues: base.initialValues,
        fileName: base.fileName,
        yupSchema: validation.module,
      };
    }

    const generated = formikMuiGenerator.generate(form);
    return {
      ...generated,
      validationSchema: generated.yupSchema,
    };
  },
};
