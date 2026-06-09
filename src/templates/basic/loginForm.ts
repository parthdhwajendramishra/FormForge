import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const emailId = generateId();
const passwordId = generateId();

export const loginFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell('login', 'Login Form', 'Simple email and password authentication'),
  [
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
  ],
  {
    validation: {
      [emailId]: [req('Email is required'), { id: generateId(), type: 'email', message: 'Enter a valid email' }],
      [passwordId]: [req('Password is required'), { id: generateId(), type: 'minLength', value: 8, message: 'Minimum 8 characters' }],
    },
  },
);
