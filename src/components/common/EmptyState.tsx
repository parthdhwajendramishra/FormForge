import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      textAlign: 'center',
      color: 'text.secondary',
      minHeight: 120,
    }}
  >
    <Typography variant="subtitle1" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" sx={{ mb: 2 }}>
        {description}
      </Typography>
    )}
    {action}
  </Box>
);
