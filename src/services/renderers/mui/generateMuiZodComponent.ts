import type { FormDefinition } from '../../../types';
import { getVisibilityExpression, toComponentName } from '../../../engine/ruleCompiler';
import { generateFieldArrayBlock } from '../../codeGenerator/generateFieldArray';
import { generateFieldJsx } from '../../codeGenerator/generateComponent';
import { generateInitialValues } from '../../codeGenerator/generateInitialValues';
import { generateValidationSchema } from '../../validationEngines';

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

export const generateMuiZodComponent = (form: FormDefinition): string => {
  const componentName = toComponentName(form.name);
  const standaloneFields = form.fields.filter((f) => !f.sectionId);
  const validation = generateValidationSchema(form, 'zod');

  const fieldBlocks = standaloneFields
    .map((field) => {
      const jsx = generateFieldJsx(field, indent(5));
      const visibility = getVisibilityExpression(form, field.id);
      return wrapWithVisibility(jsx, visibility, indent(4));
    })
    .join('\n\n');

  const sectionBlocks = form.sections
    .map((section) => generateFieldArrayBlock(form, section, indent(4)))
    .join('\n\n');

  const initialValuesCode = generateInitialValues(form).replace(
    'export const initialValues',
    'const initialValues',
  );

  return `import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
${validation.imports}
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

${initialValuesCode}

${validation.embedded}

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
    <Box component="form" sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        ${form.name}
      </Typography>
      <Formik
        initialValues={initialValues}
        ${validation.formikBinding}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
${fieldBlocks}
${sectionBlocks ? `\n${sectionBlocks}` : ''}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ${componentName};
`;
};
