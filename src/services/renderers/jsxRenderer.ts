import type { FormDefinition } from '../../types';
import { toComponentName } from '../../engine/ruleCompiler';
import { generateInitialValues } from '../codeGenerator/generateInitialValues';
import { generateYupSchema } from '../codeGenerator/generateYupSchema';
import type { FormRenderer } from './types';
import { generateJsxComponent } from './jsx/generateJsxComponent';

export const jsxRenderer: FormRenderer = {
  id: 'jsx',
  label: 'Plain React JSX',
  generate: (form: FormDefinition) => ({
    component: generateJsxComponent(form),
    yupSchema: generateYupSchema(form),
    initialValues: generateInitialValues(form),
    fileName: `${toComponentName(form.name)}.tsx`,
  }),
};
