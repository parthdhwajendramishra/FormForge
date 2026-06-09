import { Box, Button, Typography } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import type { FormDefinition, RepeatableSection } from '../../types';
import { getSectionFields } from '../../engine/ruleCompiler';
import { isFieldVisible } from '../../services/formRuntime';
import { PreviewField } from './PreviewField';

interface PreviewSectionProps {
  form: FormDefinition;
  section: RepeatableSection;
}

export const PreviewSection = ({ form, section }: PreviewSectionProps) => {
  const { values } = useFormikContext<Record<string, unknown>>();
  const fields = getSectionFields(form, section.id);

  const buildEmptyEntry = (): Record<string, unknown> => {
    const entry: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === 'checkbox') entry[f.name] = false;
      else if (f.type === 'file') entry[f.name] = null;
      else if (f.type === 'number') entry[f.name] = '';
      else entry[f.name] = f.defaultValue ?? '';
    });
    return entry;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {section.label}
      </Typography>
      <FieldArray name={section.name}>
        {({ push, remove, form: formikForm }) => {
          const entries = (formikForm.values[section.name] as unknown[]) ?? [];
          return (
            <>
              {entries.map((_, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
                >
                  {fields.map((field) =>
                    isFieldVisible(form, field.id, values as Record<string, unknown>) ? (
                      <PreviewField
                        key={field.id}
                        field={field}
                        namePrefix={`${section.name}.${index}.`}
                      />
                    ) : null,
                  )}
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => remove(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              {entries.length < section.maxEntries && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => push(buildEmptyEntry())}
                >
                  Add {section.label}
                </Button>
              )}
            </>
          );
        }}
      </FieldArray>
    </Box>
  );
};
