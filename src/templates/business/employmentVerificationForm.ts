import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const employmentStatusId = generateId();
const employerNameId = generateId();
const jobTitleId = generateId();
const monthlyIncomeId = generateId();
const selfEmployedBusinessId = generateId();
const consentId = generateId();

export const employmentVerificationFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'employment-verification',
    'Employment Verification',
    'Conditional validation and visibility based on employment status',
  ),
  [
    { id: generateId(), name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, order: 0 },
    {
      id: employmentStatusId,
      name: 'employmentStatus',
      label: 'Employment Status',
      type: 'select',
      required: true,
      order: 1,
      options: [
        { label: 'Employed', value: 'employed' },
        { label: 'Self Employed', value: 'self-employed' },
        { label: 'Unemployed', value: 'unemployed' },
        { label: 'Retired', value: 'retired' },
      ],
    },
    { id: employerNameId, name: 'employerName', label: 'Employer Name', type: 'text', required: false, order: 2 },
    { id: jobTitleId, name: 'jobTitle', label: 'Job Title', type: 'text', required: false, order: 3 },
    { id: monthlyIncomeId, name: 'monthlyIncome', label: 'Monthly Income', type: 'number', required: false, order: 4 },
    { id: selfEmployedBusinessId, name: 'businessName', label: 'Business Name', type: 'text', required: false, order: 5 },
    { id: consentId, name: 'verificationConsent', label: 'I consent to employment verification', type: 'checkbox', required: true, defaultValue: false, order: 6 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: employerNameId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      { id: generateId(), targetFieldId: jobTitleId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      {
        id: generateId(),
        targetFieldId: monthlyIncomeId,
        conditions: [cond('employmentStatus', 'equals', 'employed'), cond('employmentStatus', 'equals', 'self-employed')],
        logic: 'or',
      },
      { id: generateId(), targetFieldId: selfEmployedBusinessId, conditions: [cond('employmentStatus', 'equals', 'self-employed')], logic: 'and' },
    ],
    validation: {
      [employerNameId]: [
        { id: generateId(), type: 'required', message: 'Employer name required when employed', conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      ],
      [jobTitleId]: [
        { id: generateId(), type: 'required', message: 'Job title required when employed', conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      ],
      [monthlyIncomeId]: [
        {
          id: generateId(),
          type: 'required',
          message: 'Monthly income required',
          conditions: [cond('employmentStatus', 'equals', 'employed'), cond('employmentStatus', 'equals', 'self-employed')],
          logic: 'or',
        },
        { id: generateId(), type: 'min', value: 0 },
      ],
      [selfEmployedBusinessId]: [
        { id: generateId(), type: 'required', message: 'Business name required for self-employed', conditions: [cond('employmentStatus', 'equals', 'self-employed')], logic: 'and' },
      ],
      [consentId]: [req('Consent is required')],
    },
  },
);

employmentVerificationFormTemplate.rules.validation[employmentVerificationFormTemplate.fields[0].id] = [req()];
employmentVerificationFormTemplate.rules.validation[employmentStatusId] = [req()];
