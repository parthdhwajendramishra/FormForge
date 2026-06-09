import { STORAGE_KEY } from '../../constants/storageKeys';
import type { FormForgeStorage } from '../../types';

export const loadStorage = (): FormForgeStorage | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FormForgeStorage;
  } catch {
    return null;
  }
};

export const saveStorage = (storage: FormForgeStorage): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
};
