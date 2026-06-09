import { useMemo } from 'react';
import type { FormDefinition } from '../types';
import { generateWithRenderer } from '../services/renderers';
import type { GeneratedCode } from '../services/codeGenerator';
import type { RendererType } from '../services/renderers/types';

const emptyCode: GeneratedCode = {
  component: '// Select or create a form to generate code',
  yupSchema: '// No schema',
  initialValues: '// No initial values',
  fileName: 'GeneratedForm.tsx',
};

export const useGeneratedCode = (
  form: FormDefinition | null,
  rendererType: RendererType,
): GeneratedCode =>
  useMemo(() => {
    if (!form || form.fields.length === 0) return emptyCode;
    return generateWithRenderer(form, rendererType);
  }, [form, rendererType]);
