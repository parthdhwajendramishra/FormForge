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
import { VALIDATION_RULE_TYPES } from '../../constants/operators';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useFormStore } from '../../store/formStore';
import type { FormField, ValidationRule, ValidationRuleType } from '../../types';
import { generateId } from '../../utils/id';
import { ConditionBuilder } from './ConditionBuilder';

interface ValidationRulesEditorProps {
  field: FormField;
}

export const ValidationRulesEditor = ({ field }: ValidationRulesEditorProps) => {
  const activeForm = useActiveForm();
  const updateValidationRules = useFormStore((s) => s.updateValidationRules);

  if (!activeForm) return null;

  const rules = activeForm.rules.validation[field.id] ?? [];
  const availableFields = activeForm.fields.filter((f) => f.id !== field.id);

  const setRules = (updated: ValidationRule[]) => updateValidationRules(field.id, updated);

  const addRule = () => {
    setRules([...rules, { id: generateId(), type: 'required', message: '' }]);
  };

  const updateRule = (index: number, partial: Partial<ValidationRule>) => {
    setRules(rules.map((r, i) => (i === index ? { ...r, ...partial } : r)));
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const needsValue = (type: ValidationRuleType) =>
    ['minLength', 'maxLength', 'min', 'max', 'regex'].includes(type);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Validation rules for <strong>{field.label}</strong>.
      </Typography>

      {rules.map((rule, index) => (
        <Paper key={rule.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Rule Type</InputLabel>
              <Select
                label="Rule Type"
                value={rule.type}
                onChange={(e) =>
                  updateRule(index, { type: e.target.value as ValidationRuleType })
                }
              >
                {VALIDATION_RULE_TYPES.map((rt) => (
                  <MenuItem key={rt.value} value={rt.value}>
                    {rt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {needsValue(rule.type) && (
              <TextField
                size="small"
                label="Value"
                value={rule.value ?? ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  const num = Number(raw);
                  updateRule(index, {
                    value: !isNaN(num) && raw !== '' ? num : raw,
                  });
                }}
                sx={{ width: 120 }}
              />
            )}
            <TextField
              size="small"
              label="Error Message"
              value={rule.message ?? ''}
              onChange={(e) => updateRule(index, { message: e.target.value || undefined })}
              sx={{ flex: 1 }}
            />
            <IconButton size="small" onClick={() => removeRule(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Apply only when (optional):
          </Typography>
          <ConditionBuilder
            conditions={rule.conditions ?? []}
            logic={rule.logic ?? 'and'}
            availableFields={availableFields}
            onChange={(conditions, logic) =>
              updateRule(index, {
                conditions: conditions.length > 0 ? conditions : undefined,
                logic,
              })
            }
          />
        </Paper>
      ))}

      <Button size="small" startIcon={<AddIcon />} onClick={addRule}>
        Add Validation Rule
      </Button>
    </Box>
  );
};
