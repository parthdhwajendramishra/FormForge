import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import { useState } from 'react';
import { downloadFile } from '../../utils/downloadFile';

interface CodeActionsProps {
  code: string;
  fileName: string;
}

export const CodeActions = ({ code, fileName }: CodeActionsProps) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setSnackbar({ open: true, message: 'Copied to clipboard', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to copy', severity: 'error' });
    }
  };

  const handleDownload = () => {
    downloadFile(code, fileName, 'text/typescript');
    setSnackbar({ open: true, message: `Downloaded ${fileName}`, severity: 'success' });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
        >
          Copy
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
