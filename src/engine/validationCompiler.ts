import type { FormField, ValidationRule } from '../types';
import { conditionsToExpression } from './conditionToExpression';

const quote = (str: string): string => `'${str.replace(/'/g, "\\'")}'`;

const getYupBaseType = (field: FormField): string => {
  if (field.type === 'number') return 'Yup.number()';
  if (field.type === 'checkbox') return 'Yup.boolean()';
  if (field.type === 'file') return 'Yup.mixed()';
  return 'Yup.string()';
};

const appendRule = (chain: string, rule: ValidationRule): string => {
  const msg = rule.message ? `, ${quote(rule.message)}` : '';

  switch (rule.type) {
    case 'required':
      return `${chain}.required(${quote(rule.message ?? 'This field is required')})`;
    case 'minLength':
      return `${chain}.min(${rule.value ?? 0}${msg})`;
    case 'maxLength':
      return `${chain}.max(${rule.value ?? 255}${msg})`;
    case 'min':
      return `${chain}.min(${rule.value ?? 0}${msg})`;
    case 'max':
      return `${chain}.max(${rule.value ?? 999999}${msg})`;
    case 'regex':
      return `${chain}.matches(/${rule.value ?? '.*'}/${msg})`;
    case 'email':
      return `${chain}.email(${quote(rule.message ?? 'Invalid email')})`;
    case 'phone':
      return `${chain}.matches(/^[+]?[\\d\\s()-]{7,20}$/${msg})`;
    default:
      return chain;
  }
};

const buildConditionalWhen = (
  field: FormField,
  rules: ValidationRule[],
): string | null => {
  const conditionalRules = rules.filter((r) => r.conditions && r.conditions.length > 0);
  if (conditionalRules.length === 0) return null;

  const whenField = conditionalRules[0].conditions![0].field;
  const isValue = conditionalRules[0].conditions![0].value;
  const isExpr = conditionsToExpression(
    conditionalRules[0].conditions!,
    conditionalRules[0].logic ?? 'and',
  );

  let thenChain = getYupBaseType(field);
  let otherwiseChain = getYupBaseType(field).replace('()', '()');

  conditionalRules.forEach((rule) => {
    if (rule.type === 'required') {
      thenChain = appendRule(thenChain, rule);
      otherwiseChain = `${otherwiseChain}.notRequired()`;
    } else {
      thenChain = appendRule(thenChain, rule);
    }
  });

  const staticRules = rules.filter((r) => !r.conditions || r.conditions.length === 0);
  staticRules.forEach((rule) => {
    thenChain = appendRule(thenChain, rule);
    otherwiseChain = appendRule(otherwiseChain, rule);
  });

  if (typeof isValue === 'string' || typeof isValue === 'number' || typeof isValue === 'boolean') {
    const formatted =
      typeof isValue === 'string' ? quote(isValue) : String(isValue);
    return `${getYupBaseType(field)}.when('${whenField}', {
  is: ${formatted},
  then: (schema) => ${thenChain.replace('Yup.', 'schema.')},
  otherwise: (schema) => ${otherwiseChain.replace('Yup.', 'schema.')},
})`;
  }

  return `${getYupBaseType(field)}.when('${whenField}', {
  is: (val) => ${isExpr.replace(/values\./g, '')},
  then: (schema) => ${thenChain.replace('Yup.', 'schema.')},
  otherwise: (schema) => ${otherwiseChain.replace('Yup.', 'schema.')},
})`;
};

export const compileFieldValidation = (
  field: FormField,
  rules: ValidationRule[] = [],
): string => {
  const allRules = [...rules];
  if (field.required && !allRules.some((r) => r.type === 'required' && !r.conditions?.length)) {
    allRules.unshift({
      id: 'auto-required',
      type: 'required',
      message: `${field.label} is required`,
    });
  }

  const conditional = buildConditionalWhen(field, allRules);
  if (conditional) return conditional;

  let chain = getYupBaseType(field);
  allRules.forEach((rule) => {
    chain = appendRule(chain, rule);
  });

  if (field.type === 'email' && !allRules.some((r) => r.type === 'email')) {
    chain = `${chain}.email('Invalid email')`;
  }

  if (!field.required && !allRules.some((r) => r.type === 'required')) {
    chain = `${chain}.notRequired()`;
  }

  return chain;
};
