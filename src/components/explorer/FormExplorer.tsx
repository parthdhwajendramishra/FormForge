import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, Divider, List, Typography } from '@mui/material';
import { useState } from 'react';
import { useFormStore } from '../../store/formStore';
import { useUiStore } from '../../store/uiStore';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { FormForgeLogo } from '../common/FormForgeLogo';
import { ExportJsonButton } from './ExportJsonButton';
import { FormListItem } from './FormListItem';
import { ImportJsonDialog } from './ImportJsonDialog';
import { TemplateGallery } from './TemplateGallery';

export const FormExplorer = () => {
  const forms = useFormStore((s) => s.forms);
  const activeFormId = useFormStore((s) => s.activeFormId);
  const createForm = useFormStore((s) => s.createForm);
  const createFromTemplate = useFormStore((s) => s.createFromTemplate);
  const deleteForm = useFormStore((s) => s.deleteForm);
  const setActiveForm = useFormStore((s) => s.setActiveForm);
  const setImportDialogOpen = useUiStore((s) => s.setImportDialogOpen);
  const setSelectedFieldId = useUiStore((s) => s.setSelectedFieldId);

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSelectForm = (id: string) => {
    setActiveForm(id);
    setSelectedFieldId(null);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteForm(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <FormForgeLogo height={32} />
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => createForm()}
          sx={{ mb: 1 }}
        >
          New Form
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          fullWidth
          onClick={() => setImportDialogOpen(true)}
          sx={{ mb: 1 }}
        >
          Import JSON
        </Button>
        <ExportJsonButton />
        <ExportJsonButton exportAll />
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, pt: 1, display: 'block' }}>
          Your Forms
        </Typography>
        <List dense disablePadding>
          {forms.map((form) => (
            <FormListItem
              key={form.id}
              form={form}
              isActive={form.id === activeFormId}
              onSelect={() => handleSelectForm(form.id)}
              onDelete={() => setDeleteTarget(form.id)}
            />
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: 'block' }}>
          Templates
        </Typography>
        <TemplateGallery onSelectTemplate={createFromTemplate} />
      </Box>

      <ImportJsonDialog />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Form"
        message="Are you sure you want to delete this form? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
};
