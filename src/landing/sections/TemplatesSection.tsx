import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FEATURED_TEMPLATES } from '../../templates';
import { LandingSection } from '../LandingSection';

export const TemplatesSection = () => {
  const navigate = useNavigate();

  return (
    <LandingSection
      id="templates"
      title="Start from real-world examples."
      subtitle="Each template demonstrates specific patterns — conditional logic, validation dependencies, repeatable sections."
      bgcolor="background.paper"
    >
      <Grid container spacing={2}>
        {FEATURED_TEMPLATES.map((template) => (
          <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, border-color 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => navigate(`/app?template=${template.id}`)}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                  {template.marketingDescription ?? template.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {template.features.slice(0, 3).map((feature) => (
                    <Chip key={feature} label={feature} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                  ))}
                </Box>
                <Chip label="View template" size="small" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/app')}>
          Browse all templates
        </Button>
      </Box>
    </LandingSection>
  );
};
