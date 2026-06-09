import { create } from 'zustand';
import type { RendererType, ValidationLibrary } from '../services/renderers/types';

export type RuleBuilderTab = 'visibility' | 'validation' | 'dependency' | 'repeat';
export type BuilderTab = 'design' | 'preview';

interface UiStoreState {
  selectedFieldId: string | null;
  ruleBuilderTab: RuleBuilderTab;
  builderTab: BuilderTab;
  rendererType: RendererType;
  validationLibrary: ValidationLibrary;
  importDialogOpen: boolean;
  codePanelOpen: boolean;
}

interface UiStoreActions {
  setSelectedFieldId: (id: string | null) => void;
  setRuleBuilderTab: (tab: RuleBuilderTab) => void;
  setBuilderTab: (tab: BuilderTab) => void;
  setRendererType: (type: RendererType) => void;
  setValidationLibrary: (library: ValidationLibrary) => void;
  setImportDialogOpen: (open: boolean) => void;
  setCodePanelOpen: (open: boolean) => void;
}

export type UiStore = UiStoreState & UiStoreActions;

export const useUiStore = create<UiStore>((set) => ({
  selectedFieldId: null,
  ruleBuilderTab: 'visibility',
  builderTab: 'design',
  rendererType: 'mui',
  validationLibrary: 'yup',
  importDialogOpen: false,
  codePanelOpen: true,

  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
  setRuleBuilderTab: (tab) => set({ ruleBuilderTab: tab }),
  setBuilderTab: (tab) => set({ builderTab: tab }),
  setRendererType: (type) => set({ rendererType: type }),
  setValidationLibrary: (library) => set({ validationLibrary: library }),
  setImportDialogOpen: (open) => set({ importDialogOpen: open }),
  setCodePanelOpen: (open) => set({ codePanelOpen: open }),
}));
