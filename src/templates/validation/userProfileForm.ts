import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const firstNameId = generateId();
const lastNameId = generateId();
const emailId = generateId();
const phoneId = generateId();
const usernameId = generateId();
const bioId = generateId();

export const userProfileFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'user-profile',
    'User Profile Form',
    'Demonstrates required, min/max length, email, phone and regex validation',
  ),
  [
    { id: firstNameId, name: 'firstName', label: 'First Name', type: 'text', required: true, order: 0 },
    { id: lastNameId, name: 'lastName', label: 'Last Name', type: 'text', required: true, order: 1 },
    { id: emailId, name: 'email', label: 'Email', type: 'email', required: true, order: 2 },
    { id: phoneId, name: 'phone', label: 'Phone', type: 'phone', required: true, placeholder: '+1 555 000 0000', order: 3 },
    { id: usernameId, name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'letters and numbers only', order: 4 },
    { id: bioId, name: 'bio', label: 'Bio', type: 'textarea', required: false, order: 5 },
  ],
  {
    validation: {
      [firstNameId]: [req(), { id: generateId(), type: 'minLength', value: 2 }, { id: generateId(), type: 'maxLength', value: 50 }],
      [lastNameId]: [req(), { id: generateId(), type: 'minLength', value: 2 }, { id: generateId(), type: 'maxLength', value: 50 }],
      [emailId]: [req(), { id: generateId(), type: 'email', message: 'Enter a valid email address' }],
      [phoneId]: [req(), { id: generateId(), type: 'phone', message: 'Enter a valid phone number' }],
      [usernameId]: [
        req(),
        { id: generateId(), type: 'regex', value: '^[a-zA-Z0-9_]{3,20}$', message: '3–20 alphanumeric characters' },
      ],
      [bioId]: [{ id: generateId(), type: 'maxLength', value: 300, message: 'Bio cannot exceed 300 characters' }],
    },
  },
);
