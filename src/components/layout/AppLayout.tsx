import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BuilderPanel } from './BuilderPanel';
import { CodePanel } from './CodePanel';
import { FormExplorerPanel } from './FormExplorerPanel';

export const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <FormExplorerPanel />
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <BuilderPanel />
        </Box>
        <Box sx={{ height: '40vh', minHeight: 200 }}>
          <CodePanel />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <FormExplorerPanel />
      <BuilderPanel />
      <CodePanel />
    </Box>
  );
};
