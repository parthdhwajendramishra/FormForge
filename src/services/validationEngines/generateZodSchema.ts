import type { FormDefinition } from '../../types';
import { compileZodFieldValidation } from '../../engine/zodValidationCompiler';
import { getSectionFields } from '../../engine/ruleCompiler';

export const generateZodSchema = (form: FormDefinition): string => {
  const fieldLines: string[] = [];
  const conditionalChecks: string[] = [];

  form.fields
    .filter((f) => !f.sectionId)
    .forEach((field) => {
      const rules = form.rules.validation[field.id] ?? [];
      const compiled = compileZodFieldValidation(field, rules);
      fieldLines.push(`  ${field.name}: ${compiled.schema},`);
      conditionalChecks.push(...compiled.conditionalChecks);
    });

  form.sections.forEach((section) => {
    const sectionFields = getSectionFields(form, section.id);
    const sectionShape: string[] = [];

    sectionFields.forEach((field) => {
      const rules = form.rules.validation[field.id] ?? [];
      const compiled = compileZodFieldValidation(field, rules);
      sectionShape.push(`    ${field.name}: ${compiled.schema},`);

      compiled.conditionalChecks.forEach((check) => {
        const adaptedCheck = check
          .replace(/data\./g, 'entry.')
          .replace(/path: \['([^']+)'\]/g, `path: ['${section.name}', index, '$1']`);
        conditionalChecks.push(
          `  data.${section.name}.forEach((entry, index) => {\n${adaptedCheck}\n  });`,
        );
      });
    });

    fieldLines.push(`  ${section.name}: z.array(z.object({\n${sectionShape.join('\n')}\n  })),`);
  });

  const objectSchema = `z.object({\n${fieldLines.join('\n')}\n})`;

  if (conditionalChecks.length === 0) {
    return `import { z } from 'zod';

export const validationSchema = ${objectSchema};`;
  }

  return `import { z } from 'zod';

export const validationSchema = ${objectSchema}.superRefine((data, ctx) => {
${conditionalChecks.join('\n')}
});`;
};
