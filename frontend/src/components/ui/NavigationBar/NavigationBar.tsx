import { useExternalValue } from '@utils/external-state';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import NavigationBar from '@ui/compound/NavigationBar';

const Navigator = () => {
  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);

  return (
    <NavigationBar>
      <NavigationBar.Menu />
      <NavigationBar.BasePanel component={basePanel} />
      <NavigationBar.LastPanel component={lastPanel} />
      <NavigationBar.CloseButton />
    </NavigationBar>
  );
};

export default Navigator;
