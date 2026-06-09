import type { FormDefinition } from '../../types';
import { compileFieldValidation } from '../../engine/validationCompiler';
import { getSectionFields } from '../../engine/ruleCompiler';

export const generateYupSchema = (form: FormDefinition): string => {
  const lines: string[] = [];

  form.fields
    .filter((f) => !f.sectionId)
    .forEach((field) => {
      const rules = form.rules.validation[field.id] ?? [];
      lines.push(`  ${field.name}: ${compileFieldValidation(field, rules)},`);
    });

  form.sections.forEach((section) => {
    const sectionFields = getSectionFields(form, section.id);
    const fieldSchemas = sectionFields
      .map((field) => {
        const rules = form.rules.validation[field.id] ?? [];
        return `      ${field.name}: ${compileFieldValidation(field, rules)},`;
      })
      .join('\n');

    lines.push(`  ${section.name}: Yup.array().of(
    Yup.object({
${fieldSchemas}
    })
  ),`);
  });

  return `import * as Yup from 'yup';

export const validationSchema = Yup.object({
${lines.join('\n')}
});`;
};
