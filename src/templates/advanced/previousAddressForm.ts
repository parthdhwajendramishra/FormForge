import type { FormDefinition } from '../../types';
import { createEmptyFormRules } from '../../types';
import { generateId } from '../../utils/id';

const now = new Date().toISOString();

const sectionId = generateId();
const streetId = generateId();
const cityId = generateId();
const stateId = generateId();
const zipId = generateId();

export const previousAddressFormTemplate: FormDefinition = {
  id: 'template-previous-address',
  name: 'Previous Address Form',
  description: 'Repeatable address section with FieldArray (min 0, max 2)',
  version: 1,
  createdAt: now,
  updatedAt: now,
  sections: [
    {
      id: sectionId,
      name: 'previousAddresses',
      label: 'Previous Addresses',
      fieldIds: [streetId, cityId, stateId, zipId],
      minEntries: 0,
      maxEntries: 2,
    },
  ],
  rules: createEmptyFormRules(),
  fields: [
    {
      id: generateId(),
      name: 'currentStreet',
      label: 'Current Street',
      type: 'text',
      required: true,
      order: 0,
    },
    {
      id: generateId(),
      name: 'currentCity',
      label: 'Current City',
      type: 'text',
      required: true,
      order: 1,
    },
    {
      id: streetId,
      name: 'street',
      label: 'Street',
      type: 'text',
      required: false,
      sectionId,
      order: 2,
    },
    {
      id: cityId,
      name: 'city',
      label: 'City',
      type: 'text',
      required: false,
      sectionId,
      order: 3,
    },
    {
      id: stateId,
      name: 'state',
      label: 'State',
      type: 'text',
      required: false,
      sectionId,
      order: 4,
    },
    {
      id: zipId,
      name: 'zipCode',
      label: 'ZIP Code',
      type: 'text',
      required: false,
      sectionId,
      order: 5,
    },
  ],
};

const currentStreetId = previousAddressFormTemplate.fields[0].id;
const currentCityId = previousAddressFormTemplate.fields[1].id;

previousAddressFormTemplate.rules.validation = {
  [currentStreetId]: [{ id: generateId(), type: 'required', message: 'Current street is required' }],
  [currentCityId]: [{ id: generateId(), type: 'required', message: 'Current city is required' }],
  [streetId]: [{ id: generateId(), type: 'required', message: 'Street is required when address is added' }],
  [cityId]: [{ id: generateId(), type: 'required', message: 'City is required when address is added' }],
};
