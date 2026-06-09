import { Box, Chip, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TEMPLATES, TEMPLATE_CATEGORY_LABELS, TEMPLATE_CATEGORY_ORDER } from '../../templates';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => (
  <Box>
    {TEMPLATE_CATEGORY_ORDER.map((category) => {
      const items = TEMPLATES.filter((t) => t.category === category);
      if (items.length === 0) return null;

      return (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: 'block', mb: 0.5 }}>
            {TEMPLATE_CATEGORY_LABELS[category]}
          </Typography>
          <List dense disablePadding>
            {items.map((template) => (
              <ListItemButton key={template.id} onClick={() => onSelectTemplate(template.id)}>
                <ListItemText
                  primary={template.name}
                  secondary={template.description}
                  slotProps={{ secondary: { noWrap: true } }}
                />
                {template.featured && (
                  <Chip label="Featured" size="small" color="primary" variant="outlined" sx={{ ml: 1, fontSize: '0.65rem' }} />
                )}
              </ListItemButton>
            ))}
          </List>
        </Box>
      );
    })}
  </Box>
);
