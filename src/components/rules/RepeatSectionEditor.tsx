import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useFormStore } from '../../store/formStore';

export const RepeatSectionEditor = () => {
  const activeForm = useActiveForm();
  const addSection = useFormStore((s) => s.addSection);
  const updateSection = useFormStore((s) => s.updateSection);
  const deleteSection = useFormStore((s) => s.deleteSection);
  const updateField = useFormStore((s) => s.updateField);

  if (!activeForm) return null;

  const unassignedFields = activeForm.fields.filter((f) => !f.sectionId);

  const handleAddSection = () => {
    addSection({
      name: 'repeatableSection',
      label: 'Repeatable Section',
      fieldIds: [],
      minEntries: 0,
      maxEntries: 2,
    });
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Define repeatable sections using Formik FieldArray. Assign fields to sections in Field
        Properties.
      </Typography>

      {activeForm.sections.map((section) => (
        <Paper key={section.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2">{section.label}</Typography>
            <IconButton size="small" onClick={() => deleteSection(section.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              size="small"
              label="Section Label"
              value={section.label}
              onChange={(e) => updateSection(section.id, { label: e.target.value })}
            />
            <TextField
              size="small"
              label="Array Name (camelCase)"
              value={section.name}
              onChange={(e) => updateSection(section.id, { name: e.target.value })}
            />
            <TextField
              size="small"
              label="Min Entries"
              type="number"
              value={section.minEntries}
              onChange={(e) =>
                updateSection(section.id, { minEntries: Number(e.target.value) })
              }
            />
            <TextField
              size="small"
              label="Max Entries"
              type="number"
              value={section.maxEntries}
              onChange={(e) =>
                updateSection(section.id, { maxEntries: Number(e.target.value) })
              }
            />
          </Box>
          <FormControl size="small" fullWidth sx={{ mt: 2 }}>
            <InputLabel>Assign Fields</InputLabel>
            <Select
              multiple
              label="Assign Fields"
              value={section.fieldIds}
              onChange={(e) => {
                const fieldIds = e.target.value as string[];
                updateSection(section.id, { fieldIds });
                activeForm.fields.forEach((f) => {
                  if (fieldIds.includes(f.id)) {
                    updateField(f.id, { sectionId: section.id });
                  } else if (f.sectionId === section.id) {
                    updateField(f.id, { sectionId: undefined });
                  }
                });
              }}
              renderValue={(selected) =>
                selected
                  .map((id) => activeForm.fields.find((f) => f.id === id)?.label ?? id)
                  .join(', ')
              }
            >
              {activeForm.fields.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.label} ({f.name})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      ))}

      {unassignedFields.length > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {unassignedFields.length} standalone field(s) available for assignment
        </Typography>
      )}

      <Button size="small" startIcon={<AddIcon />} onClick={handleAddSection}>
        Add Repeatable Section
      </Button>
    </Box>
  );
};
