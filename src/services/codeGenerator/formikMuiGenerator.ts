import type { FormDefinition } from '../../types';
import { toComponentName } from '../../engine/ruleCompiler';
import { generateComponent } from './generateComponent';
import { generateInitialValues } from './generateInitialValues';
import { generateYupSchema } from './generateYupSchema';
import type { CodeGeneratorAdapter, GeneratedCode } from './types';

export const formikMuiGenerator: CodeGeneratorAdapter = {
  id: 'formik-mui',
  generate: (form: FormDefinition): GeneratedCode => ({
    component: generateComponent(form),
    yupSchema: generateYupSchema(form),
    initialValues: generateInitialValues(form),
    fileName: `${toComponentName(form.name)}.tsx`,
  }),
};
