import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HERO_PIPELINE } from '../landingData';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 14 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ animation: 'fadeUp 0.6s ease-out' }}>
            <Chip
              label="Form specification · Code generation · Local-first"
              size="small"
              sx={{
                mb: 3,
                bgcolor: 'action.hover',
                color: 'text.secondary',
                fontSize: '0.75rem',
                height: 28,
              }}
            />
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' }, mb: 2.5 }}
            >
              Design forms before writing code.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.75, mb: 4, maxWidth: 520 }}
            >
              Define fields, validations, dependencies and business rules visually.
              Generate production-ready React forms when you&apos;re ready.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/app')}
                sx={{ px: 3 }}
              >
                Start Building
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{ px: 3 }}
              >
                View Templates
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
              No sign-up · No backend · Data stays on your machine
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              animation: 'fadeUp 0.6s ease-out 0.15s both',
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mb: 2, letterSpacing: '0.1em' }}
            >
              How it works
            </Typography>
            <Stack spacing={0}>
              {HERO_PIPELINE.map((step, index) => (
                <Box key={step.label}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'action.hover',
                      transition: 'border-color 0.2s',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {step.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      {step.detail}
                    </Typography>
                  </Box>
                  {index < HERO_PIPELINE.length - 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.75 }}>
                      <ArrowDownwardIcon sx={{ fontSize: 18, color: 'text.secondary', opacity: 0.5 }} />
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
