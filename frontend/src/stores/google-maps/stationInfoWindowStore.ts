import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import { store } from '@utils/external-state';
import type StateManager from '@utils/external-state/StateManager';

interface StationInfoWindowStore {
  stationInfoWindowRoot: Root;
  infoWindowInstance: google.maps.InfoWindow;
}

export const getStationInfoWindowStore = (() => {
  let stationInfoWindowStore: StateManager<StationInfoWindowStore>;

  return () => {
    if (!stationInfoWindowStore) {
      const container = document.createElement('div');
      const stationInfoWindowRoot = createRoot(container);
      const infoWindowInstance = new google.maps.InfoWindow({
        content: container,
        maxWidth: 320,
        minWidth: 300,
      });

      const initialStationInfoWindow: StationInfoWindowStore = {
        stationInfoWindowRoot,
        infoWindowInstance,
      };

      stationInfoWindowStore = store<StationInfoWindowStore>(initialStationInfoWindow);
    }

    return stationInfoWindowStore;
  };
})();
