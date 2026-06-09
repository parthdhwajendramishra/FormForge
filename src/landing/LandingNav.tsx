import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormForgeLogo } from '../components/common/FormForgeLogo';
import { useThemeMode } from '../theme/ThemeModeProvider';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Templates', href: '#templates' },
  { label: 'Features', href: '#features' },
];

export const LandingNav = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
          <Box sx={{ mr: 2 }}>
            <FormForgeLogo height={36} />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' }, flex: 1 }}
          >
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                component="a"
                href={link.href}
                color="inherit"
                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ flex: 1, display: { xs: 'flex', md: 'none' } }} />

          <IconButton onClick={toggleMode} size="small" aria-label="Toggle theme">
            {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/app')}
            sx={{ ml: 1 }}
          >
            Start Building
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
