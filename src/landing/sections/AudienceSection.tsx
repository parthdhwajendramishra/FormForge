import { Card, CardContent, Grid, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { AUDIENCE } from '../landingData';

export const AudienceSection = () => (
  <LandingSection id="audience" title="Built for the whole product team.">
    <Grid container spacing={2}>
      {AUDIENCE.map((item) => (
        <Grid key={item.role} size={{ xs: 12, sm: 6 }}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {item.role}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </LandingSection>
);
