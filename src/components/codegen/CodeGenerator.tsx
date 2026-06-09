import { Box, Divider, Typography } from '@mui/material';
import { useGeneratedCode } from '../../hooks/useGeneratedCode';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useUiStore } from '../../store/uiStore';
import { EmptyState } from '../common/EmptyState';
import { CodeActions } from './CodeActions';
import { CodePreview } from './CodePreview';
import { RendererSelector } from './RendererSelector';

export const CodeGenerator = () => {
  const activeForm = useActiveForm();
  const rendererType = useUiStore((s) => s.rendererType);
  const generated = useGeneratedCode(activeForm, rendererType);

  if (!activeForm) {
    return (
      <EmptyState
        title="No form selected"
        description="Select or create a form to see generated code."
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Code Generator
        </Typography>
        <RendererSelector />
      </Box>

      <Divider />

      <Box sx={{ px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Generated Component
        </Typography>
        <CodeActions code={generated.component} fileName={generated.fileName} />
      </Box>

      <Divider />

      <Box sx={{ flex: 1, minHeight: 0, p: 1.5 }}>
        {activeForm.fields.length === 0 ? (
          <EmptyState
            title="No fields to generate"
            description="Add fields in the Design tab to generate component code."
          />
        ) : (
          <CodePreview code={generated.component} />
        )}
      </Box>
    </Box>
  );
};
