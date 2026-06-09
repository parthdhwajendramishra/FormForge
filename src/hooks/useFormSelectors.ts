import { useShallow } from 'zustand/react/shallow';
import type { RepeatableSection } from '../types';
import {
  selectActiveForm,
  selectSortedFields,
  useFormStore,
} from '../store/formStore';

const EMPTY_SECTIONS: RepeatableSection[] = [];

export const useActiveForm = () => useFormStore(selectActiveForm);

export const useSortedFields = () => useFormStore(useShallow(selectSortedFields));

export const useFormSections = () =>
  useFormStore(
    useShallow((state) => {
      const form = state.forms.find((f) => f.id === state.activeFormId);
      return form?.sections ?? EMPTY_SECTIONS;
    }),
  );
