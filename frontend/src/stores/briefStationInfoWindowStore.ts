import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

import { store } from '@utils/external-state';
import type StateManager from '@utils/external-state/StateManager';

interface BriefStationInfoWindowStore {
  briefStationInfoRoot: Root;
  infoWindowInstance: google.maps.InfoWindow;
}

export const getBriefStationInfoWindowStore = (() => {
  let briefStationInfoWindowStore: StateManager<BriefStationInfoWindowStore>;

  return () => {
    if (!briefStationInfoWindowStore) {
      const container = document.createElement('div');
      const briefStationInfoRoot = createRoot(container);
      const infoWindowInstance = new google.maps.InfoWindow({
        content: container,
      });

      const initialBriefStationInfoWindow = {
        briefStationInfoRoot,
        infoWindowInstance,
      };

      briefStationInfoWindowStore = store<BriefStationInfoWindowStore>(
        initialBriefStationInfoWindow
      );
    }

    return briefStationInfoWindowStore;
  };
})();
