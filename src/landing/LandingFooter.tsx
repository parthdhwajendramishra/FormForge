import { Box, Container, Typography } from '@mui/material';

export const LandingFooter = () => (
  <Box
    component="footer"
    sx={{
      py: 4,
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="body2" color="text.secondary">
        FormForge — Form specification and code generation. Runs locally in your browser.
      </Typography>
    </Container>
  </Box>
);
