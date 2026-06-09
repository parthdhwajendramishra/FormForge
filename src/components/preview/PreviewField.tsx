import {
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
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import type { FormField } from '../../types';

interface PreviewFieldProps {
  field: FormField;
  namePrefix?: string;
}

const useShowError = (meta: { touched: boolean; error?: string }) => {
  const { submitCount } = useFormikContext();
  return Boolean(meta.error) && (meta.touched || submitCount > 0);
};

export const PreviewField = ({ field, namePrefix = '' }: PreviewFieldProps) => {
  const fieldName = `${namePrefix}${field.name}`;
  const [formikField, meta, helpers] = useField(fieldName);
  const showError = useShowError(meta);
  const errorText = showError ? meta.error : undefined;

  switch (field.type) {
    case 'textarea':
      return (
        <TextField
          {...formikField}
          label={field.label}
          placeholder={field.placeholder}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={showError}
          helperText={errorText}
        />
      );

    case 'select':
      return (
        <FormControl fullWidth margin="normal" error={showError}>
          <InputLabel id={`${fieldName}-label`}>{field.label}</InputLabel>
          <Select
            {...formikField}
            labelId={`${fieldName}-label`}
            label={field.label}
            input={<OutlinedInput label={field.label} />}
          >
            {(field.options ?? []).map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {showError && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
      );

    case 'radio':
      return (
        <FormControl component="fieldset" margin="normal" error={showError}>
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup
            name={formikField.name}
            value={formikField.value}
            onChange={formikField.onChange}
            onBlur={formikField.onBlur}
            row
          >
            {(field.options ?? []).map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
          {showError && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormControl margin="normal" error={showError}>
          <FormControlLabel
            control={
              <Checkbox
                name={formikField.name}
                checked={!!formikField.value}
                onChange={formikField.onChange}
                onBlur={formikField.onBlur}
              />
            }
            label={field.label}
          />
          {showError && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
      );

    case 'file':
      return (
        <FormControl fullWidth margin="normal" error={showError}>
          <InputLabel shrink htmlFor={fieldName}>
            {field.label}
          </InputLabel>
          <OutlinedInput
            id={fieldName}
            type="file"
            inputProps={{ accept: '*/*' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              helpers.setValue(e.currentTarget.files?.[0] ?? null);
              helpers.setTouched(true);
            }}
            onBlur={() => helpers.setTouched(true)}
          />
          {showError && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
      );

    default:
      return (
        <TextField
          {...formikField}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type === 'phone' ? 'tel' : field.type}
          fullWidth
          margin="normal"
          error={showError}
          helperText={errorText}
        />
      );
  }
};
