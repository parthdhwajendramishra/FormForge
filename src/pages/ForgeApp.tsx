import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { useFormStore } from '../store/formStore';

export const ForgeApp = () => {
  useFormPersistence();
  const [searchParams] = useSearchParams();
  const createFromTemplate = useFormStore((s) => s.createFromTemplate);

  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      createFromTemplate(templateId);
    }
  }, [searchParams, createFromTemplate]);

  return <AppLayout />;
};
