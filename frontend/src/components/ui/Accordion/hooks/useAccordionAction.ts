import { useContext } from 'react';

import type { BasePanelType } from '..';
import { AccordionContext } from '..';

export const useAccordionAction = () => {
  const {
    basePanelType,
    isBasePanelOpen,
    isLastPanelOpen,
    setIsBasePanelOpen,
    setIsLastPanelOpen,
    setBasePanelType,
  } = useContext(AccordionContext);

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
