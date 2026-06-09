import { Box, Chip, Grid, Typography } from '@mui/material';
import { LandingSection } from '../LandingSection';
import { TRUST_ITEMS } from '../landingData';

export const TrustSection = () => (
  <LandingSection id="trust" title="Built for developers.">
    <Grid container spacing={1.5}>
      {TRUST_ITEMS.map((item) => (
        <Grid key={item} size="auto">
          <Chip
            label={item}
            sx={{
              px: 1,
              height: 36,
              fontSize: '0.875rem',
              fontFamily: item.match(/^[A-Z]/) && item !== 'JSON Export' && item !== 'Local-first'
                ? 'monospace'
                : 'inherit',
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </Grid>
      ))}
    </Grid>
    <Box sx={{ mt: 4, p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', maxWidth: 640 }}>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        FormForge runs entirely in your browser. Form definitions are stored in LocalStorage.
        Nothing is sent to a server. No account required.
      </Typography>
    </Box>
  </LandingSection>
);
