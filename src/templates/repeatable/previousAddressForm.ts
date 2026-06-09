import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const sectionId = generateId();
const streetId = generateId();
const cityId = generateId();
const stateId = generateId();
const zipId = generateId();
const fromDateId = generateId();

export const previousAddressFormTemplate: FormDefinition = {
  ...buildTemplate(
    createTemplateShell(
      'previous-address',
      'Previous Address History',
      'Repeatable address section with min 0 and max 2 entries',
    ),
    [
      { id: generateId(), name: 'currentStreet', label: 'Current Street', type: 'text', required: true, order: 0 },
      { id: generateId(), name: 'currentCity', label: 'Current City', type: 'text', required: true, order: 1 },
      { id: streetId, name: 'street', label: 'Street', type: 'text', required: false, sectionId, order: 2 },
      { id: cityId, name: 'city', label: 'City', type: 'text', required: false, sectionId, order: 3 },
      { id: stateId, name: 'state', label: 'State', type: 'text', required: false, sectionId, order: 4 },
      { id: zipId, name: 'zipCode', label: 'ZIP Code', type: 'text', required: false, sectionId, order: 5 },
      { id: fromDateId, name: 'fromDate', label: 'From Date', type: 'date', required: false, sectionId, order: 6 },
    ],
    {
      validation: {
        [streetId]: [req('Street is required when address is added')],
        [cityId]: [req('City is required when address is added')],
        [zipId]: [{ id: generateId(), type: 'regex', value: '^\\d{5}(-\\d{4})?$', message: 'Valid ZIP code required' }],
      },
    },
  ),
  sections: [
    {
      id: sectionId,
      name: 'previousAddresses',
      label: 'Previous Addresses',
      fieldIds: [streetId, cityId, stateId, zipId, fromDateId],
      minEntries: 0,
      maxEntries: 2,
    },
  ],
};

previousAddressFormTemplate.rules.validation[previousAddressFormTemplate.fields[0].id] = [req()];
previousAddressFormTemplate.rules.validation[previousAddressFormTemplate.fields[1].id] = [req()];
