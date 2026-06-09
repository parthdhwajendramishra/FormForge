import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

const ageId = generateId();
const drivingLicenseId = generateId();
const guardianNameId = generateId();

export const registrationFormTemplate: FormDefinition = {
  id: 'template-registration',
  name: 'Registration Form',
  description: 'Registration with age-based conditional visibility',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: {
    ...createEmptyFormRules(),
    visibility: [
      {
        id: generateId(),
        targetFieldId: drivingLicenseId,
        conditions: [{ id: generateId(), field: 'age', operator: 'greaterThan', value: 17 }],
        logic: 'and',
      },
      {
        id: generateId(),
        targetFieldId: guardianNameId,
        conditions: [{ id: generateId(), field: 'age', operator: 'lessThan', value: 18 }],
        logic: 'and',
      },
    ],
    validation: {},
  },
  fields: [
    {
      id: generateId(),
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      order: 0,
    },
    {
      id: generateId(),
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      order: 1,
    },
    {
      id: generateId(),
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      order: 2,
    },
    {
      id: ageId,
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      order: 3,
    },
    {
      id: drivingLicenseId,
      name: 'drivingLicense',
      label: 'Driving License Number',
      type: 'text',
      required: false,
      order: 4,
    },
    {
      id: guardianNameId,
      name: 'guardianName',
      label: 'Guardian Name',
      type: 'text',
      required: false,
      order: 5,
    },
  ],
};

const firstNameId = registrationFormTemplate.fields[0].id;
const lastNameId = registrationFormTemplate.fields[1].id;
const emailFieldId = registrationFormTemplate.fields[2].id;

registrationFormTemplate.rules.validation = {
  [firstNameId]: [
    { id: generateId(), type: 'required', message: 'First name is required' },
    { id: generateId(), type: 'minLength', value: 2 },
    { id: generateId(), type: 'maxLength', value: 50 },
  ],
  [lastNameId]: [
    { id: generateId(), type: 'required', message: 'Last name is required' },
  ],
  [emailFieldId]: [
    { id: generateId(), type: 'required', message: 'Email is required' },
    { id: generateId(), type: 'email' },
  ],
  [ageId]: [
    { id: generateId(), type: 'required', message: 'Age is required' },
    { id: generateId(), type: 'min', value: 1 },
    { id: generateId(), type: 'max', value: 120 },
  ],
  [drivingLicenseId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'Driving license required for adults',
      conditions: [{ id: generateId(), field: 'age', operator: 'greaterThan', value: 17 }],
      logic: 'and',
    },
  ],
  [guardianNameId]: [
    {
      id: generateId(),
      type: 'required',
      message: 'Guardian name required for minors',
      conditions: [{ id: generateId(), field: 'age', operator: 'lessThan', value: 18 }],
      logic: 'and',
    },
  ],
};
