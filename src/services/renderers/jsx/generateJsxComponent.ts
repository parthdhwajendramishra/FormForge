import type { FormDefinition } from '../../../types';
import { getVisibilityExpression, toComponentName } from '../../../engine/ruleCompiler';
import { generateInitialValues } from '../../codeGenerator/generateInitialValues';
import { generateYupSchema } from '../../codeGenerator/generateYupSchema';
import { generateJsxFieldArrayBlock } from './generateJsxFieldArray';
import { generateJsxField } from './generateJsxField';

const indent = (level: number): string => '  '.repeat(level);

const wrapWithVisibility = (
  jsx: string,
  expression: string | null,
  baseIndent: string,
): string => {
  if (!expression) return jsx;
  return `${baseIndent}{${expression} && (
${jsx}
${baseIndent})}`;
};

export const generateJsxComponent = (form: FormDefinition): string => {
  const componentName = toComponentName(form.name);
  const standaloneFields = form.fields.filter((f) => !f.sectionId);

  const fieldBlocks = standaloneFields
    .map((field) => {
      const jsx = generateJsxField(field, indent(5));
      const visibility = getVisibilityExpression(form, field.id);
      return wrapWithVisibility(jsx, visibility, indent(4));
    })
    .join('\n\n');

  const sectionBlocks = form.sections
    .map((section) => generateJsxFieldArrayBlock(form, section, indent(4)))
    .join('\n\n');

  const initialValuesCode = generateInitialValues(form).replace(
    'export const initialValues',
    'const initialValues',
  );
  const yupCode = generateYupSchema(form)
    .replace("import * as Yup from 'yup';\n\n", '')
    .replace('export const validationSchema', 'const validationSchema');

  return `import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

${initialValuesCode}

${yupCode}

interface ${componentName}Props {
  onSubmit?: (values: typeof initialValues) => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ onSubmit }) => {
  const handleSubmit = (values: typeof initialValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log('Form submitted:', values);
    }
  };

  return (
    <div>
      <h1>${form.name}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
${fieldBlocks}
${sectionBlocks ? `\n${sectionBlocks}` : ''}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ${componentName};
`;
};
