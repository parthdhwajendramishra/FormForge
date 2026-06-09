import { Box, Grid, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { STEPS } from '../landingData';

export const HowItWorksSection = () => (
  <LandingSection
    id="how-it-works"
    title="How it works"
    bgcolor="background.paper"
  >
    <Grid container spacing={3}>
      {STEPS.map((item, index) => (
        <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            {index < STEPS.length - 1 && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  top: 20,
                  right: -12,
                  width: 24,
                  height: 1,
                  bgcolor: 'divider',
                }}
              />
            )}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              {item.step}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {item.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </LandingSection>
);
