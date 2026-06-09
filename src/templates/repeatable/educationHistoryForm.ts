import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const sectionId = generateId();
const institutionId = generateId();
const degreeId = generateId();
const fieldOfStudyId = generateId();
const graduationYearId = generateId();

export const educationHistoryFormTemplate: FormDefinition = {
  ...buildTemplate(
    createTemplateShell(
      'education-history',
      'Education History',
      'Repeatable education records (min 0, max 4)',
    ),
    [
      { id: generateId(), name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, order: 0 },
      { id: institutionId, name: 'institution', label: 'Institution', type: 'text', required: false, sectionId, order: 1 },
      { id: degreeId, name: 'degree', label: 'Degree', type: 'text', required: false, sectionId, order: 2 },
      { id: fieldOfStudyId, name: 'fieldOfStudy', label: 'Field of Study', type: 'text', required: false, sectionId, order: 3 },
      { id: graduationYearId, name: 'graduationYear', label: 'Graduation Year', type: 'number', required: false, sectionId, order: 4 },
    ],
    {
      validation: {
        [institutionId]: [req('Institution is required')],
        [degreeId]: [req('Degree is required')],
        [graduationYearId]: [
          { id: generateId(), type: 'min', value: 1950 },
          { id: generateId(), type: 'max', value: 2030 },
        ],
      },
    },
  ),
  sections: [
    {
      id: sectionId,
      name: 'educationRecords',
      label: 'Education Records',
      fieldIds: [institutionId, degreeId, fieldOfStudyId, graduationYearId],
      minEntries: 0,
      maxEntries: 4,
    },
  ],
};

educationHistoryFormTemplate.rules.validation[educationHistoryFormTemplate.fields[0].id] = [req()];
