import type { FormDefinition } from '../../types';
import { buildTemplate, createTemplateShell, req } from '../builders';
import { generateId } from '../../utils/id';

const nameId = generateId();
const priceId = generateId();
const quantityId = generateId();
const discountId = generateId();

export const productCreationFormTemplate: FormDefinition = buildTemplate(
  createTemplateShell(
    'product-creation',
    'Product Creation Form',
    'Demonstrates number fields with min and max value validation',
  ),
  [
    { id: nameId, name: 'productName', label: 'Product Name', type: 'text', required: true, order: 0 },
    { id: priceId, name: 'price', label: 'Price ($)', type: 'number', required: true, order: 1 },
    { id: quantityId, name: 'quantity', label: 'Quantity in Stock', type: 'number', required: true, order: 2 },
    { id: discountId, name: 'discountPercent', label: 'Discount (%)', type: 'number', required: false, order: 3 },
  ],
  {
    validation: {
      [nameId]: [req()],
      [priceId]: [req(), { id: generateId(), type: 'min', value: 0.01, message: 'Price must be greater than 0' }, { id: generateId(), type: 'max', value: 999999 }],
      [quantityId]: [req(), { id: generateId(), type: 'min', value: 0 }, { id: generateId(), type: 'max', value: 10000 }],
      [discountId]: [{ id: generateId(), type: 'min', value: 0 }, { id: generateId(), type: 'max', value: 100, message: 'Discount cannot exceed 100%' }],
    },
  },
);
