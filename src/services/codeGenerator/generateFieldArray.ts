import type { FormDefinition, RepeatableSection } from '../../types';
import { getSectionFields } from '../../engine/ruleCompiler';
import { generateFieldJsx } from './generateComponent';

export const generateFieldArrayBlock = (
  form: FormDefinition,
  section: RepeatableSection,
  indent: string,
): string => {
  const fields = getSectionFields(form, section.id);
  const namePrefix = `\${index}.`;
  const fieldBlocks = fields
    .map((field) => generateFieldJsx(field, indent + '          ', namePrefix))
    .join('\n');

  return `${indent}<Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
${indent}  ${section.label}
${indent}</Typography>
${indent}<FieldArray name="${section.name}">
${indent}  {({ push, remove, form }) => (
${indent}    <>
${indent}      {form.values.${section.name}.map((_: unknown, index: number) => (
${indent}        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
${fieldBlocks.replace(/\$\{index\}\./g, `${section.name}.\${index}.`)}
${indent}          <Button
${indent}            type="button"
${indent}            variant="outlined"
${indent}            color="error"
${indent}            size="small"
${indent}            onClick={() => remove(index)}
${indent}            sx={{ mt: 1 }}
${indent}          >
${indent}            Remove
${indent}          </Button>
${indent}        </Box>
${indent}      ))}
${indent}      {form.values.${section.name}.length < ${section.maxEntries} && (
${indent}        <Button
${indent}          type="button"
${indent}          variant="outlined"
${indent}          onClick={() => push(${generateEmptyEntry(fields)})}
${indent}        >
${indent}          Add ${section.label}
${indent}        </Button>
${indent}      )}
${indent}    </>
${indent}  )}
${indent}</FieldArray>`;
};

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
