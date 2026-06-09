import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { importFormFromFile } from '../../services/importExport/importForm';
import { useFormStore } from '../../store/formStore';
import { useUiStore } from '../../store/uiStore';

export const ImportJsonDialog = () => {
  const open = useUiStore((s) => s.importDialogOpen);
  const setOpen = useUiStore((s) => s.setImportDialogOpen);
  const importForm = useFormStore((s) => s.importForm);
  const fileRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewCount, setPreviewCount] = useState(0);
  const [replaceMode, setReplaceMode] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleClose = () => {
    setOpen(false);
    setErrors([]);
    setPreviewCount(0);
    setPendingFile(null);
  };

  const handleFileSelect = async (file: File) => {
    setPendingFile(file);
    const result = await importFormFromFile(file);
    setErrors(result.errors);
    setPreviewCount(result.forms.length);
  };

  const handleImport = async () => {
    if (!pendingFile) return;
    const result = await importFormFromFile(pendingFile);
    result.forms.forEach((form) => importForm(form, replaceMode));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import Form JSON</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload a FormDefinition JSON file. Supports single form or array of forms.
        </Typography>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          Choose File
        </Button>
        {pendingFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {pendingFile.name} ({previewCount} form{previewCount !== 1 ? 's' : ''} found)
          </Typography>
        )}
        {errors.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {errors.map((err) => (
              <Alert key={err} severity="error" sx={{ mb: 1 }}>
                {err}
              </Alert>
            ))}
          </Box>
        )}
        {previewCount > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Import mode
            </Typography>
            <RadioGroup
              value={replaceMode ? 'replace' : 'add'}
              onChange={(e) => setReplaceMode(e.target.value === 'replace')}
            >
              <FormControlLabel value="add" control={<Radio />} label="Add as new form(s)" />
              <FormControlLabel value="replace" control={<Radio />} label="Replace if ID exists" />
            </RadioGroup>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={previewCount === 0 || errors.length > 0}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};
