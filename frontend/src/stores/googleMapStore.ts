import { store } from '@utils/external-state';
import { getLocalStorage } from '@utils/storage';

import { DEFAULT_CENTER, INITIAL_ZOOM_SIZE, LOCAL_STORAGE_KEY_LAST_POSITION } from '@constants';

export const getGoogleMapStore = (() => {
  let googleMap: google.maps.Map;

  const container = document.createElement('div');

  container.id = 'map';
  container.style.minHeight = '100vh';

  document.body.appendChild(container);

  return () => {
    if (!googleMap) {
      const initialCenter = getLocalStorage<google.maps.LatLngLiteral>(
        LOCAL_STORAGE_KEY_LAST_POSITION,
        DEFAULT_CENTER
      );

      googleMap = new window.google.maps.Map(container, {
        center: initialCenter,
        zoom: INITIAL_ZOOM_SIZE,
        disableDefaultUI: true,
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
