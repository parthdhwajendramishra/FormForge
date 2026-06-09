export const PAIN_POINTS = [
  'Requirements live in documents',
  'Validation rules are scattered',
  'Business logic gets lost between teams',
  'Designers cannot define behavior',
  'Developers reimplement everything manually',
];

export const SOLUTION_ITEMS = [
  'Fields',
  'Validation Rules',
  'Conditional Logic',
  'Repeatable Sections',
  'Dependencies',
];

export const AUDIENCE = [
  {
    role: 'Product Managers',
    description: 'Define business rules without writing code.',
  },
  {
    role: 'UI/UX Designers',
    description: 'Document field behavior, validation and dependencies.',
  },
  {
    role: 'QA Engineers',
    description: 'Understand expected behavior before testing.',
  },
  {
    role: 'Developers',
    description: 'Generate production-ready React forms.',
  },
];

export const LANDING_TEMPLATES = [
  {
    name: 'Employee Onboarding',
    rules: 'Multiple field types, required rules, file upload',
    templateId: 'employee-onboarding',
  },
  {
    name: 'KYC Form',
    rules: 'Country-based visibility — PAN for India, SSN for USA',
    templateId: 'kyc',
  },
  {
    name: 'Employment Verification',
    rules: 'Conditional validation when employment status is employed',
    templateId: 'employment-verification',
  },
  {
    name: 'Registration Form',
    rules: 'Age-based conditional visibility and validation',
    templateId: 'registration',
  },
  {
    name: 'Country Based Logic',
    rules: 'Field dependencies driven by country selection',
    templateId: 'kyc',
  },
  {
    name: 'Age Based Logic',
    rules: 'Show driving license at 18+, guardian info under 18',
    templateId: 'registration',
  },
];

export const FEATURES = [
  { title: 'Visual Form Builder', description: 'Define fields quickly.' },
  { title: 'Validation Engine', description: 'Configure Yup and Zod validations visually.' },
  { title: 'Conditional Logic', description: 'Show and hide fields based on business rules.' },
  { title: 'Repeatable Sections', description: 'Support dynamic groups and collections.' },
  { title: 'Multiple UI Outputs', description: 'Generate Material UI or Plain React JSX.' },
  { title: 'Export & Import', description: 'Share and reuse form definitions.' },
  { title: 'Runs Locally', description: 'No backend required.' },
];

export const STEPS = [
  { step: '1', title: 'Create fields', description: 'Add text, select, date and other field types visually.' },
  { step: '2', title: 'Add validations and dependencies', description: 'Define rules, visibility and repeatable sections.' },
  { step: '3', title: 'Generate React code', description: 'Output Formik components with Yup or Zod validation.' },
  { step: '4', title: 'Copy and use in your project', description: 'Download or paste directly into your codebase.' },
];

export const TRUST_ITEMS = [
  'React',
  'Formik',
  'Yup',
  'Zod',
  'Material UI',
  'Plain JSX',
  'JSON Export',
  'Local-first',
];

export const HERO_PIPELINE = [
  { label: 'Field Definition', detail: 'name, type, required' },
  { label: 'Validation Rules', detail: 'required, min, regex, email' },
  { label: 'Conditional Logic', detail: 'visibility & dependencies' },
  { label: 'Generated React Code', detail: 'Formik + Yup / Zod' },
];
