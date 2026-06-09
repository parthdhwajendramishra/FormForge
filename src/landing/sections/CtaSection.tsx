import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 2, px: 2 }}
      >
        Stop rewriting form logic.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, fontSize: '1.05rem', px: 2 }}
      >
        Design it once. Reuse it everywhere.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
        <Button variant="contained" size="large" onClick={() => navigate('/app')} sx={{ px: 4 }}>
          Start Building
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/app')}
          sx={{ px: 4 }}
        >
          Browse Templates
        </Button>
      </Stack>
    </Box>
  );
};
