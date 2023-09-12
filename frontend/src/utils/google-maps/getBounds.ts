import type { DisplayPosition } from '@type';
import type { Bounds } from '@type/map';

export const getBounds = (displayPosition: DisplayPosition): Bounds => {
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
