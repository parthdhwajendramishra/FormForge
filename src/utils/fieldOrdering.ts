import type { FormField } from '../types';

export const sortFieldsByOrder = (fields: FormField[]): FormField[] =>
  [...fields].sort((a, b) => a.order - b.order);

export const getNextFieldOrder = (fields: FormField[]): number => {
  if (fields.length === 0) return 0;
  return Math.max(...fields.map((f) => f.order)) + 1;
};

export const toCamelCase = (str: string): string =>
  str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');

export const isValidFieldName = (name: string): boolean =>
  /^[a-z][a-zA-Z0-9]*$/.test(name);
