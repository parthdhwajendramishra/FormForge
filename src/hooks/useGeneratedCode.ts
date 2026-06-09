import { useMemo } from 'react';
import type { FormDefinition } from '../types';
import { generateWithRenderer } from '../services/renderers';
import type { GeneratedCode } from '../services/codeGenerator';
import type { RendererType } from '../services/renderers/types';
import type { ValidationLibrary } from '../services/validationEngines/types';

const emptyCode: GeneratedCode = {
  component: '// Select or create a form to generate code',
  validationSchema: '// No schema',
  yupSchema: '// No schema',
  initialValues: '// No initial values',
  fileName: 'GeneratedForm.tsx',
};

export const useGeneratedCode = (
  form: FormDefinition | null,
  rendererType: RendererType,
  validationLibrary: ValidationLibrary,
): GeneratedCode =>
  useMemo(() => {
    if (!form || form.fields.length === 0) return emptyCode;
    return generateWithRenderer(form, rendererType, validationLibrary);
  }, [form, rendererType, validationLibrary]);
