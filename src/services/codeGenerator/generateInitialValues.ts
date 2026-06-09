import type { FormDefinition, FormField, RepeatableSection } from '../../types';
import { getSectionFields } from '../../engine/ruleCompiler';

const getDefaultValue = (field: FormField): string => {
  if (field.defaultValue !== undefined) {
    if (typeof field.defaultValue === 'string') return `"${field.defaultValue}"`;
    if (typeof field.defaultValue === 'boolean') return String(field.defaultValue);
    if (typeof field.defaultValue === 'number') return String(field.defaultValue);
  }

  switch (field.type) {
    case 'number':
      return "''";
    case 'checkbox':
      return 'false';
    case 'file':
      return 'null';
    default:
      return "''";
  }
};

const generateSectionEntry = (form: FormDefinition, section: RepeatableSection): string => {
  const fields = getSectionFields(form, section.id);
  const entries = fields.map((f) => `    ${f.name}: ${getDefaultValue(f)}`).join(',\n');
  return `{\n${entries}\n  }`;
};

export const generateInitialValues = (form: FormDefinition): string => {
  const standaloneFields = form.fields.filter((f) => !f.sectionId);
  const lines: string[] = [];

  standaloneFields.forEach((field) => {
    lines.push(`  ${field.name}: ${getDefaultValue(field)},`);
  });

  form.sections.forEach((section) => {
    const entry = generateSectionEntry(form, section);
    if (section.minEntries > 0) {
      const entries = Array.from({ length: section.minEntries }, () => entry).join(', ');
      lines.push(`  ${section.name}: [${entries}],`);
    } else {
      lines.push(`  ${section.name}: [],`);
    }
  });

  return `export const initialValues = {\n${lines.join('\n')}\n};`;
};
