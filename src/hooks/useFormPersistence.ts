import { useEffect } from 'react';
import { hydrateStore, initPersistence } from '../store/persistence';

export const useFormPersistence = (): void => {
  useEffect(() => {
    hydrateStore();
    const cleanup = initPersistence();
    return cleanup;
  }, []);
};
