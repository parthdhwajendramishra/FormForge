import type { FormDefinition, RepeatableSection } from '../../../types';
import { getSectionFields } from '../../../engine/ruleCompiler';
import { generateJsxField } from './generateJsxField';

const generateEmptyEntry = (fields: { name: string; type: string; defaultValue?: unknown }[]): string => {
  const entries = fields
    .map((f) => {
      let val = "''";
      if (f.type === 'checkbox') val = 'false';
      if (f.type === 'number') val = "''";
      if (f.type === 'file') val = 'null';
      if (f.defaultValue !== undefined) {
        val = typeof f.defaultValue === 'string' ? `'${f.defaultValue}'` : String(f.defaultValue);
      }
      return `${f.name}: ${val}`;
    })
    .join(', ');
  return `{ ${entries} }`;
};

export const generateJsxFieldArrayBlock = (
  form: FormDefinition,
  section: RepeatableSection,
  indent: string,
): string => {
  const fields = getSectionFields(form, section.id);
  const namePrefix = `\${index}.`;
  const fieldBlocks = fields
    .map((field) => generateJsxField(field, indent + '            ', namePrefix))
    .join('\n');

  return `${indent}<div>
${indent}  <h3>${section.label}</h3>
${indent}  <FieldArray name="${section.name}">
${indent}    {({ push, remove, form: formikForm }) => (
${indent}      <>
${indent}        {formikForm.values.${section.name}.map((_: unknown, index: number) => (
${indent}          <div key={index}>
${fieldBlocks.replace(/\$\{index\}\./g, `${section.name}.\${index}.`)}
${indent}            <button type="button" onClick={() => remove(index)}>
${indent}              Remove
${indent}            </button>
${indent}          </div>
${indent}        ))}
${indent}        {formikForm.values.${section.name}.length < ${section.maxEntries} && (
${indent}          <button type="button" onClick={() => push(${generateEmptyEntry(fields)})}>
${indent}            Add ${section.label}
${indent}          </button>
${indent}        )}
${indent}      </>
${indent}    )}
${indent}  </FieldArray>
${indent}</div>`;
};
