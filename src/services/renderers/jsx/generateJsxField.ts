import type { FormField } from '../../../types';

const htmlId = (name: string): string => name.replace(/\./g, '-');

export const generateJsxField = (
  field: FormField,
  baseIndent: string,
  namePrefix = '',
): string => {
  const fieldName = `${namePrefix}${field.name}`;
  const id = htmlId(fieldName);
  const label = field.label;
  const placeholder = field.placeholder ? ` placeholder="${field.placeholder}"` : '';

  switch (field.type) {
    case 'textarea':
      return `${baseIndent}<div>
${baseIndent}  <label htmlFor="${id}">${label}</label>
${baseIndent}  <Field
${baseIndent}    as="textarea"
${baseIndent}    id="${id}"
${baseIndent}    name="${fieldName}"
${baseIndent}    rows={4}${placeholder}
${baseIndent}  />
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</div>`;

    case 'select':
      return `${baseIndent}<div>
${baseIndent}  <label htmlFor="${id}">${label}</label>
${baseIndent}  <Field as="select" id="${id}" name="${fieldName}">
${baseIndent}    <option value="">Select...</option>
${(field.options ?? []).map((opt) => `${baseIndent}    <option value="${opt.value}">${opt.label}</option>`).join('\n')}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</div>`;

    case 'radio':
      return `${baseIndent}<fieldset>
${baseIndent}  <legend>${label}</legend>
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ field: formikField }) => (
${baseIndent}      <div>
${(field.options ?? []).map((opt) => `${baseIndent}        <label>
${baseIndent}          <input
${baseIndent}            type="radio"
${baseIndent}            name={formikField.name}
${baseIndent}            value="${opt.value}"
${baseIndent}            checked={formikField.value === '${opt.value}'}
${baseIndent}            onChange={formikField.onChange}
${baseIndent}            onBlur={formikField.onBlur}
${baseIndent}          />
${baseIndent}          ${opt.label}
${baseIndent}        </label>`).join('\n')}
${baseIndent}      </div>
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</fieldset>`;

    case 'checkbox':
      return `${baseIndent}<div>
${baseIndent}  <label>
${baseIndent}    <Field type="checkbox" name="${fieldName}" />
${baseIndent}    ${label}
${baseIndent}  </label>
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</div>`;

    case 'file':
      return `${baseIndent}<div>
${baseIndent}  <label htmlFor="${id}">${label}</label>
${baseIndent}  <Field name="${fieldName}">
${baseIndent}    {({ form: formikForm }) => (
${baseIndent}      <input
${baseIndent}        id="${id}"
${baseIndent}        type="file"
${baseIndent}        accept="*/*"
${baseIndent}        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
${baseIndent}          formikForm.setFieldValue('${fieldName}', e.currentTarget.files?.[0] ?? null);
${baseIndent}        }}
${baseIndent}      />
${baseIndent}    )}
${baseIndent}  </Field>
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</div>`;

    default:
      return `${baseIndent}<div>
${baseIndent}  <label htmlFor="${id}">${label}</label>
${baseIndent}  <Field
${baseIndent}    id="${id}"
${baseIndent}    name="${fieldName}"
${baseIndent}    type="${field.type === 'phone' ? 'tel' : field.type}"${placeholder}
${baseIndent}  />
${baseIndent}  <ErrorMessage name="${fieldName}" component="div" />
${baseIndent}</div>`;
  }
};
