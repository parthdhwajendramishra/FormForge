import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

const employmentStatusId = generateId();
const employerNameId = generateId();
const jobTitleId = generateId();
const monthlyIncomeId = generateId();

export const employmentVerificationTemplate: FormDefinition = {
  id: 'template-employment-verification',
  name: 'Employment Verification',
  description: 'Conditional fields based on employment status',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: {
    ...createEmptyFormRules(),
    visibility: [
      {
        id: generateId(),
        targetFieldId: employerNameId,
        conditions: [
          { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
        ],
        logic: 'and',
      },
      {
        id: generateId(),
        targetFieldId: jobTitleId,
        conditions: [
          { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
        ],
        logic: 'and',
      },
      {
        id: generateId(),
        targetFieldId: monthlyIncomeId,
        conditions: [
          { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
        ],
        logic: 'and',
      },
    ],
    validation: {},
  },
  fields: [
    {
      id: generateId(),
      name: 'applicantName',
      label: 'Applicant Name',
      type: 'text',
      required: true,
      order: 0,
    },
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
    {
      id: employerNameId,
      name: 'employerName',
      label: 'Employer Name',
      type: 'text',
      required: false,
      order: 2,
    },
    {
      id: jobTitleId,
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      required: false,
      order: 3,
    },
    {
      id: monthlyIncomeId,
      name: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'number',
      required: false,
      order: 4,
    },
    {
      id: generateId(),
      name: 'verificationConsent',
      label: 'I consent to employment verification',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      order: 5,
    },
  ],
};

const applicantNameId = employmentVerificationTemplate.fields[0].id;
const consentId = employmentVerificationTemplate.fields[5].id;

employmentVerificationTemplate.rules.validation = {
  [applicantNameId]: [{ id: generateId(), type: 'required', message: 'Applicant name is required' }],
  [employmentStatusId]: [{ id: generateId(), type: 'required', message: 'Employment status is required' }],
  [employerNameId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'Employer name required when employed',
      conditions: [
        { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
      ],
      logic: 'and',
    },
  ],
  [jobTitleId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'Job title required when employed',
      conditions: [
        { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
      ],
      logic: 'and',
    },
  ],
  [monthlyIncomeId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'Monthly income required when employed',
      conditions: [
        { id: generateId(), field: 'employmentStatus', operator: 'equals', value: 'employed' },
      ],
      logic: 'and',
    },
    { id: generateId(), type: 'min', value: 0 },
  ],
  [consentId]: [{ id: generateId(), type: 'required', message: 'Consent is required' }],
};
