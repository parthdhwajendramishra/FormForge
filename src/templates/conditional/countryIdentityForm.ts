import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const countryId = generateId();
const panId = generateId();
const ssnId = generateId();
const sinId = generateId();

export const countryIdentityFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'country-identity',
    'Country Based Identity Form',
    'India → PAN, USA → SSN, Canada → SIN with dependencies and conditional validation',
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
      ],
    },
    { id: panId, name: 'panNumber', label: 'PAN Number', type: 'text', required: false, placeholder: 'ABCDE1234F', order: 2 },
    { id: ssnId, name: 'ssn', label: 'SSN', type: 'text', required: false, placeholder: 'XXX-XX-XXXX', order: 3 },
    { id: sinId, name: 'sin', label: 'SIN', type: 'text', required: false, placeholder: 'XXX-XXX-XXX', order: 4 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: panId, conditions: [cond('country', 'equals', 'India')], logic: 'and' },
      { id: generateId(), targetFieldId: ssnId, conditions: [cond('country', 'equals', 'USA')], logic: 'and' },
      { id: generateId(), targetFieldId: sinId, conditions: [cond('country', 'equals', 'Canada')], logic: 'and' },
    ],
    dependencies: [
      { id: generateId(), sourceFieldId: countryId, targetFieldId: panId, conditions: [cond('country', 'equals', 'India')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: countryId, targetFieldId: ssnId, conditions: [cond('country', 'equals', 'USA')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: countryId, targetFieldId: sinId, conditions: [cond('country', 'equals', 'Canada')], logic: 'and', action: 'setVisible' },
    ],
    validation: {
      [panId]: [
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
    },
  },
);

countryIdentityFormTemplate.rules.validation[countryIdentityFormTemplate.fields[0].id] = [req()];
