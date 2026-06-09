import { Box, Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface LandingSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  bgcolor?: string;
}

export const LandingSection = ({
  id,
  title,
  subtitle,
  children,
  bgcolor = 'background.default',
}: LandingSectionProps) => (
  <Box
    id={id}
    component="section"
    sx={{
      py: { xs: 8, md: 12 },
      bgcolor,
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Container maxWidth="lg">
      {(title || subtitle) && (
        <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 720 }}>
          {title && (
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: subtitle ? 1.5 : 0 }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Container>
  </Box>
);
