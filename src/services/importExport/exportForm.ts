import type { FormDefinition } from '../../types';
import { downloadFile } from '../../utils/downloadFile';

export const exportFormToJson = (form: FormDefinition): void => {
  const json = JSON.stringify(form, null, 2);
  const fileName = `${form.name.replace(/\s+/g, '-').toLowerCase()}.json`;
  downloadFile(json, fileName, 'application/json');
};

export const exportAllFormsToJson = (forms: FormDefinition[]): void => {
  const json = JSON.stringify(forms, null, 2);
  downloadFile(json, 'formforge-forms.json', 'application/json');
};

export const formToJsonString = (form: FormDefinition): string =>
  JSON.stringify(form, null, 2);
