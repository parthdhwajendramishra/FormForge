import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const sectionId = generateId();
const memberNameId = generateId();
const relationshipId = generateId();
const memberAgeId = generateId();
const memberPhoneId = generateId();

export const familyMembersFormTemplate: FormDefinition = {
  ...buildTemplate(
    createTemplateShell(
      'family-members',
      'Family Members Form',
      'Dynamic family member list with add and remove (min 1, max 5)',
    ),
    [
      { id: generateId(), name: 'householdHead', label: 'Household Head', type: 'text', required: true, order: 0 },
      { id: memberNameId, name: 'memberName', label: 'Member Name', type: 'text', required: false, sectionId, order: 1 },
      {
        id: relationshipId,
        name: 'relationship',
        label: 'Relationship',
        type: 'select',
        required: false,
        sectionId,
        order: 2,
        options: [
          { label: 'Spouse', value: 'spouse' },
          { label: 'Child', value: 'child' },
          { label: 'Parent', value: 'parent' },
          { label: 'Sibling', value: 'sibling' },
        ],
      },
      { id: memberAgeId, name: 'memberAge', label: 'Age', type: 'number', required: false, sectionId, order: 3 },
      { id: memberPhoneId, name: 'memberPhone', label: 'Phone', type: 'phone', required: false, sectionId, order: 4 },
    ],
    {
      validation: {
        [memberNameId]: [req('Member name is required')],
        [relationshipId]: [req('Relationship is required')],
        [memberAgeId]: [{ id: generateId(), type: 'min', value: 0 }, { id: generateId(), type: 'max', value: 120 }],
      },
    },
  ),
  sections: [
    {
      id: sectionId,
      name: 'familyMembers',
      label: 'Family Members',
      fieldIds: [memberNameId, relationshipId, memberAgeId, memberPhoneId],
      minEntries: 1,
      maxEntries: 5,
    },
  ],
};

familyMembersFormTemplate.rules.validation[familyMembersFormTemplate.fields[0].id] = [req()];
