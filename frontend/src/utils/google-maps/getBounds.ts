import type { DisplayPosition } from '@type';

export const getBounds = (displayPosition: DisplayPosition) => {
  return {
    northEast: {
      latitude: displayPosition.latitude + displayPosition.latitudeDelta,
      longitude: displayPosition.longitude + displayPosition.longitudeDelta,
    },
    southWest: {
      latitude: displayPosition.latitude - displayPosition.latitudeDelta,
      longitude: displayPosition.longitude - displayPosition.longitudeDelta,
    },
  };
};
