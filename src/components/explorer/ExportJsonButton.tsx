import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { exportAllFormsToJson, exportFormToJson } from '../../services/importExport/exportForm';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useFormStore } from '../../store/formStore';

interface ExportJsonButtonProps {
  exportAll?: boolean;
}

export const ExportJsonButton = ({ exportAll = false }: ExportJsonButtonProps) => {
  const activeForm = useActiveForm();
  const forms = useFormStore((s) => s.forms);

  const handleExport = () => {
    if (exportAll) {
      exportAllFormsToJson(forms);
    } else if (activeForm) {
      exportFormToJson(activeForm);
    }
  };

  const disabled = exportAll ? forms.length === 0 : !activeForm;

  return (
    <Button
      size="small"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
      disabled={disabled}
      fullWidth
      sx={{ justifyContent: 'flex-start' }}
    >
      {exportAll ? 'Export All JSON' : 'Export JSON'}
    </Button>
  );
};
