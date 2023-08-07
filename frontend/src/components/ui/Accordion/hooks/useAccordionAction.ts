import { useContext } from 'react';

import { useExternalState } from '@utils/external-state';

import { forceOpenAccordionPanelStore } from '@stores/layout/forceOpenAccordionPanelStore';

import type { BasePanelType } from '..';
import { AccordionContext } from '..';

export const useAccordionAction = () => {
  const [isForceOpenAccordionPanel, setIsForceOpenAccordionPanel] = useExternalState(
    forceOpenAccordionPanelStore
  );

  const {
    basePanelType,
    isBasePanelOpen,
    isLastPanelOpen,
    setIsBasePanelOpen,
    setIsLastPanelOpen,
    setBasePanelType,
  } = useContext(AccordionContext);

  if (isForceOpenAccordionPanel) {
    setBasePanelType('searchWindow');
    setIsBasePanelOpen(true);
    setIsLastPanelOpen(true);

    setIsForceOpenAccordionPanel(false);
  }

  const toggleOpenBasePanel = (selectedBasePanelType: BasePanelType) => {
    if (basePanelType === selectedBasePanelType) {
      setIsBasePanelOpen(false);
      setBasePanelType(null);
      return;
    }
    setBasePanelType(selectedBasePanelType);
    setIsBasePanelOpen(true);
  };

  const handleOpenLastPanel = () => {
    if (!isBasePanelOpen) {
      return;
    }
    setIsLastPanelOpen(true);
  };

  const handleCloseBasePanel = () => {
    if (isLastPanelOpen) {
      return;
    }
    setIsBasePanelOpen(false);
  };

  const handleCloseLastPanel = () => {
    setIsLastPanelOpen(false);
  };

  const handleCloseAllPanel = () => {
    setBasePanelType(null);
    setIsBasePanelOpen(false);
    setIsLastPanelOpen(false);
  };

  return {
    toggleOpenBasePanel,
    handleOpenLastPanel,
    handleCloseBasePanel,
    handleCloseLastPanel,
    handleCloseAllPanel,
  };
};
