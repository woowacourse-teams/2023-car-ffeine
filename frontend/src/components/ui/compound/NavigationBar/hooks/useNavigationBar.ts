import type { ReactElement } from 'react';

import { useExternalState } from '@utils/external-state';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

export const useNavigationBar = () => {
  const [navigationBarPanel, setNavigationBarPanel] = useExternalState(navigationBarPanelStore);

  const openBasePanel = (basePanel: ReactElement) => {
    setNavigationBarPanel((prev) => ({
      ...prev,
      basePanel,
    }));
  };

  const openLastPanel = (lastPanel: ReactElement) => {
    setNavigationBarPanel((prev) => ({
      ...prev,
      lastPanel,
    }));
  };

  const closeBasePanel = () => {
    setNavigationBarPanel((prev) => ({
      ...prev,
      basePanel: null,
    }));
  };

  const closeLastPanel = () => {
    setNavigationBarPanel((prev) => ({
      ...prev,
      lastPanel: null,
    }));
  };

  const handleClosePanel = () => {
    if (navigationBarPanel.lastPanel !== null) {
      closeLastPanel();
      return;
    }
    closeBasePanel();
  };

  return {
    openBasePanel,
    openLastPanel,
    closeBasePanel,
    closeLastPanel,
    handleClosePanel,
  };
};
