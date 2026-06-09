import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

export const employeeOnboardingTemplate: FormDefinition = {
  id: 'template-employee-onboarding',
  name: 'Employee Onboarding',
  description: 'Comprehensive onboarding form with multiple field types',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: createEmptyFormRules(),
  fields: [
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
      id: generateId(),
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
    {
      id: generateId(),
      name: 'bio',
      label: 'Short Bio',
      type: 'textarea',
      required: false,
      order: 8,
    },
    {
      id: generateId(),
      name: 'agreeToTerms',
      label: 'I agree to the terms and conditions',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      order: 9,
    },
    { id: generateId(), name: 'resume', label: 'Resume', type: 'file', required: true, order: 10 },
  ],
};

employeeOnboardingTemplate.rules.validation = Object.fromEntries(
  employeeOnboardingTemplate.fields
    .filter((f) => f.required)
    .map((f) => [
      f.id,
      [{ id: generateId(), type: 'required' as const, message: `${f.label} is required` }],
    ]),
);
