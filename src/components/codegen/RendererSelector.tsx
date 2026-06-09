import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { RENDERER_OPTIONS, VALIDATION_OPTIONS } from '../../services/renderers';
import type { RendererType, ValidationLibrary } from '../../services/renderers/types';
import { useUiStore } from '../../store/uiStore';

export const RendererSelector = () => {
  const rendererType = useUiStore((s) => s.rendererType);
  const validationLibrary = useUiStore((s) => s.validationLibrary);
  const setRendererType = useUiStore((s) => s.setRendererType);
  const setValidationLibrary = useUiStore((s) => s.setValidationLibrary);

  return (
    <Stack spacing={2}>
      <FormControl size="small" fullWidth>
        <InputLabel>UI Library</InputLabel>
        <Select
          label="UI Library"
          value={rendererType}
          onChange={(e) => setRendererType(e.target.value as RendererType)}
        >
          {RENDERER_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Validation</InputLabel>
        <Select
          label="Validation"
          value={validationLibrary}
          onChange={(e) => setValidationLibrary(e.target.value as ValidationLibrary)}
        >
          {VALIDATION_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
