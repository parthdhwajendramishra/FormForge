import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const emailId = generateId();
const termsId = generateId();

export const newsletterSignupTemplate: FormDefinition = buildTemplate(
  createTemplateShell('newsletter-signup', 'Newsletter Signup', 'Email capture with required terms acceptance'),
  [
    { id: emailId, name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com', order: 0 },
    { id: termsId, name: 'acceptTerms', label: 'I agree to receive emails and accept the terms', type: 'checkbox', required: true, defaultValue: false, order: 1 },
  ],
  {
    validation: {
      [emailId]: [req(), { id: generateId(), type: 'email' }],
      [termsId]: [req('You must accept the terms to subscribe')],
    },
  },
);
