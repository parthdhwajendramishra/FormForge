import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { SOLUTION_ITEMS } from '../landingData';

const WORKFLOW = [
  { label: 'Product Team', sub: 'PMs, designers, QA, developers' },
  { label: 'Form Specification', sub: 'Fields, rules, dependencies as JSON' },
  { label: 'Generated React Code', sub: 'Formik + Yup / Zod + MUI or JSX' },
];

export const SolutionSection = () => (
  <LandingSection
    id="solution"
    title="One place for form behavior."
    subtitle="Define the full specification before a single component is written. Everyone works from the same source of truth."
    bgcolor="background.paper"
  >
    <Grid container spacing={6} sx={{ alignItems: 'center' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={1.5}>
          {SOLUTION_ITEMS.map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, lineHeight: 1.7 }}>
          Capture what the form should do — not just how it looks. Hand off a complete
          specification instead of scattered requirements.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          {WORKFLOW.map((step, index) => (
            <Box key={step.label}>
              <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.sub}
                </Typography>
              </Box>
              {index < WORKFLOW.length - 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                  <ArrowDownwardIcon sx={{ fontSize: 20, color: 'text.secondary', opacity: 0.4 }} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  </LandingSection>
);
