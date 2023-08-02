import { useContext } from 'react';

import { useExternalState } from '@utils/external-state';

import { forceOpenAccordionPanelStore } from '@stores/forceOpenAccordionPanelStore';

import type { BasePanelType } from '..';
import { AccordionContext } from '..';

export const useAccordionAction = () => {
  const [forceOpenAccordionPanel, setForceOpenAccordionPanel] = useExternalState(
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

  if (forceOpenAccordionPanel) {
    setBasePanelType('stationList');
    setIsBasePanelOpen(true);
    setIsLastPanelOpen(true);

    setForceOpenAccordionPanel(false);
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
