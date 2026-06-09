import { loginFormTemplate } from './basic/loginForm';
import { registrationFormTemplate } from './basic/registrationForm';
import { contactFormTemplate } from './basic/contactForm';
import { newsletterSignupTemplate } from './basic/newsletterSignup';
import { userProfileFormTemplate } from './validation/userProfileForm';
import { productCreationFormTemplate } from './validation/productCreationForm';
import { countryIdentityFormTemplate } from './conditional/countryIdentityForm';
import { ageRegistrationFormTemplate } from './conditional/ageRegistrationForm';
import { employmentStatusFormTemplate } from './conditional/employmentStatusForm';
import { previousAddressFormTemplate } from './repeatable/previousAddressForm';
import { familyMembersFormTemplate } from './repeatable/familyMembersForm';
import { educationHistoryFormTemplate } from './repeatable/educationHistoryForm';
import { employeeOnboardingFormTemplate } from './business/employeeOnboardingForm';
import { employmentVerificationFormTemplate } from './business/employmentVerificationForm';
import { kycFormTemplate } from './business/kycForm';
import { loanApplicationFormTemplate } from './business/loanApplicationForm';
import type { TemplateCategory, TemplateMeta } from './types';
import { TEMPLATE_CATEGORY_ORDER } from './types';
import type { FormDefinition } from '../types';

export type { TemplateCategory, TemplateMeta } from './types';
export { TEMPLATE_CATEGORY_LABELS, TEMPLATE_CATEGORY_ORDER } from './types';

export const TEMPLATES: TemplateMeta[] = [
  // Category 1: Basic Forms
  {
    id: 'login',
    name: 'Login Form',
    description: 'Simple email and password authentication',
    category: 'basic',
    features: ['email', 'password', 'required', 'email validation'],
    featured: false,
    definition: loginFormTemplate,
  },
  {
    id: 'registration',
    name: 'Registration Form',
    description: 'Account signup with name, email and password fields',
    marketingDescription: 'Production-ready signup form with email validation and password rules — copy, customize, and ship.',
    category: 'basic',
    features: ['text', 'email', 'password', 'required', 'minLength'],
    featured: true,
    definition: registrationFormTemplate,
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'General inquiry form with name, email, subject and message',
    category: 'basic',
    features: ['text', 'email', 'textarea', 'required', 'minLength'],
    featured: false,
    definition: contactFormTemplate,
  },
  {
    id: 'newsletter-signup',
    name: 'Newsletter Signup',
    description: 'Email capture with required terms acceptance',
    category: 'basic',
    features: ['email', 'checkbox', 'required', 'terms'],
    featured: false,
    definition: newsletterSignupTemplate,
  },

  // Category 2: Validation Showcase
  {
    id: 'user-profile',
    name: 'User Profile Form',
    description: 'Required, min/max length, email, phone and regex validation',
    category: 'validation',
    features: ['required', 'minLength', 'maxLength', 'email', 'phone', 'regex'],
    featured: false,
    definition: userProfileFormTemplate,
  },
  {
    id: 'product-creation',
    name: 'Product Creation Form',
    description: 'Number fields with min and max value validation',
    category: 'validation',
    features: ['number', 'min', 'max', 'required'],
    featured: false,
    definition: productCreationFormTemplate,
  },

  // Category 3: Conditional Logic
  {
    id: 'country-identity',
    name: 'Country Based Identity Form',
    description: 'India → PAN, USA → SSN, Canada → SIN with dependencies and conditional validation',
    marketingDescription: 'Show the right identity field per country — dependencies, visibility, and conditional required rules in one form.',
    category: 'conditional',
    features: ['dependencies', 'conditional visibility', 'conditional validation', 'select', 'regex'],
    featured: true,
    definition: countryIdentityFormTemplate,
  },
  {
    id: 'age-registration',
    name: 'Age Based Registration',
    description: 'Age < 18 shows guardian info; age >= 18 shows driving license',
    marketingDescription: 'Branch your form by age — guardian fields for minors, license for adults, with conditional validation.',
    category: 'conditional',
    features: ['numeric conditions', 'conditional sections', 'conditional validation', 'phone'],
    featured: true,
    definition: ageRegistrationFormTemplate,
  },
  {
    id: 'employment-status',
    name: 'Employment Status Form',
    description: 'Radio-driven dependencies: employed shows employer details, unemployed shows reason',
    category: 'conditional',
    features: ['radio', 'dependencies', 'conditional visibility', 'conditional validation'],
    featured: false,
    definition: employmentStatusFormTemplate,
  },

  // Category 4: Repeatable Sections
  {
    id: 'previous-address',
    name: 'Previous Address History',
    description: 'Repeatable address section with min 0 and max 2 entries',
    marketingDescription: 'Collect up to two prior addresses with add/remove — repeatable sections with min and max limits.',
    category: 'repeatable',
    features: ['repeatable sections', 'minEntries', 'maxEntries', 'FieldArray'],
    featured: true,
    definition: previousAddressFormTemplate,
  },
  {
    id: 'family-members',
    name: 'Family Members Form',
    description: 'Dynamic family member list with add and remove (min 1, max 5)',
    category: 'repeatable',
    features: ['repeatable sections', 'dynamic add/remove', 'select', 'phone'],
    featured: false,
    definition: familyMembersFormTemplate,
  },
  {
    id: 'education-history',
    name: 'Education History',
    description: 'Repeatable education records (min 0, max 4)',
    category: 'repeatable',
    features: ['repeatable sections', 'number validation', 'minEntries', 'maxEntries'],
    featured: false,
    definition: educationHistoryFormTemplate,
  },

  // Category 5: Business Forms
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding',
    description: 'Multi-section onboarding with employment type conditionals, validation and file upload',
    marketingDescription: 'Full onboarding workflow — multiple field types, conditional logic, validation, and resume upload.',
    category: 'business',
    features: ['multiple sections', 'conditional logic', 'validation', 'file upload', 'checkbox'],
    featured: true,
    definition: employeeOnboardingFormTemplate,
  },
  {
    id: 'employment-verification',
    name: 'Employment Verification',
    description: 'Conditional validation and visibility based on employment status',
    marketingDescription: 'Verify employment with status-driven fields — conditional validation that mirrors real business rules.',
    category: 'business',
    features: ['conditional validation', 'conditional visibility', 'business rules', 'number'],
    featured: true,
    definition: employmentVerificationFormTemplate,
  },
  {
    id: 'kyc',
    name: 'KYC Form',
    description: 'Identity verification with country-based logic, conditional validation and document upload',
    category: 'business',
    features: ['identity documents', 'country logic', 'file upload', 'conditional validation'],
    featured: false,
    definition: kycFormTemplate,
  },
  {
    id: 'loan-application',
    name: 'Loan Application',
    description: 'Income details, employment type conditionals and co-applicant logic',
    category: 'business',
    features: ['income details', 'employment type', 'co-applicant logic', 'conditional validation'],
    featured: false,
    definition: loanApplicationFormTemplate,
  },
];

export const FEATURED_TEMPLATES = TEMPLATES.filter((t) => t.featured);

export const getTemplatesByCategory = (category: TemplateCategory): TemplateMeta[] =>
  TEMPLATES.filter((t) => t.category === category);

export const getTemplatesGroupedByCategory = (): { category: TemplateCategory; templates: TemplateMeta[] }[] =>
  TEMPLATE_CATEGORY_ORDER.map((category) => ({
    category,
    templates: getTemplatesByCategory(category),
  }));

export const getTemplateById = (id: string): FormDefinition | null => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template ? template.definition : null;
};

export const getTemplateMetaById = (id: string): TemplateMeta | null =>
  TEMPLATES.find((t) => t.id === id) ?? null;
