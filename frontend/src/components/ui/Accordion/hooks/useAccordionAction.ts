import { useContext } from 'react';

import type { basePanelType } from '..';
import { AccordionContext } from '..';

export const useAccordionAction = () => {
  const {
    isBasePanelOpen,
    isLastPanelOpen,
    setIsBasePanelOpen,
    setIsLastPanelOpen,
    setBasePanelType,
  } = useContext(AccordionContext);

  const handleOpenBasePanel = (basePanelType: basePanelType) => {
    setBasePanelType(basePanelType);
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
    setIsBasePanelOpen(false);
    setIsLastPanelOpen(false);
  };

  return {
    handleOpenBasePanel,
    handleOpenLastPanel,
    handleCloseBasePanel,
    handleCloseLastPanel,
    handleCloseAllPanel,
  };
};
