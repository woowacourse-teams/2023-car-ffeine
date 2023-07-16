import { store } from '../utils/external-state';

export const googleMapStore = store<google.maps.Map>(null);

export const googleMapActions = {
  zoomUp: () => {
    const googleMap = googleMapStore.getState();
    const prevZoom = googleMap.getZoom();
    googleMap.setZoom(prevZoom + 1);
  },
  zoomDown: () => {
    const googleMap = googleMapStore.getState();
    const prevZoom = googleMap.getZoom();
    googleMap.setZoom(prevZoom - 1);
  },
};
