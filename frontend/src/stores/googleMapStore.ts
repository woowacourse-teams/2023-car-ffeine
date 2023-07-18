import { store } from '@utils/external-state';

import { INITIAL_CENTER, INITIAL_ZOOM_SIZE } from '@constants';

export const getGoogleMapStore = (() => {
  let googleMap: google.maps.Map;

  const mapDiv = document.createElement('div');

  mapDiv.id = 'map';
  mapDiv.style.minHeight = '100vh';

  document.body.appendChild(mapDiv);

  return () => {
    if (!googleMap) {
      googleMap = new window.google.maps.Map(mapDiv, {
        center: INITIAL_CENTER,
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
