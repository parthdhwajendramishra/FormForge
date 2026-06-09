import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const employmentTypeId = generateId();
const employerNameId = generateId();
const annualIncomeId = generateId();
const businessNameId = generateId();
const hasCoApplicantId = generateId();
const coApplicantNameId = generateId();
const coApplicantIncomeId = generateId();
const coApplicantRelationId = generateId();
const loanAmountId = generateId();

export const loanApplicationFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'loan-application',
    'Loan Application',
    'Income details, employment type conditionals and co-applicant logic',
  ),
  [
    { id: generateId(), name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, order: 0 },
    { id: loanAmountId, name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', required: true, order: 1 },
    { id: generateId(), name: 'loanPurpose', label: 'Loan Purpose', type: 'textarea', required: true, order: 2 },
    {
      id: employmentTypeId,
      name: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      order: 3,
      options: [
        { label: 'Salaried', value: 'salaried' },
        { label: 'Self Employed', value: 'self-employed' },
        { label: 'Retired', value: 'retired' },
      ],
    },
    { id: employerNameId, name: 'employerName', label: 'Employer Name', type: 'text', required: false, order: 4 },
    { id: annualIncomeId, name: 'annualIncome', label: 'Annual Income ($)', type: 'number', required: false, order: 5 },
    { id: businessNameId, name: 'businessName', label: 'Business Name', type: 'text', required: false, order: 6 },
    { id: hasCoApplicantId, name: 'hasCoApplicant', label: 'Add Co-applicant', type: 'checkbox', required: false, defaultValue: false, order: 7 },
    { id: coApplicantNameId, name: 'coApplicantName', label: 'Co-applicant Name', type: 'text', required: false, order: 8 },
    {
      id: coApplicantRelationId,
      name: 'coApplicantRelation',
      label: 'Relationship',
      type: 'select',
      required: false,
      order: 9,
      options: [
        { label: 'Spouse', value: 'spouse' },
        { label: 'Parent', value: 'parent' },
        { label: 'Sibling', value: 'sibling' },
        { label: 'Business Partner', value: 'partner' },
      ],
    },
    { id: coApplicantIncomeId, name: 'coApplicantIncome', label: 'Co-applicant Annual Income ($)', type: 'number', required: false, order: 10 },
    { id: generateId(), name: 'consentCreditCheck', label: 'I consent to a credit check', type: 'checkbox', required: true, defaultValue: false, order: 11 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: employerNameId, conditions: [cond('employmentType', 'equals', 'salaried')], logic: 'and' },
      {
        id: generateId(),
        targetFieldId: annualIncomeId,
        conditions: [cond('employmentType', 'equals', 'salaried'), cond('employmentType', 'equals', 'self-employed')],
        logic: 'or',
      },
      { id: generateId(), targetFieldId: businessNameId, conditions: [cond('employmentType', 'equals', 'self-employed')], logic: 'and' },
      { id: generateId(), targetFieldId: coApplicantNameId, conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
      { id: generateId(), targetFieldId: coApplicantRelationId, conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
      { id: generateId(), targetFieldId: coApplicantIncomeId, conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
    ],
    dependencies: [
      { id: generateId(), sourceFieldId: hasCoApplicantId, targetFieldId: coApplicantNameId, conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: employmentTypeId, targetFieldId: employerNameId, conditions: [cond('employmentType', 'equals', 'salaried')], logic: 'and', action: 'setVisible' },
    ],
    validation: {
      [loanAmountId]: [req(), { id: generateId(), type: 'min', value: 1000 }, { id: generateId(), type: 'max', value: 500000 }],
      [employerNameId]: [
        { id: generateId(), type: 'required', message: 'Employer name required for salaried applicants', conditions: [cond('employmentType', 'equals', 'salaried')], logic: 'and' },
      ],
      [annualIncomeId]: [
        {
          id: generateId(),
          type: 'required',
          message: 'Annual income required',
          conditions: [cond('employmentType', 'equals', 'salaried'), cond('employmentType', 'equals', 'self-employed')],
          logic: 'or',
        },
        { id: generateId(), type: 'min', value: 0 },
      ],
      [businessNameId]: [
        { id: generateId(), type: 'required', message: 'Business name required for self-employed', conditions: [cond('employmentType', 'equals', 'self-employed')], logic: 'and' },
      ],
      [coApplicantNameId]: [
        { id: generateId(), type: 'required', message: 'Co-applicant name required', conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
      ],
      [coApplicantRelationId]: [
        { id: generateId(), type: 'required', message: 'Relationship required', conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
      ],
      [coApplicantIncomeId]: [
        { id: generateId(), type: 'required', message: 'Co-applicant income required', conditions: [cond('hasCoApplicant', 'equals', true)], logic: 'and' },
        { id: generateId(), type: 'min', value: 0 },
      ],
    },
  },
);

loanApplicationFormTemplate.rules.validation[loanApplicationFormTemplate.fields[0].id] = [req()];
loanApplicationFormTemplate.rules.validation[employmentTypeId] = [req()];
loanApplicationFormTemplate.rules.validation[loanApplicationFormTemplate.fields[2].id] = [req()];
loanApplicationFormTemplate.rules.validation[loanApplicationFormTemplate.fields[11].id] = [req('Credit check consent is required')];
