import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const countryId = generateId();
const panNumberId = generateId();
const ssnId = generateId();
const sinId = generateId();
const dobId = generateId();
const idDocumentId = generateId();
const proofOfAddressId = generateId();

export const kycFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'kyc',
    'KYC Form',
    'Identity verification with country-based logic, conditional validation and document upload',
  ),
  [
    { id: generateId(), name: 'fullName', label: 'Full Name', type: 'text', required: true, order: 0 },
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
        { label: 'Canada', value: 'Canada' },
        { label: 'Other', value: 'Other' },
      ],
    },
    { id: panNumberId, name: 'panNumber', label: 'PAN Number', type: 'text', required: false, placeholder: 'ABCDE1234F', order: 2 },
    { id: ssnId, name: 'ssn', label: 'SSN', type: 'text', required: false, placeholder: 'XXX-XX-XXXX', order: 3 },
    { id: sinId, name: 'sin', label: 'SIN', type: 'text', required: false, placeholder: 'XXX-XXX-XXX', order: 4 },
    { id: dobId, name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, order: 5 },
    { id: idDocumentId, name: 'idDocument', label: 'Government ID Document', type: 'file', required: true, order: 6 },
    { id: proofOfAddressId, name: 'proofOfAddress', label: 'Proof of Address', type: 'file', required: false, order: 7 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: panNumberId, conditions: [cond('country', 'equals', 'India')], logic: 'and' },
      { id: generateId(), targetFieldId: ssnId, conditions: [cond('country', 'equals', 'USA')], logic: 'and' },
      { id: generateId(), targetFieldId: sinId, conditions: [cond('country', 'equals', 'Canada')], logic: 'and' },
    ],
    dependencies: [
      { id: generateId(), sourceFieldId: countryId, targetFieldId: panNumberId, conditions: [cond('country', 'equals', 'India')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: countryId, targetFieldId: ssnId, conditions: [cond('country', 'equals', 'USA')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: countryId, targetFieldId: sinId, conditions: [cond('country', 'equals', 'Canada')], logic: 'and', action: 'setVisible' },
    ],
    validation: {
      [panNumberId]: [
        { id: generateId(), type: 'required', message: 'PAN is required for India', conditions: [cond('country', 'equals', 'India')], logic: 'and' },
        { id: generateId(), type: 'regex', value: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$', message: 'Invalid PAN format', conditions: [cond('country', 'equals', 'India')], logic: 'and' },
      ],
      [ssnId]: [
        { id: generateId(), type: 'required', message: 'SSN is required for USA', conditions: [cond('country', 'equals', 'USA')], logic: 'and' },
      ],
      [sinId]: [
        { id: generateId(), type: 'required', message: 'SIN is required for Canada', conditions: [cond('country', 'equals', 'Canada')], logic: 'and' },
        { id: generateId(), type: 'regex', value: '^\\d{3}-\\d{3}-\\d{3}$', message: 'Format: XXX-XXX-XXX', conditions: [cond('country', 'equals', 'Canada')], logic: 'and' },
      ],
      [dobId]: [req('Date of birth is required')],
      [idDocumentId]: [req('ID document is required')],
      [proofOfAddressId]: [
        { id: generateId(), type: 'required', message: 'Proof of address required for non-India residents', conditions: [cond('country', 'notEquals', 'India')], logic: 'and' },
      ],
    },
  },
);

kycFormTemplate.rules.validation[kycFormTemplate.fields[0].id] = [req()];
kycFormTemplate.rules.validation[countryId] = [req()];
