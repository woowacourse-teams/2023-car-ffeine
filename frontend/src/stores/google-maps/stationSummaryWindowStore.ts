import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

import { store } from '@utils/external-state';
import type StateManager from '@utils/external-state/StateManager';

interface StationSummaryWindowStore {
  stationSummaryRoot: Root;
  infoWindowInstance: google.maps.InfoWindow;
}

export const getStationSummaryWindowStore = (() => {
  let stationSummaryWindowStore: StateManager<StationSummaryWindowStore>;

  return () => {
    if (!stationSummaryWindowStore) {
      const container = document.createElement('div');
      const stationSummaryRoot = createRoot(container);
      const infoWindowInstance = new google.maps.InfoWindow({
        content: container,
      });

      const initialStationSummaryWindow = {
        stationSummaryRoot,
        infoWindowInstance,
      };

      stationSummaryWindowStore = store<StationSummaryWindowStore>(initialStationSummaryWindow);
    }

    return stationSummaryWindowStore;
  };
})();
