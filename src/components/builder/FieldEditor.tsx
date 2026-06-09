import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FIELD_TYPES } from '../../constants/fieldTypes';
import { useFormStore } from '../../store/formStore';
import { useFormSections } from '../../hooks/useFormSelectors';
import type { FormField } from '../../types';
import { isValidFieldName } from '../../utils/fieldOrdering';

interface FieldEditorProps {
  field: FormField;
}

export const FieldEditor = ({ field }: FieldEditorProps) => {
  const updateField = useFormStore((s) => s.updateField);
  const sections = useFormSections();

  const nameError = Boolean(field.name) && !isValidFieldName(field.name);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Field Properties
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Label"
          size="small"
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          fullWidth
        />
        <TextField
          label="Name (camelCase)"
          size="small"
          value={field.name}
          onChange={(e) => updateField(field.id, { name: e.target.value })}
          error={nameError}
          helperText={nameError ? 'Must be camelCase (e.g. firstName)' : ''}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={field.type}
            onChange={(e) => updateField(field.id, { type: e.target.value as FormField['type'] })}
          >
            {FIELD_TYPES.map((ft) => (
              <MenuItem key={ft.type} value={ft.type}>
                {ft.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Placeholder"
          size="small"
          value={field.placeholder ?? ''}
          onChange={(e) => updateField(field.id, { placeholder: e.target.value || undefined })}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Section</InputLabel>
          <Select
            label="Section"
            value={field.sectionId ?? ''}
            onChange={(e) =>
              updateField(field.id, { sectionId: e.target.value || undefined })
            }
          >
            <MenuItem value="">None (standalone)</MenuItem>
            {sections.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={field.required}
              onChange={(e) => updateField(field.id, { required: e.target.checked })}
            />
          }
          label="Required"
        />
      </Box>

      {(field.type === 'select' || field.type === 'radio') && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Options (label:value per line)
          </Typography>
          <TextField
            multiline
            rows={3}
            size="small"
            fullWidth
            sx={{ mt: 0.5 }}
            value={(field.options ?? []).map((o) => `${o.label}:${o.value}`).join('\n')}
            onChange={(e) => {
              const options = e.target.value
                .split('\n')
                .filter(Boolean)
                .map((line) => {
                  const [label, value] = line.split(':');
                  return { label: label?.trim() ?? '', value: value?.trim() ?? label?.trim() ?? '' };
                });
              updateField(field.id, { options });
            }}
          />
        </Box>
      )}
    </Box>
  );
};
