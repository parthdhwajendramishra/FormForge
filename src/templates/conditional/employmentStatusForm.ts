import type { FormDefinition } from '../../types';
import { buildTemplate, cond, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const statusId = generateId();
const employerId = generateId();
const jobTitleId = generateId();
const startDateId = generateId();
const reasonId = generateId();

export const employmentStatusFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'employment-status',
    'Employment Status Form',
    'Radio-driven dependencies: employed shows employer details, unemployed shows reason',
  ),
  [
    { id: generateId(), name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, order: 0 },
    {
      id: statusId,
      name: 'employmentStatus',
      label: 'Employment Status',
      type: 'radio',
      required: true,
      order: 1,
      options: [
        { label: 'Employed', value: 'employed' },
        { label: 'Unemployed', value: 'unemployed' },
        { label: 'Student', value: 'student' },
      ],
    },
    { id: employerId, name: 'employerName', label: 'Employer Name', type: 'text', required: false, order: 2 },
    { id: jobTitleId, name: 'jobTitle', label: 'Job Title', type: 'text', required: false, order: 3 },
    { id: startDateId, name: 'startDate', label: 'Start Date', type: 'date', required: false, order: 4 },
    { id: reasonId, name: 'reasonForLeaving', label: 'Reason for Leaving', type: 'textarea', required: false, order: 5 },
  ],
  {
    visibility: [
      { id: generateId(), targetFieldId: employerId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      { id: generateId(), targetFieldId: jobTitleId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      { id: generateId(), targetFieldId: startDateId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      { id: generateId(), targetFieldId: reasonId, conditions: [cond('employmentStatus', 'equals', 'unemployed')], logic: 'and' },
    ],
    dependencies: [
      { id: generateId(), sourceFieldId: statusId, targetFieldId: employerId, conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and', action: 'setVisible' },
      { id: generateId(), sourceFieldId: statusId, targetFieldId: reasonId, conditions: [cond('employmentStatus', 'equals', 'unemployed')], logic: 'and', action: 'setVisible' },
    ],
    validation: {
      [employerId]: [
        { id: generateId(), type: 'required', message: 'Employer name required', conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      ],
      [jobTitleId]: [
        { id: generateId(), type: 'required', message: 'Job title required', conditions: [cond('employmentStatus', 'equals', 'employed')], logic: 'and' },
      ],
      [reasonId]: [
        { id: generateId(), type: 'required', message: 'Please provide a reason', conditions: [cond('employmentStatus', 'equals', 'unemployed')], logic: 'and' },
        { id: generateId(), type: 'minLength', value: 10, conditions: [cond('employmentStatus', 'equals', 'unemployed')], logic: 'and' },
      ],
    },
  },
);

employmentStatusFormTemplate.rules.validation[employmentStatusFormTemplate.fields[0].id] = [req()];
employmentStatusFormTemplate.rules.validation[statusId] = [req()];
