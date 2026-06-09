import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { CONDITION_OPERATORS } from '../../constants/operators';
import type { Condition, FormField, RuleLogic } from '../../types';
import { generateId } from '../../utils/id';

interface ConditionBuilderProps {
  conditions: Condition[];
  logic: RuleLogic;
  availableFields: FormField[];
  onChange: (conditions: Condition[], logic: RuleLogic) => void;
}

export const ConditionBuilder = ({
  conditions,
  logic,
  availableFields,
  onChange,
}: ConditionBuilderProps) => {
  const updateCondition = (index: number, partial: Partial<Condition>) => {
    const updated = conditions.map((c, i) => (i === index ? { ...c, ...partial } : c));
    onChange(updated, logic);
  };

  const addCondition = () => {
    const firstField = availableFields[0];
    onChange(
      [
        ...conditions,
        {
          id: generateId(),
          field: firstField?.name ?? '',
          operator: 'equals',
          value: '',
        },
      ],
      logic,
    );
  };

  const removeCondition = (index: number) => {
    onChange(
      conditions.filter((_, i) => i !== index),
      logic,
    );
  };

  return (
    <Box>
      {conditions.length > 1 && (
        <ToggleButtonGroup
          size="small"
          value={logic}
          exclusive
          onChange={(_, val) => val && onChange(conditions, val as RuleLogic)}
          sx={{ mb: 1 }}
        >
          <ToggleButton value="and">AND</ToggleButton>
          <ToggleButton value="or">OR</ToggleButton>
        </ToggleButtonGroup>
      )}

      {conditions.map((condition, index) => (
        <Box key={condition.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Field</InputLabel>
            <Select
              label="Field"
              value={condition.field}
              onChange={(e) => updateCondition(index, { field: e.target.value })}
            >
              {availableFields.map((f) => (
                <MenuItem key={f.id} value={f.name}>
                  {f.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              label="Operator"
              value={condition.operator}
              onChange={(e) =>
                updateCondition(index, { operator: e.target.value as Condition['operator'] })
              }
            >
              {CONDITION_OPERATORS.map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Value"
            value={condition.value}
            onChange={(e) => {
              const raw = e.target.value;
              const num = Number(raw);
              const value = !isNaN(num) && raw !== '' ? num : raw;
              updateCondition(index, { value });
            }}
            sx={{ flex: 1 }}
          />
          <IconButton size="small" onClick={() => removeCondition(index)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}

      <IconButton size="small" onClick={addCondition} color="primary">
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
