import { loadStorage, saveStorage } from '../services/storage/localStorageService';
import { useFormStore } from './formStore';

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export const hydrateStore = (): void => {
  const storage = loadStorage();
  if (storage) {
    useFormStore.getState().hydrate(storage);
  }
};

export const initPersistence = (): (() => void) => {
  const unsubscribe = useFormStore.subscribe((state) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      saveStorage({
        forms: state.forms,
        activeFormId: state.activeFormId,
      });
    }, 300);
  });

  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    unsubscribe();
  };
};
