import type { FormDefinition } from '../../types';
import type { GeneratedCode } from '../codeGenerator/types';

export type RendererType = 'mui' | 'jsx';
export type ValidationLibrary = 'yup';

export interface RendererOption {
  id: RendererType;
  label: string;
}

export interface ValidationOption {
  id: ValidationLibrary;
  label: string;
}

export interface FormRenderer {
  id: RendererType;
  label: string;
  generate: (form: FormDefinition) => GeneratedCode;
}

export const RENDERER_OPTIONS: RendererOption[] = [
  { id: 'mui', label: 'Material UI' },
  { id: 'jsx', label: 'Plain React JSX' },
];

export const VALIDATION_OPTIONS: ValidationOption[] = [
  { id: 'yup', label: 'Yup' },
];
