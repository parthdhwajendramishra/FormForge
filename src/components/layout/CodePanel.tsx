import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useUiStore } from '../../store/uiStore';
import { CodeGenerator } from '../codegen/CodeGenerator';

export const CodePanel = () => {
  const codePanelOpen = useUiStore((s) => s.codePanelOpen);
  const setCodePanelOpen = useUiStore((s) => s.setCodePanelOpen);

  if (!codePanelOpen) {
    return (
      <Box
        sx={{
          width: 40,
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 1,
        }}
      >
        <Tooltip title="Show code panel">
          <IconButton size="small" onClick={() => setCodePanelOpen(true)}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 460 },
        minWidth: { md: 360 },
        maxWidth: { md: 520 },
        borderLeft: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 0.5 }}>
        <Tooltip title="Hide code panel">
          <IconButton size="small" onClick={() => setCodePanelOpen(false)}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <CodeGenerator />
      </Box>
    </Box>
  );
};
