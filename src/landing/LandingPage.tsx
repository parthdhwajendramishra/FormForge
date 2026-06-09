import { Box, GlobalStyles } from '@mui/material';
import { LandingFooter } from './LandingFooter';
import { LandingNav } from './LandingNav';
import { AudienceSection } from './sections/AudienceSection';
import { CtaSection } from './sections/CtaSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { ProblemSection } from './sections/ProblemSection';
import { SolutionSection } from './sections/SolutionSection';
import { TemplatesSection } from './sections/TemplatesSection';
import { TrustSection } from './sections/TrustSection';

export const LandingPage = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <GlobalStyles
      styles={{
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        html: { scrollBehavior: 'smooth' },
      }}
    />
    <LandingNav />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <AudienceSection />
    <TemplatesSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TrustSection />
    <CtaSection />
    <LandingFooter />
  </Box>
);
