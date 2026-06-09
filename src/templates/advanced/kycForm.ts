import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

const countryId = generateId();
const panNumberId = generateId();
const ssnId = generateId();

export const kycFormTemplate: FormDefinition = {
  id: 'template-kyc',
  name: 'KYC Form',
  description: 'Country-dependent PAN/SSN fields with conditional visibility and validation',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: {
    ...createEmptyFormRules(),
    visibility: [
      {
        id: generateId(),
        targetFieldId: panNumberId,
        conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'India' }],
        logic: 'and',
      },
      {
        id: generateId(),
        targetFieldId: ssnId,
        conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'USA' }],
        logic: 'and',
      },
    ],
    dependencies: [
      {
        id: generateId(),
        sourceFieldId: countryId,
        targetFieldId: panNumberId,
        conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'India' }],
        logic: 'and',
        action: 'setVisible',
      },
      {
        id: generateId(),
        sourceFieldId: countryId,
        targetFieldId: ssnId,
        conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'USA' }],
        logic: 'and',
        action: 'setVisible',
      },
    ],
    validation: {},
  },
  fields: [
    {
      id: generateId(),
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      order: 0,
    },
    {
      id: countryId,
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      order: 1,
      options: [
        { label: 'India', value: 'India' },
        { label: 'USA', value: 'USA' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      id: panNumberId,
      name: 'panNumber',
      label: 'PAN Number',
      type: 'text',
      required: false,
      placeholder: 'ABCDE1234F',
      order: 2,
    },
    {
      id: ssnId,
      name: 'ssn',
      label: 'SSN',
      type: 'text',
      required: false,
      placeholder: 'XXX-XX-XXXX',
      order: 3,
    },
    {
      id: generateId(),
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      order: 4,
    },
    {
      id: generateId(),
      name: 'idDocument',
      label: 'ID Document',
      type: 'file',
      required: true,
      order: 5,
    },
  ],
};

const fullNameId = kycFormTemplate.fields[0].id;
const dobId = kycFormTemplate.fields[4].id;
const idDocId = kycFormTemplate.fields[5].id;

kycFormTemplate.rules.validation = {
  [fullNameId]: [{ id: generateId(), type: 'required', message: 'Full name is required' }],
  [countryId]: [{ id: generateId(), type: 'required', message: 'Country is required' }],
  [panNumberId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'PAN is required for India',
      conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'India' }],
      logic: 'and',
    },
    {
      id: generateId(),
      type: 'regex',
      value: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
      message: 'Invalid PAN format',
      conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'India' }],
      logic: 'and',
    },
  ],
  [ssnId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'SSN is required for USA',
      conditions: [{ id: generateId(), field: 'country', operator: 'equals', value: 'USA' }],
      logic: 'and',
    },
  ],
  [dobId]: [{ id: generateId(), type: 'required', message: 'Date of birth is required' }],
  [idDocId]: [{ id: generateId(), type: 'required', message: 'ID document is required' }],
};
