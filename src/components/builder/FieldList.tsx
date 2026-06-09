import { List } from '@mui/material';
import type { FormField } from '../../types';
import { FieldListItem } from './FieldListItem';

interface FieldListProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export const FieldList = ({
  fields,
  selectedFieldId,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: FieldListProps) => (
  <List dense disablePadding>
    {fields.map((field, index) => (
      <FieldListItem
        key={field.id}
        field={field}
        isSelected={field.id === selectedFieldId}
        isFirst={index === 0}
        isLast={index === fields.length - 1}
        onSelect={() => onSelect(field.id)}
        onDelete={() => onDelete(field.id)}
        onMoveUp={() => onMoveUp(field.id)}
        onMoveDown={() => onMoveDown(field.id)}
      />
    ))}
  </List>
);
