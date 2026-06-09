import { createTheme, type PaletteMode } from '@mui/material/styles';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#60a5fa' : '#2563eb',
      },
      secondary: {
        main: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      background: {
        default: mode === 'dark' ? '#0a0a0b' : '#fafafa',
        paper: mode === 'dark' ? '#111113' : '#ffffff',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      text: {
        primary: mode === 'dark' ? '#f4f4f5' : '#18181b',
        secondary: mode === 'dark' ? '#a1a1aa' : '#52525b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
      h3: { fontWeight: 600, letterSpacing: '-0.02em' },
      h4: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: 'none',
          },
        },
      },
    },
  });
