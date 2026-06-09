import { Box, Grid, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { FEATURES } from '../landingData';

export const FeaturesSection = () => (
  <LandingSection id="features" title="Everything you need to specify a form.">
    <Grid container spacing={2}>
      {FEATURES.map((feature) => (
        <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {feature.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </LandingSection>
);
