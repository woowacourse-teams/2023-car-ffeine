import { store } from '@utils/external-state';
import { getLocalStorage } from '@utils/storage';

import { DEFAULT_CENTER, INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { LOCAL_KEY_LAST_POSITION } from '@constants/storageKeys';

export const getGoogleMapStore = (() => {
  let googleMap: google.maps.Map;

  const container = document.createElement('div');

  container.id = 'map';
  container.style.minHeight = '100vh';

  document.body.appendChild(container);

  return () => {
    if (!googleMap) {
      const initialCenter = getLocalStorage<google.maps.LatLngLiteral>(
        LOCAL_KEY_LAST_POSITION,
        DEFAULT_CENTER
      );

      googleMap = new window.google.maps.Map(container, {
        center: initialCenter,
        zoom: INITIAL_ZOOM_SIZE,
        disableDefaultUI: true,
        mapId: '92cb7201b7d43b21',
        minZoom: 8,
        maxZoom: 20,
        gestureHandling: 'greedy',
        restriction: {
          latLngBounds: {
            north: 39,
            south: 33,
            east: 132,
            west: 124,
          },
          strictBounds: true,
        },
      });
    }

    return store<google.maps.Map>(googleMap);
  };
})();

export const googleMapActions = {
  zoomUp: () => {
    const googleMap = getGoogleMapStore().getState();
    const prevZoom = googleMap.getZoom();
    googleMap.setZoom(prevZoom + 1);
  },
  zoomDown: () => {
    const googleMap = getGoogleMapStore().getState();
    const prevZoom = googleMap.getZoom();
    googleMap.setZoom(prevZoom - 1);
  },
};
