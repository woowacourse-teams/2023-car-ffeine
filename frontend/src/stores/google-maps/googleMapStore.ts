import { store } from '@utils/external-state';
import { getLocalStorage } from '@utils/storage';

import {
  DEFAULT_CENTER,
  INITIAL_ZOOM_SIZE,
  MAX_ZOOM_SIZE,
  MIN_ZOOM_SIZE,
} from '@constants/googleMaps';
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
        clickableIcons: false,
        mapId: '92cb7201b7d43b21',
        minZoom: MIN_ZOOM_SIZE,
        maxZoom: MAX_ZOOM_SIZE,
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
  moveToCurrentPosition: () => {
    const googleMap = getGoogleMapStore().getState();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        googleMap.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
        googleMap.setZoom(INITIAL_ZOOM_SIZE);
      },
      () => {
        alert('위치 권한을 허용해주세요.');
      },
      {
        enableHighAccuracy: true,
      }
    );
  },
  moveTo: (latLng: google.maps.LatLngLiteral) => {
    const googleMap = getGoogleMapStore().getState();

    googleMap.panTo(latLng);
    googleMap.setZoom(INITIAL_ZOOM_SIZE);
  },
};
