import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

const emailId = generateId();
const passwordId = generateId();

export const loginFormTemplate: FormDefinition = {
  id: 'template-login',
  name: 'Login Form',
  description: 'Minimal login form with email and password',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: {
    ...createEmptyFormRules(),
    validation: {
      [emailId]: [
        { id: generateId(), type: 'required', message: 'Email is required' },
        { id: generateId(), type: 'email', message: 'Enter a valid email' },
      ],
      [passwordId]: [
        { id: generateId(), type: 'required', message: 'Password is required' },
        { id: generateId(), type: 'minLength', value: 8, message: 'Minimum 8 characters' },
      ],
    },
  },
  fields: [
    {
      id: emailId,
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'you@example.com',
      order: 0,
    },
    {
      id: passwordId,
      name: 'password',
      label: 'Password',
      type: 'text',
      required: true,
      placeholder: 'Enter your password',
      order: 1,
    },
    {
      id: generateId(),
      name: 'rememberMe',
      label: 'Remember Me',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      order: 2,
    },
  ],
};
