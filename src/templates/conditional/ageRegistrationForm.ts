import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const ageId = generateId();
const drivingLicenseId = generateId();
const guardianNameId = generateId();
const guardianPhoneId = generateId();

export const ageRegistrationFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'age-registration',
    'Age Based Registration',
    'Age < 18 shows guardian info; age >= 18 shows driving license with conditional validation',
  ),
  [
    { id: generateId(), name: 'firstName', label: 'First Name', type: 'text', required: true, order: 0 },
    { id: generateId(), name: 'lastName', label: 'Last Name', type: 'text', required: true, order: 1 },
    { id: ageId, name: 'age', label: 'Age', type: 'number', required: true, order: 2 },
    { id: drivingLicenseId, name: 'drivingLicense', label: 'Driving License Number', type: 'text', required: false, order: 3 },
    { id: guardianNameId, name: 'guardianName', label: 'Guardian Name', type: 'text', required: false, order: 4 },
    { id: guardianPhoneId, name: 'guardianPhone', label: 'Guardian Phone', type: 'phone', required: false, order: 5 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: drivingLicenseId, conditions: [cond('age', 'greaterThan', 17)], logic: 'and' },
      { id: generateId(), targetFieldId: guardianNameId, conditions: [cond('age', 'lessThan', 18)], logic: 'and' },
      { id: generateId(), targetFieldId: guardianPhoneId, conditions: [cond('age', 'lessThan', 18)], logic: 'and' },
    ],
    validation: {
      [ageId]: [req(), { id: generateId(), type: 'min', value: 1 }, { id: generateId(), type: 'max', value: 120 }],
      [drivingLicenseId]: [
        { id: generateId(), type: 'required', message: 'Driving license required for adults', conditions: [cond('age', 'greaterThan', 17)], logic: 'and' },
      ],
      [guardianNameId]: [
        { id: generateId(), type: 'required', message: 'Guardian name required for minors', conditions: [cond('age', 'lessThan', 18)], logic: 'and' },
      ],
      [guardianPhoneId]: [
        { id: generateId(), type: 'required', message: 'Guardian phone required for minors', conditions: [cond('age', 'lessThan', 18)], logic: 'and' },
        { id: generateId(), type: 'phone', conditions: [cond('age', 'lessThan', 18)], logic: 'and' },
      ],
    },
  },
);

ageRegistrationFormTemplate.rules.validation[ageRegistrationFormTemplate.fields[0].id] = [req()];
ageRegistrationFormTemplate.rules.validation[ageRegistrationFormTemplate.fields[1].id] = [req()];
