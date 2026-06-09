import { useMemo } from 'react';
import { useActiveForm } from './useFormSelectors';
import { useUiStore } from '../store/uiStore';
import type { FormField } from '../types';

export const useSelectedField = (): FormField | null => {
  const activeForm = useActiveForm();
  const selectedFieldId = useUiStore((s) => s.selectedFieldId);

  return useMemo(() => {
    if (!activeForm || !selectedFieldId) return null;
    return activeForm.fields.find((f) => f.id === selectedFieldId) ?? null;
  }, [activeForm, selectedFieldId]);
};
