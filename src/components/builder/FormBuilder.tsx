import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useFormStore } from '../../store/formStore';
import { useActiveForm, useSortedFields } from '../../hooks/useFormSelectors';
import { useUiStore } from '../../store/uiStore';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { EmptyState } from '../common/EmptyState';
import { AddFieldMenu } from './AddFieldMenu';
import { FieldEditor } from './FieldEditor';
import { FieldList } from './FieldList';

export const FormBuilder = () => {
  const activeForm = useActiveForm();
  const sortedFields = useSortedFields();
  const updateFormMeta = useFormStore((s) => s.updateFormMeta);
  const deleteField = useFormStore((s) => s.deleteField);
  const reorderField = useFormStore((s) => s.reorderField);
  const selectedFieldId = useUiStore((s) => s.selectedFieldId);
  const setSelectedFieldId = useUiStore((s) => s.setSelectedFieldId);

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (!activeForm) {
    return (
      <EmptyState
        title="No form selected"
        description="Create a new form or select one from the sidebar to start building."
      />
    );
  }

  const selectedField = sortedFields.find((f) => f.id === selectedFieldId) ?? null;

  const handleDeleteField = () => {
    if (deleteTarget) {
      deleteField(deleteTarget);
      if (selectedFieldId === deleteTarget) setSelectedFieldId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Typography variant="h6" gutterBottom>
          Form Builder
        </Typography>
        <TextField
          label="Form Name"
          size="small"
          value={activeForm.name}
          onChange={(e) => updateFormMeta({ name: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Description"
          size="small"
          value={activeForm.description ?? ''}
          onChange={(e) => updateFormMeta({ description: e.target.value || undefined })}
          fullWidth
          multiline
          rows={2}
        />
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle2">
          Fields ({sortedFields.length})
        </Typography>
        <AddFieldMenu />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'auto',
          }}
        >
          {sortedFields.length === 0 ? (
            <EmptyState
              title="No fields yet"
              description="Add your first field to start building the form."
            />
          ) : (
            <FieldList
              fields={sortedFields}
              selectedFieldId={selectedFieldId}
              onSelect={setSelectedFieldId}
              onDelete={setDeleteTarget}
              onMoveUp={(id) => reorderField(id, 'up')}
              onMoveDown={(id) => reorderField(id, 'down')}
            />
          )}
        </Box>

        {selectedField && (
          <Box
            sx={{
              width: { xs: 280, sm: 320 },
              minWidth: { xs: 240, sm: 280 },
              flexShrink: 0,
              borderLeft: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
              bgcolor: 'background.paper',
            }}
          >
            <FieldEditor field={selectedField} />
          </Box>
        )}
      </Box>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Field"
        message="Delete this field and all associated rules?"
        confirmLabel="Delete"
        onConfirm={handleDeleteField}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
};
