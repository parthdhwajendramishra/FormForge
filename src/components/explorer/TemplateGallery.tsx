import { Box, Chip, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TEMPLATES } from '../../templates';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => {
  const basic = TEMPLATES.filter((t) => t.category === 'basic');
  const advanced = TEMPLATES.filter((t) => t.category === 'advanced');

  const renderGroup = (title: string, items: typeof TEMPLATES) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: 'block', mb: 0.5 }}>
        {title}
      </Typography>
      <List dense disablePadding>
        {items.map((template) => (
          <ListItemButton key={template.id} onClick={() => onSelectTemplate(template.id)}>
            <ListItemText
              primary={template.name}
              secondary={template.description}
              slotProps={{ secondary: { noWrap: true } }}
            />
            <Chip
              label={template.category}
              size="small"
              variant="outlined"
              sx={{ ml: 1, fontSize: '0.65rem' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {renderGroup('Basic Templates', basic)}
      {renderGroup('Advanced Templates', advanced)}
    </Box>
  );
};
