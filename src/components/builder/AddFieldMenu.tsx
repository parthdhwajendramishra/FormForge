import AddIcon from '@mui/icons-material/Add';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { FIELD_TYPES } from '../../constants/fieldTypes';
import { useFormStore } from '../../store/formStore';
import { useUiStore } from '../../store/uiStore';

export const AddFieldMenu = () => {
  const addField = useFormStore((s) => s.addField);
  const setSelectedFieldId = useUiStore((s) => s.setSelectedFieldId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAdd = (type: (typeof FIELD_TYPES)[number]['type']) => {
    addField({ type });
    setAnchorEl(null);
    const form = useFormStore.getState();
    const activeForm = form.forms.find((f) => f.id === form.activeFormId);
    if (activeForm) {
      const lastField = activeForm.fields[activeForm.fields.length - 1];
      if (lastField) setSelectedFieldId(lastField.id);
    }
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Add Field
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {FIELD_TYPES.map((ft) => (
          <MenuItem key={ft.type} onClick={() => handleAdd(ft.type)}>
            {ft.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
