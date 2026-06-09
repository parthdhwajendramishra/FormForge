import { toComponentName } from '../../engine/ruleCompiler';
import { generateInitialValues } from '../codeGenerator/generateInitialValues';
import { generateYupSchema } from '../codeGenerator/generateYupSchema';
import { generateValidationSchema } from '../validationEngines';
import type { FormRenderer } from './types';
import { generateJsxComponent } from './jsx/generateJsxComponent';
import { generateJsxZodComponent } from './jsx/generateJsxZodComponent';

export const jsxRenderer: FormRenderer = {
  id: 'jsx',
  label: 'Plain React JSX',
  generate: (form, options) => {
    const fileName = `${toComponentName(form.name)}.tsx`;
    const initialValues = generateInitialValues(form);

    if (options.validationLibrary === 'zod') {
      const validation = generateValidationSchema(form, 'zod');
      return {
        component: generateJsxZodComponent(form),
        validationSchema: validation.module,
        initialValues,
        fileName,
        yupSchema: validation.module,
      };
    }

    const yupSchema = generateYupSchema(form);
    return {
      component: generateJsxComponent(form),
      validationSchema: yupSchema,
      initialValues,
      fileName,
      yupSchema,
    };
  },
};
