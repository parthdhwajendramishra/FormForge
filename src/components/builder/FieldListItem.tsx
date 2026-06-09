import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import type { FormField } from '../../types';

interface FieldListItemProps {
  field: FormField;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const FieldListItem = ({
  field,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: FieldListItemProps) => (
  <ListItem
    disablePadding
    sx={{ minHeight: 56 }}
    secondaryAction={
      <Stack direction="row" spacing={0}>
        <Tooltip title="Move up">
          <span>
            <IconButton size="small" onClick={onMoveUp} disabled={isFirst}>
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Move down">
          <span>
            <IconButton size="small" onClick={onMoveDown} disabled={isLast}>
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete field">
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    }
  >
    <ListItemButton selected={isSelected} onClick={onSelect} sx={{ py: 1.5, pr: 14 }}>
      <ListItemText
        primary={field.label}
        secondary={`${field.name} · ${field.type}${field.required ? ' · required' : ''}`}
        slotProps={{
          primary: { sx: { fontWeight: isSelected ? 600 : 400 } },
          secondary: { sx: { whiteSpace: 'normal' } },
        }}
      />
      {field.sectionId && (
        <Chip label="section" size="small" variant="outlined" sx={{ mr: 8 }} />
      )}
    </ListItemButton>
  </ListItem>
);
