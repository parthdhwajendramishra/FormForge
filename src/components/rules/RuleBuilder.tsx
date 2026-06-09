import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useSelectedField } from '../../hooks/useSelectedField';
import { useActiveForm } from '../../hooks/useFormSelectors';
import { useUiStore } from '../../store/uiStore';
import { EmptyState } from '../common/EmptyState';
import { DependencyRulesEditor } from './DependencyRulesEditor';
import { RepeatSectionEditor } from './RepeatSectionEditor';
import { ValidationRulesEditor } from './ValidationRulesEditor';
import { VisibilityRulesEditor } from './VisibilityRulesEditor';

export const RuleBuilder = () => {
  const activeForm = useActiveForm();
  const selectedField = useSelectedField();
  const ruleBuilderTab = useUiStore((s) => s.ruleBuilderTab);
  const setRuleBuilderTab = useUiStore((s) => s.setRuleBuilderTab);

  if (!activeForm) {
    return (
      <EmptyState
        title="No form selected"
        description="Select a form to configure rules."
      />
    );
  }

  const renderTabContent = () => {
    if (ruleBuilderTab === 'repeat') {
      return <RepeatSectionEditor />;
    }

    if (!selectedField) {
      return (
        <EmptyState
          title="No field selected"
          description="Select a field in the Form Builder to configure visibility, validation, or dependency rules."
        />
      );
    }

    switch (ruleBuilderTab) {
      case 'visibility':
        return <VisibilityRulesEditor field={selectedField} />;
      case 'validation':
        return <ValidationRulesEditor field={selectedField} />;
      case 'dependency':
        return <DependencyRulesEditor field={selectedField} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 2, pt: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Rule Builder
          {selectedField && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              — {selectedField.label}
            </Typography>
          )}
        </Typography>
        <Tabs
          value={ruleBuilderTab}
          onChange={(_, val) => setRuleBuilderTab(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Visibility" value="visibility" />
          <Tab label="Validation" value="validation" />
          <Tab label="Dependency" value="dependency" />
          <Tab label="Repeat Sections" value="repeat" />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>{renderTabContent()}</Box>
    </Box>
  );
};
