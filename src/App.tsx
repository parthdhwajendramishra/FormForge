import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppLayout } from './components/layout/AppLayout';
import { useFormPersistence } from './hooks/useFormPersistence';
import { muiTheme } from './theme/muiTheme';

function App() {
  useFormPersistence();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
