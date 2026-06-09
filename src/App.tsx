import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';
import { ForgeApp } from './pages/ForgeApp';
import { ThemeModeProvider } from './theme/ThemeModeProvider';

function App() {
  return (
    <ThemeModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ForgeApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
