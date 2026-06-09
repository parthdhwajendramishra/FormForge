import type { FormDefinition } from '../../types';
import type { GeneratedCode } from '../codeGenerator/types';
import type { ValidationLibrary } from '../validationEngines/types';

export type RendererType = 'mui' | 'jsx';

export interface RendererOption {
  id: RendererType;
  label: string;
}

export interface GenerateOptions {
  validationLibrary: ValidationLibrary;
}

export interface FormRenderer {
  id: RendererType;
  label: string;
  generate: (form: FormDefinition, options: GenerateOptions) => GeneratedCode;
}

export const RENDERER_OPTIONS: RendererOption[] = [
  { id: 'mui', label: 'Material UI' },
  { id: 'jsx', label: 'Plain React JSX' },
];

// Re-export validation options from validation engines (single source of truth)
export type { ValidationLibrary } from '../validationEngines/types';
export { VALIDATION_ENGINE_OPTIONS as VALIDATION_OPTIONS } from '../validationEngines/types';
