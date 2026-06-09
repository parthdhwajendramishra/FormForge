import type { FormDefinition, FormField } from '../../types';
import { getVisibilityExpression, toComponentName } from '../../engine/ruleCompiler';
import { generateFieldArrayBlock } from './generateFieldArray';
import { generateInitialValues } from './generateInitialValues';
import { generateYupSchema } from './generateYupSchema';

const indent = (level: number): string => '  '.repeat(level);

export const generateFieldJsx = (
  field: FormField,
  baseIndent: string,
  namePrefix = '',
): string => {
  const fieldName = `${namePrefix}${field.name}`;
  const label = field.label;
  const placeholder = field.placeholder ? ` placeholder="${field.placeholder}"` : '';

  switch (field.type) {
    case 'textarea':
      return `${baseIndent}<TextField
${baseIndent}  name="${fieldName}"
${baseIndent}  label="${label}"
${baseIndent}  multiline
${baseIndent}  rows={4}
${baseIndent}  fullWidth
${baseIndent}  margin="normal"${placeholder}
${baseIndent}/>`;

    case 'select':
      return `${baseIndent}<FormControl fullWidth margin="normal">
${baseIndent}  <InputLabel id="${field.name}-label">${label}</InputLabel>
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ field: formikField }) => (
${baseIndent}      <Select
${baseIndent}        {...formikField}
${baseIndent}        labelId="${field.name}-label"
${baseIndent}        label="${label}"
${baseIndent}        input={<OutlinedInput label="${label}" />}
${baseIndent}      >
${(field.options ?? []).map((opt) => `${baseIndent}        <MenuItem value="${opt.value}">${opt.label}</MenuItem>`).join('\n')}
${baseIndent}      </Select>
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component={FormHelperText} />
${baseIndent}</FormControl>`;

    case 'radio':
      return `${baseIndent}<FormControl component="fieldset" margin="normal">
${baseIndent}  <FormLabel component="legend">${label}</FormLabel>
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ field: formikField }) => (
${baseIndent}      <RadioGroup {...formikField} row>
${(field.options ?? []).map((opt) => `${baseIndent}        <FormControlLabel value="${opt.value}" control={<Radio />} label="${opt.label}" />`).join('\n')}
${baseIndent}      </RadioGroup>
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component={FormHelperText} />
${baseIndent}</FormControl>`;

    case 'checkbox':
      return `${baseIndent}<FormControl margin="normal">
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ field: formikField }) => (
${baseIndent}      <FormControlLabel
${baseIndent}        control={<Checkbox {...formikField} checked={!!formikField.value} />}
${baseIndent}        label="${label}"
${baseIndent}      />
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component={FormHelperText} />
${baseIndent}</FormControl>`;

    case 'file':
      return `${baseIndent}<FormControl fullWidth margin="normal">
${baseIndent}  <InputLabel shrink>${label}</InputLabel>
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ form: formikForm }) => (
${baseIndent}      <OutlinedInput
${baseIndent}        type="file"
${baseIndent}        inputProps={{ accept: '*/*' }}
${baseIndent}        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
${baseIndent}          formikForm.setFieldValue('${fieldName}', e.currentTarget.files?.[0] ?? null);
${baseIndent}        }}
${baseIndent}      />
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component={FormHelperText} />
${baseIndent}</FormControl>`;

    default:
      return `${baseIndent}<TextField
${baseIndent}  name="${fieldName}"
${baseIndent}  label="${label}"
${baseIndent}  type="${field.type === 'phone' ? 'tel' : field.type}"
${baseIndent}  fullWidth
${baseIndent}  margin="normal"${placeholder}
${baseIndent}/>`;
  }
};

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

export const generateComponent = (form: FormDefinition): string => {
  const componentName = toComponentName(form.name);
  const standaloneFields = form.fields.filter((f) => !f.sectionId);

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

  const initialValuesCode = generateInitialValues(form).replace('export const initialValues', 'const initialValues');
  const yupCode = generateYupSchema(form)
    .replace('import * as Yup from \'yup\';\n\n', '')
    .replace('export const validationSchema', 'const validationSchema');

  return `import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
    <Box component="form" sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        ${form.name}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
