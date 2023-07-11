import type { DisplayPosition } from '../../types';

export const getDisplayPosition = (map: google.maps.Map) => {
  const center = map.getCenter() as google.maps.LatLng;
  const bounds = map.getBounds() as google.maps.LatLngBounds;

  const longitudeDelta = bounds
    ? (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 2
    : 0;
  const latitudeDelta = bounds
    ? (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 2
    : 0;
  const longitude = center.lng();
  const latitude = center.lat();

  return {
    longitude,
    latitude,
    longitudeDelta,
    latitudeDelta,
  } as DisplayPosition;
};
