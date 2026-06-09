import * as Yup from 'yup';
import type { FormDefinition, FormField, ValidationRule } from '../../types';
import { evaluateConditions } from '../../engine/conditionEvaluator';
import { getSectionFields } from '../../engine/ruleCompiler';

const getBaseSchema = (field: FormField): Yup.AnySchema => {
  switch (field.type) {
    case 'number':
      return Yup.number()
        .transform((value, original) => (original === '' || original === null ? undefined : value))
        .nullable();
    case 'checkbox':
      return Yup.boolean();
    case 'file':
      return Yup.mixed().nullable();
    default:
      return Yup.string();
  }
};

const applyRule = (schema: Yup.AnySchema, rule: ValidationRule): Yup.AnySchema => {
  const msg = rule.message;

  switch (rule.type) {
    case 'required':
      return schema.required(msg ?? 'This field is required');
    case 'minLength':
      return (schema as Yup.StringSchema).min(Number(rule.value ?? 0), msg);
    case 'maxLength':
      return (schema as Yup.StringSchema).max(Number(rule.value ?? 255), msg);
    case 'min':
      return (schema as Yup.NumberSchema).min(Number(rule.value ?? 0), msg);
    case 'max':
      return (schema as Yup.NumberSchema).max(Number(rule.value ?? 999999), msg);
    case 'regex':
      return (schema as Yup.StringSchema).matches(new RegExp(String(rule.value ?? '.*')), msg);
    case 'email':
      return (schema as Yup.StringSchema).email(msg ?? 'Invalid email');
    case 'phone':
      return (schema as Yup.StringSchema).matches(/^[+]?[\d\s()-]{7,20}$/, msg ?? 'Invalid phone');
    default:
      return schema;
  }
};

const validateRuleValue = (value: unknown, rule: ValidationRule): boolean => {
  switch (rule.type) {
    case 'required':
      return value != null && value !== '' && value !== false;
    case 'minLength':
      return String(value ?? '').length >= Number(rule.value ?? 0);
    case 'maxLength':
      return String(value ?? '').length <= Number(rule.value ?? 255);
    case 'min':
      return Number(value) >= Number(rule.value ?? 0);
    case 'max':
      return Number(value) <= Number(rule.value ?? 999999);
    case 'regex':
      return new RegExp(String(rule.value ?? '.*')).test(String(value ?? ''));
    case 'email':
      return Yup.string().email().isValidSync(value);
    case 'phone':
      return /^[+]?[\d\s()-]{7,20}$/.test(String(value ?? ''));
    default:
      return true;
  }
};

const addConditionalRules = (schema: Yup.AnySchema, rules: ValidationRule[]): Yup.AnySchema => {
  let result = schema;
  rules
    .filter((r) => r.conditions && r.conditions.length > 0)
    .forEach((rule) => {
      result = result.test(
        `conditional-${rule.id}`,
        rule.message ?? 'Validation failed',
        function (value) {
          const values = this.parent as Record<string, unknown>;
          if (!evaluateConditions(rule.conditions!, values, rule.logic ?? 'and')) {
            return true;
          }
          return validateRuleValue(value, rule);
        },
      );
    });
  return result;
};

const buildFieldSchema = (field: FormField, rules: ValidationRule[]): Yup.AnySchema => {
  const allRules = [...rules];
  if (field.required && !allRules.some((r) => r.type === 'required' && !r.conditions?.length)) {
    allRules.unshift({
      id: 'auto-required',
      type: 'required',
      message: `${field.label} is required`,
    });
  }

  const conditionalRules = allRules.filter((r) => r.conditions && r.conditions.length > 0);
  const staticRules = allRules.filter((r) => !r.conditions || r.conditions.length === 0);

  let schema = getBaseSchema(field);
  staticRules.forEach((rule) => {
    schema = applyRule(schema, rule);
  });

  if (field.type === 'email' && !staticRules.some((r) => r.type === 'email')) {
    schema = (schema as Yup.StringSchema).email('Invalid email');
  }

  if (conditionalRules.length > 0) {
    schema = addConditionalRules(schema, conditionalRules);
  }

  if (
    !field.required &&
    !staticRules.some((r) => r.type === 'required') &&
    conditionalRules.length === 0
  ) {
    schema = schema.notRequired();
  }

  return schema;
};

export const buildValidationSchema = (form: FormDefinition): Yup.ObjectSchema<Record<string, unknown>> => {
  const shape: Record<string, Yup.AnySchema> = {};

  form.fields
    .filter((f) => !f.sectionId)
    .forEach((field) => {
      const rules = form.rules.validation[field.id] ?? [];
      shape[field.name] = buildFieldSchema(field, rules);
    });

  form.sections.forEach((section) => {
    const sectionFields = getSectionFields(form, section.id);
    const sectionShape: Record<string, Yup.AnySchema> = {};
    sectionFields.forEach((field) => {
      const rules = form.rules.validation[field.id] ?? [];
      sectionShape[field.name] = buildFieldSchema(field, rules);
    });
    shape[section.name] = Yup.array().of(Yup.object(sectionShape));
  });

  return Yup.object(shape);
};
