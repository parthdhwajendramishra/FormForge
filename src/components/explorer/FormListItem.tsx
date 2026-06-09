import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import type { FormDefinition } from '../../types';

interface FormListItemProps {
  form: FormDefinition;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const FormListItem = ({ form, isActive, onSelect, onDelete }: FormListItemProps) => (
  <ListItem
    disablePadding
    secondaryAction={
      <Tooltip title="Delete form">
        <IconButton edge="end" size="small" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    }
  >
    <ListItemButton selected={isActive} onClick={onSelect}>
      <ListItemText
        primary={form.name}
        secondary={`${form.fields.length} fields`}
        slotProps={{ primary: { noWrap: true } }}
      />
    </ListItemButton>
  </ListItem>
);
