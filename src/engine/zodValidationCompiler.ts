import type { FormField, ValidationRule } from '../types';
import { conditionsToExpression } from './conditionToExpression';

const quote = (str: string): string => `'${str.replace(/'/g, "\\'")}'`;

export const conditionsToDataExpression = (
  conditions: ValidationRule['conditions'],
  logic: ValidationRule['logic'] = 'and',
): string => {
  if (!conditions || conditions.length === 0) return 'true';
  return conditionsToExpression(conditions, logic).replace(/values\./g, 'data.');
};

const getZodBaseType = (field: FormField): string => {
  switch (field.type) {
    case 'number':
      return `z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: ${quote(`${field.label} must be a number`)} })
  )`;
    case 'checkbox':
      return 'z.boolean()';
    case 'file':
      return 'z.any()';
    default:
      return 'z.string()';
  }
};

const appendZodRule = (chain: string, rule: ValidationRule, field: FormField): string => {
  const msg = rule.message ? `, ${quote(rule.message)}` : '';

  switch (rule.type) {
    case 'required':
      if (field.type === 'checkbox') {
        return `${chain}.refine((val) => val === true, { message: ${quote(rule.message ?? 'This field is required')} })`;
      }
      if (field.type === 'number') {
        return `${chain}.refine((val) => val !== undefined && val !== null, { message: ${quote(rule.message ?? 'This field is required')} })`;
      }
      return `${chain}.min(1, ${quote(rule.message ?? 'This field is required')})`;
    case 'minLength':
      return `${chain}.min(${rule.value ?? 0}${msg})`;
    case 'maxLength':
      return `${chain}.max(${rule.value ?? 255}${msg})`;
    case 'min':
      return `${chain}.min(${rule.value ?? 0}${msg})`;
    case 'max':
      return `${chain}.max(${rule.value ?? 999999}${msg})`;
    case 'regex':
      return `${chain}.regex(/${rule.value ?? '.*'}/${msg})`;
    case 'email':
      return `${chain}.email(${quote(rule.message ?? 'Invalid email')})`;
    case 'phone':
      return `${chain}.regex(/^[+]?[\\d\\s()-]{7,20}$/${msg})`;
    default:
      return chain;
  }
};

export interface ZodFieldCompilation {
  schema: string;
  conditionalChecks: string[];
}

export const compileZodFieldValidation = (
  field: FormField,
  rules: ValidationRule[] = [],
): ZodFieldCompilation => {
  const allRules = [...rules];
  if (field.required && !allRules.some((r) => r.type === 'required' && !r.conditions?.length)) {
    allRules.unshift({
      id: 'auto-required',
      type: 'required',
      message: `${field.label} is required`,
    });
  }

  const staticRules = allRules.filter((r) => !r.conditions || r.conditions.length === 0);
  const conditionalRules = allRules.filter((r) => r.conditions && r.conditions.length > 0);

  let chain = getZodBaseType(field);
  staticRules.forEach((rule) => {
    chain = appendZodRule(chain, rule, field);
  });

  if (field.type === 'email' && !staticRules.some((r) => r.type === 'email')) {
    chain = `${chain}.email('Invalid email')`;
  }

  if (
    !field.required &&
    !staticRules.some((r) => r.type === 'required') &&
    field.type !== 'checkbox'
  ) {
    chain = `${chain}.optional()`;
  }

  const conditionalChecks = conditionalRules.map((rule) => {
    const conditionExpr = conditionsToDataExpression(rule.conditions, rule.logic ?? 'and');
    const message = quote(rule.message ?? 'Validation failed');
    const path = quote(field.name);

    switch (rule.type) {
      case 'required':
        if (field.type === 'checkbox') {
          return `  if (${conditionExpr} && data.${field.name} !== true) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
        }
        if (field.type === 'number') {
          return `  if (${conditionExpr} && (data.${field.name} === undefined || data.${field.name} === null || data.${field.name} === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
        }
        return `  if (${conditionExpr} && (!data.${field.name} || String(data.${field.name}).length === 0)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'minLength':
        return `  if (${conditionExpr} && data.${field.name} && String(data.${field.name}).length < ${rule.value ?? 0}) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'maxLength':
        return `  if (${conditionExpr} && data.${field.name} && String(data.${field.name}).length > ${rule.value ?? 255}) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'min':
        return `  if (${conditionExpr} && data.${field.name} !== undefined && data.${field.name} !== null && Number(data.${field.name}) < ${rule.value ?? 0}) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'max':
        return `  if (${conditionExpr} && data.${field.name} !== undefined && data.${field.name} !== null && Number(data.${field.name}) > ${rule.value ?? 999999}) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'regex':
        return `  if (${conditionExpr} && data.${field.name} && !/${rule.value ?? '.*'}/.test(String(data.${field.name}))) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'email':
        return `  if (${conditionExpr} && data.${field.name} && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(data.${field.name}))) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      case 'phone':
        return `  if (${conditionExpr} && data.${field.name} && !/^[+]?[\\d\\s()-]{7,20}$/.test(String(data.${field.name}))) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: ${message}, path: [${path}] });
  }`;
      default:
        return '';
    }
  }).filter(Boolean);

  return { schema: chain, conditionalChecks };
};
