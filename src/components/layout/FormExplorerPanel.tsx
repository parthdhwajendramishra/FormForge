import { Box } from '@mui/material';
import { FormExplorer } from '../explorer/FormExplorer';

export const FormExplorerPanel = () => (
  <Box
    sx={{
      width: { xs: '100%', md: 260 },
      minWidth: { md: 260 },
      borderRight: { md: '1px solid' },
      borderBottom: { xs: '1px solid', md: 'none' },
      borderColor: 'divider',
      bgcolor: 'background.paper',
      height: { xs: 'auto', md: '100%' },
      maxHeight: { xs: 240, md: 'none' },
      overflow: 'hidden',
    }}
  >
    <FormExplorer />
  </Box>
);
