export const getDisplayPosition = (map: google.maps.Map) => {
  const center = map.getCenter();
  const bounds = map.getBounds();

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
  };
};
