import { parseFormDefinitions } from './schemaValidator';

export interface ImportResult {
  success: boolean;
  forms: ReturnType<typeof parseFormDefinitions>['forms'];
  errors: string[];
}

export const importFormFromFile = (file: File): Promise<ImportResult> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as unknown;
        const { forms, errors } = parseFormDefinitions(data);
        resolve({
          success: forms.length > 0,
          forms,
          errors,
        });
      } catch {
        resolve({ success: false, forms: [], errors: ['Invalid JSON file'] });
      }
    };
    reader.onerror = () => resolve({ success: false, forms: [], errors: ['Failed to read file'] });
    reader.readAsText(file);
  });
