import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useFormStore } from '../../store/formStore';
import type { FormField } from '../../types';
import { generateId } from '../../utils/id';
import { ConditionBuilder } from './ConditionBuilder';

interface VisibilityRulesEditorProps {
  field: FormField;
}

export const VisibilityRulesEditor = ({ field }: VisibilityRulesEditorProps) => {
  const activeForm = useActiveForm();
  const addVisibilityRule = useFormStore((s) => s.addVisibilityRule);
  const updateVisibilityRule = useFormStore((s) => s.updateVisibilityRule);
  const deleteVisibilityRule = useFormStore((s) => s.deleteVisibilityRule);

  if (!activeForm) return null;

  const rules = activeForm.rules.visibility.filter((r) => r.targetFieldId === field.id);
  const availableFields = activeForm.fields.filter((f) => f.id !== field.id);

  const handleAdd = () => {
    const firstField = availableFields[0];
    addVisibilityRule({
      targetFieldId: field.id,
      conditions: [
        { id: generateId(), field: firstField?.name ?? '', operator: 'equals', value: '' },
      ],
      logic: 'and',
    });
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Show <strong>{field.label}</strong> when conditions are met.
      </Typography>

      {rules.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          No visibility rules. Field is always visible.
        </Typography>
      )}

      {rules.map((rule) => (
        <Paper key={rule.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption">When</Typography>
            <IconButton size="small" onClick={() => deleteVisibilityRule(rule.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <ConditionBuilder
            conditions={rule.conditions}
            logic={rule.logic}
            availableFields={availableFields}
            onChange={(conditions, logic) =>
              updateVisibilityRule(rule.id, { conditions, logic })
            }
          />
        </Paper>
      ))}

      <Button size="small" startIcon={<AddIcon />} onClick={handleAdd}>
        Add Visibility Rule
      </Button>
    </Box>
  );
};
