import type { FieldType } from '../types';

export interface FieldTypeConfig {
  type: FieldType;
  label: string;
  defaultLabel: string;
  hasOptions: boolean;
}

export const FIELD_TYPES: FieldTypeConfig[] = [
  { type: 'text', label: 'Text', defaultLabel: 'Text Field', hasOptions: false },
  { type: 'number', label: 'Number', defaultLabel: 'Number Field', hasOptions: false },
  { type: 'email', label: 'Email', defaultLabel: 'Email', hasOptions: false },
  { type: 'phone', label: 'Phone', defaultLabel: 'Phone', hasOptions: false },
  { type: 'date', label: 'Date', defaultLabel: 'Date', hasOptions: false },
  { type: 'textarea', label: 'Textarea', defaultLabel: 'Description', hasOptions: false },
  { type: 'select', label: 'Select', defaultLabel: 'Select Option', hasOptions: true },
  { type: 'radio', label: 'Radio', defaultLabel: 'Choose Option', hasOptions: true },
  { type: 'checkbox', label: 'Checkbox', defaultLabel: 'Checkbox', hasOptions: false },
  { type: 'file', label: 'File Upload', defaultLabel: 'Upload File', hasOptions: false },
];

export const getFieldTypeConfig = (type: FieldType): FieldTypeConfig =>
  FIELD_TYPES.find((f) => f.type === type) ?? FIELD_TYPES[0];
