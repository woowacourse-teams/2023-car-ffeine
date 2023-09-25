import { useExternalValue } from '@utils/external-state';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import NavigationBar from './NavigationBar';

const Navigator = () => {
  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);
  const canDisplayCloseButton = basePanel !== null || lastPanel !== null;

  return (
    <NavigationBar>
      <NavigationBar.Menu />
      <NavigationBar.BasePanel component={basePanel} />
      <NavigationBar.LastPanel component={lastPanel} />
      <NavigationBar.CloseButton canDisplay={canDisplayCloseButton} />
    </NavigationBar>
  );
};

export default Navigator;
