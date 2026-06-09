import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useMemo, useState } from 'react';
import { getStandaloneFields } from '../../engine/ruleCompiler';
import { useActiveForm } from '../../hooks/useFormSelectors';
import {
  buildInitialValues,
  buildValidationSchema,
  isFieldVisible,
} from '../../services/formRuntime';
import { EmptyState } from '../common/EmptyState';
import { PreviewField } from './PreviewField';
import { PreviewSection } from './PreviewSection';

export const FormPreview = () => {
  const activeForm = useActiveForm();
  const [submittedValues, setSubmittedValues] = useState<Record<string, unknown> | null>(null);

  const formKey = activeForm ? `${activeForm.id}-${activeForm.updatedAt}` : 'empty';

  const { initialValues, validationSchema, standaloneFields } = useMemo(() => {
    if (!activeForm) {
      return { initialValues: {}, validationSchema: undefined, standaloneFields: [] };
    }
    return {
      initialValues: buildInitialValues(activeForm),
      validationSchema: buildValidationSchema(activeForm),
      standaloneFields: getStandaloneFields(activeForm).sort((a, b) => a.order - b.order),
    };
  }, [activeForm]);

  if (!activeForm) {
    return (
      <EmptyState
        title="No form selected"
        description="Select or create a form to preview it here."
      />
    );
  }

  if (activeForm.fields.length === 0) {
    return (
      <EmptyState
        title="No fields to preview"
        description="Add fields in the Design tab, then switch back here to see your live form."
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">{activeForm.name}</Typography>
        {activeForm.description && (
          <Typography variant="body2" color="text.secondary">
            {activeForm.description}
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 640, mx: 'auto' }}>
          <Formik
            key={formKey}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
            onSubmit={(values) => {
              setSubmittedValues(values);
            }}
          >
            {({ values, isSubmitting, errors, submitCount }) => (
              <Form>
                {standaloneFields.map((field) =>
                  isFieldVisible(activeForm, field.id, values as Record<string, unknown>) ? (
                    <PreviewField key={field.id} field={field} />
                  ) : null,
                )}

                {activeForm.sections.map((section) => (
                  <PreviewSection key={section.id} form={activeForm} section={section} />
                ))}

                <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 2 }}>
                  Submit
                </Button>

                {submitCount > 0 && Object.keys(errors).length > 0 && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Please fix validation errors before submitting.
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </Paper>

        {submittedValues && (
          <Paper variant="outlined" sx={{ p: 2, mt: 2, maxWidth: 640, mx: 'auto', bgcolor: 'success.50' }}>
            <Typography variant="subtitle2" gutterBottom color="success.dark">
              Form submitted successfully
            </Typography>
            <Box
              component="pre"
              sx={{
                m: 0,
                fontSize: '0.75rem',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {JSON.stringify(submittedValues, null, 2)}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
