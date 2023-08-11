export const getDisplayPosition = (map: google.maps.Map) => {
  const center = map.getCenter();
  const bounds = map.getBounds();

  const longitudeDelta = bounds
    ? (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 2
    : 0.15;
  const latitudeDelta = bounds
    ? (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 2
    : 0.15;
  const longitude = center.lng();
  const latitude = center.lat();
  const zoom = map.getZoom();

  return {
    longitude,
    latitude,
    longitudeDelta,
    latitudeDelta,
    zoom,
  };
};
