import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface FormForgeLogoProps {
  height?: number;
}

export const FormForgeLogo = ({ height = 36 }: FormForgeLogoProps) => (
  <Link
    component={RouterLink}
    to="/"
    aria-label="FormForge home"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 0,
      textDecoration: 'none',
      transition: 'opacity 0.2s',
      '&:hover': { opacity: 0.85 },
    }}
  >
    <Box
      component="img"
      src="/FormForgeLogo.png"
      alt="FormForge"
      sx={{ height, width: 'auto', maxWidth: '100%', display: 'block' }}
    />
  </Link>
);
