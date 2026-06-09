import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

export const contactFormTemplate: FormDefinition = {
  id: 'template-contact',
  name: 'Contact Form',
  description: 'Basic contact form with text, email, and textarea fields',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [],
  rules: {
    ...createEmptyFormRules(),
    validation: {},
  },
  fields: [
    {
      id: generateId(),
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your first name',
      order: 0,
    },
    {
      id: generateId(),
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your last name',
      order: 1,
    },
    {
      id: generateId(),
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'you@example.com',
      order: 2,
    },
    {
      id: generateId(),
      name: 'phone',
      label: 'Phone',
      type: 'phone',
      required: false,
      placeholder: '+1 (555) 000-0000',
      order: 3,
    },
    {
      id: generateId(),
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'How can we help?',
      order: 4,
    },
  ],
};

contactFormTemplate.rules.validation = {
  [contactFormTemplate.fields[0].id]: [
    { id: generateId(), type: 'required', message: 'First name is required' },
    { id: generateId(), type: 'minLength', value: 2, message: 'Minimum 2 characters' },
    { id: generateId(), type: 'maxLength', value: 50, message: 'Maximum 50 characters' },
  ],
  [contactFormTemplate.fields[1].id]: [
    { id: generateId(), type: 'required', message: 'Last name is required' },
  ],
  [contactFormTemplate.fields[2].id]: [
    { id: generateId(), type: 'required', message: 'Email is required' },
    { id: generateId(), type: 'email', message: 'Enter a valid email' },
  ],
  [contactFormTemplate.fields[4].id]: [
    { id: generateId(), type: 'required', message: 'Message is required' },
    { id: generateId(), type: 'minLength', value: 10, message: 'Minimum 10 characters' },
  ],
};
