import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const employmentTypeId = generateId();
const contractEndDateId = generateId();
const remoteWorkId = generateId();
const officeLocationId = generateId();
const resumeId = generateId();
const agreeTermsId = generateId();

export const employeeOnboardingFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'employee-onboarding',
    'Employee Onboarding',
    'Multi-section onboarding with employment type conditionals, validation and file upload',
  ),
  [
    { id: generateId(), name: 'firstName', label: 'First Name', type: 'text', required: true, order: 0 },
    { id: generateId(), name: 'lastName', label: 'Last Name', type: 'text', required: true, order: 1 },
    { id: generateId(), name: 'email', label: 'Work Email', type: 'email', required: true, order: 2 },
    { id: generateId(), name: 'phone', label: 'Phone', type: 'phone', required: true, order: 3 },
    { id: generateId(), name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, order: 4 },
    {
      id: generateId(),
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      order: 5,
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Sales', value: 'sales' },
        { label: 'HR', value: 'hr' },
        { label: 'Finance', value: 'finance' },
      ],
    },
    {
      id: employmentTypeId,
      name: 'employmentType',
      label: 'Employment Type',
      type: 'radio',
      required: true,
      order: 6,
      options: [
        { label: 'Full Time', value: 'fulltime' },
        { label: 'Part Time', value: 'parttime' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    { id: generateId(), name: 'startDate', label: 'Start Date', type: 'date', required: true, order: 7 },
    { id: contractEndDateId, name: 'contractEndDate', label: 'Contract End Date', type: 'date', required: false, order: 8 },
    { id: remoteWorkId, name: 'remoteWork', label: 'Remote Employee', type: 'checkbox', required: false, defaultValue: false, order: 9 },
    { id: officeLocationId, name: 'officeLocation', label: 'Office Location', type: 'text', required: false, placeholder: 'Building / Floor', order: 10 },
    { id: generateId(), name: 'bio', label: 'Short Bio', type: 'textarea', required: false, order: 11 },
    { id: agreeTermsId, name: 'agreeToTerms', label: 'I agree to the terms and conditions', type: 'checkbox', required: true, defaultValue: false, order: 12 },
    { id: resumeId, name: 'resume', label: 'Resume', type: 'file', required: true, order: 13 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: contractEndDateId, conditions: [cond('employmentType', 'equals', 'contract')], logic: 'and' },
      { id: generateId(), targetFieldId: officeLocationId, conditions: [cond('remoteWork', 'equals', false)], logic: 'and' },
    ],
    dependencies: [
      { id: generateId(), sourceFieldId: employmentTypeId, targetFieldId: contractEndDateId, conditions: [cond('employmentType', 'equals', 'contract')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: remoteWorkId, targetFieldId: officeLocationId, conditions: [cond('remoteWork', 'equals', false)], logic: 'and', action: 'setVisible' },
    ],
    validation: {
      [contractEndDateId]: [
        { id: generateId(), type: 'required', message: 'Contract end date required', conditions: [cond('employmentType', 'equals', 'contract')], logic: 'and' },
      ],
      [officeLocationId]: [
        { id: generateId(), type: 'required', message: 'Office location required for on-site employees', conditions: [cond('remoteWork', 'equals', false)], logic: 'and' },
      ],
      [resumeId]: [req('Resume is required')],
      [agreeTermsId]: [req('You must agree to the terms')],
    },
  },
);

employeeOnboardingFormTemplate.fields
  .filter((f) => f.required && f.id !== resumeId && f.id !== agreeTermsId)
  .forEach((f) => {
    employeeOnboardingFormTemplate.rules.validation[f.id] = [
      ...(employeeOnboardingFormTemplate.rules.validation[f.id] ?? []),
      req(`${f.label} is required`),
    ];
  });
