import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { PAIN_POINTS } from '../landingData';

export const ProblemSection = () => (
  <LandingSection id="problem" title="Forms are more than UI.">
    <Grid container spacing={2}>
      {PAIN_POINTS.map((point) => (
        <Grid key={point} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.2s, border-color 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'text.secondary',
                  mb: 2,
                  opacity: 0.4,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {point}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </LandingSection>
);
