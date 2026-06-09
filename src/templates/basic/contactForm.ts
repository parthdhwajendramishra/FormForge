import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const nameId = generateId();
const emailId = generateId();
const subjectId = generateId();
const messageId = generateId();

export const contactFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell('contact', 'Contact Form', 'General inquiry form with name, email, subject and message'),
  [
    { id: nameId, name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name', order: 0 },
    { id: emailId, name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com', order: 1 },
    { id: subjectId, name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'What is this about?', order: 2 },
    { id: messageId, name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help?', order: 3 },
  ],
  {
    validation: {
      [nameId]: [req(), { id: generateId(), type: 'minLength', value: 2 }],
      [emailId]: [req(), { id: generateId(), type: 'email' }],
      [subjectId]: [req(), { id: generateId(), type: 'maxLength', value: 100 }],
      [messageId]: [req(), { id: generateId(), type: 'minLength', value: 10, message: 'Please provide more detail' }],
    },
  },
);
