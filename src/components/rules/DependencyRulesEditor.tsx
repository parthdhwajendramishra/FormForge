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
  Typography,
} from '@mui/material';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useFormStore } from '../../store/formStore';
import type { FormField } from '../../types';
import { generateId } from '../../utils/id';
import { ConditionBuilder } from './ConditionBuilder';

interface DependencyRulesEditorProps {
  field: FormField;
}

export const DependencyRulesEditor = ({ field }: DependencyRulesEditorProps) => {
  const activeForm = useActiveForm();
  const addDependencyRule = useFormStore((s) => s.addDependencyRule);
  const updateDependencyRule = useFormStore((s) => s.updateDependencyRule);
  const deleteDependencyRule = useFormStore((s) => s.deleteDependencyRule);

  if (!activeForm) return null;

  const rules = activeForm.rules.dependencies.filter((r) => r.targetFieldId === field.id);
  const availableFields = activeForm.fields.filter((f) => f.id !== field.id);

  const handleAdd = () => {
    const source = availableFields[0];
    addDependencyRule({
      sourceFieldId: source?.id ?? '',
      targetFieldId: field.id,
      conditions: [
        { id: generateId(), field: source?.name ?? '', operator: 'equals', value: '' },
      ],
      logic: 'and',
      action: 'setVisible',
    });
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Define dependencies for <strong>{field.label}</strong> based on other fields.
      </Typography>

      {rules.map((rule) => (
        <Paper key={rule.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Source Field</InputLabel>
              <Select
                label="Source Field"
                value={rule.sourceFieldId}
                onChange={(e) => updateDependencyRule(rule.id, { sourceFieldId: e.target.value })}
              >
                {availableFields.map((f) => (
                  <MenuItem key={f.id} value={f.id}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Action</InputLabel>
              <Select
                label="Action"
                value={rule.action}
                onChange={(e) =>
                  updateDependencyRule(rule.id, {
                    action: e.target.value as typeof rule.action,
                  })
                }
              >
                <MenuItem value="setVisible">Set Visible</MenuItem>
                <MenuItem value="setRequired">Set Required</MenuItem>
                <MenuItem value="showOptions">Show Options</MenuItem>
              </Select>
            </FormControl>
            <IconButton size="small" onClick={() => deleteDependencyRule(rule.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <ConditionBuilder
            conditions={rule.conditions}
            logic={rule.logic}
            availableFields={availableFields}
            onChange={(conditions, logic) =>
              updateDependencyRule(rule.id, { conditions, logic })
            }
          />
        </Paper>
      ))}

      <Button size="small" startIcon={<AddIcon />} onClick={handleAdd}>
        Add Dependency Rule
      </Button>
    </Box>
  );
};
