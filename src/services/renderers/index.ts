import { jsxRenderer } from './jsxRenderer';
import { muiRenderer } from './muiRenderer';
import type { FormDefinition } from '../../types';
import type { GeneratedCode } from '../codeGenerator/types';
import type { FormRenderer, RendererType } from './types';
import type { ValidationLibrary } from '../validationEngines/types';

const rendererRegistry: Record<RendererType, FormRenderer> = {
  mui: muiRenderer,
  jsx: jsxRenderer,
};

export const getRenderer = (type: RendererType): FormRenderer =>
  rendererRegistry[type] ?? muiRenderer;

export const generateWithRenderer = (
  form: FormDefinition,
  rendererType: RendererType,
  validationLibrary: ValidationLibrary,
): GeneratedCode =>
  getRenderer(rendererType).generate(form, { validationLibrary });

export { muiRenderer, jsxRenderer };
export type { FormRenderer, RendererType, GenerateOptions } from './types';
export { RENDERER_OPTIONS, VALIDATION_OPTIONS } from './types';
