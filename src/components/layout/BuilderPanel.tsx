import { Box, Tab, Tabs, Typography } from '@mui/material';
import { FormBuilder } from '../builder/FormBuilder';
import { FormPreview } from '../preview/FormPreview';
import { RuleBuilder } from '../rules/RuleBuilder';
import { useUiStore } from '../../store/uiStore';

export const BuilderPanel = () => {
  const builderTab = useUiStore((s) => s.builderTab);
  const setBuilderTab = useUiStore((s) => s.setBuilderTab);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ pt: 1, display: 'block' }}>
          Workspace
        </Typography>
        <Tabs
          value={builderTab}
          onChange={(_, val) => setBuilderTab(val)}
          sx={{ minHeight: 42 }}
        >
          <Tab label="Design" value="design" sx={{ minHeight: 42 }} />
          <Tab label="Preview" value="preview" sx={{ minHeight: 42 }} />
        </Tabs>
      </Box>

      {builderTab === 'design' ? (
        <>
          <Box
            sx={{
              flex: 3,
              minHeight: 200,
              overflow: 'hidden',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <FormBuilder />
          </Box>
          <Box sx={{ flex: 2, minHeight: 160, overflow: 'hidden' }}>
            <RuleBuilder />
          </Box>
        </>
      ) : (
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <FormPreview />
        </Box>
      )}
    </Box>
  );
};
