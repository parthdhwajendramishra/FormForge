import type { FormDefinition } from '../types';
import { contactFormTemplate } from './basic/contactForm';
import { loginFormTemplate } from './basic/loginForm';
import { registrationFormTemplate } from './basic/registrationForm';
import { employeeOnboardingTemplate } from './advanced/employeeOnboarding';
import { employmentVerificationTemplate } from './advanced/employmentVerification';
import { kycFormTemplate } from './advanced/kycForm';
import { previousAddressFormTemplate } from './advanced/previousAddressForm';

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced';
  definition: FormDefinition;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Text, email, textarea with validation',
    category: 'basic',
    definition: contactFormTemplate,
  },
  {
    id: 'registration',
    name: 'Registration Form',
    description: 'Age-based conditional visibility and validation',
    category: 'basic',
    definition: registrationFormTemplate,
  },
  {
    id: 'login',
    name: 'Login Form',
    description: 'Minimal login with required fields',
    category: 'basic',
    definition: loginFormTemplate,
  },
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding',
    description: 'Multiple field types for onboarding',
    category: 'advanced',
    definition: employeeOnboardingTemplate,
  },
  {
    id: 'employment-verification',
    name: 'Employment Verification',
    description: 'Conditional validation by employment status',
    category: 'advanced',
    definition: employmentVerificationTemplate,
  },
  {
    id: 'kyc',
    name: 'KYC Form',
    description: 'Country-dependent PAN/SSN fields',
    category: 'advanced',
    definition: kycFormTemplate,
  },
  {
    id: 'previous-address',
    name: 'Previous Address Form',
    description: 'Repeatable sections with FieldArray',
    category: 'advanced',
    definition: previousAddressFormTemplate,
  },
];

export const getTemplateById = (id: string): FormDefinition | null => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template ? template.definition : null;
};
