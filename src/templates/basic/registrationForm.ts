import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const firstNameId = generateId();
const lastNameId = generateId();
const emailId = generateId();
const passwordId = generateId();
const confirmPasswordId = generateId();

export const registrationFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'registration',
    'Registration Form',
    'Account signup with name, email and password fields',
  ),
  [
    { id: firstNameId, name: 'firstName', label: 'First Name', type: 'text', required: true, order: 0 },
    { id: lastNameId, name: 'lastName', label: 'Last Name', type: 'text', required: true, order: 1 },
    { id: emailId, name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com', order: 2 },
    { id: passwordId, name: 'password', label: 'Password', type: 'text', required: true, order: 3 },
    { id: confirmPasswordId, name: 'confirmPassword', label: 'Confirm Password', type: 'text', required: true, order: 4 },
  ],
  {
    validation: {
      [firstNameId]: [req(), { id: generateId(), type: 'minLength', value: 2 }, { id: generateId(), type: 'maxLength', value: 50 }],
      [lastNameId]: [req()],
      [emailId]: [req(), { id: generateId(), type: 'email' }],
      [passwordId]: [req(), { id: generateId(), type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }],
      [confirmPasswordId]: [req('Please confirm your password'), { id: generateId(), type: 'minLength', value: 8 }],
    },
  },
);
