import { getSessionStorage } from '@utils/storage';

import { SESSION_KEY_LAST_REQUEST_POSITION } from '@constants/storageKeys';

import type { DisplayPosition } from '@type';
import type { Bounds } from '@type/map';

import { getBounds } from './getBounds';

export const isBoundsWithinCachedBounds = (cachedBounds: Bounds, bounds: Bounds) => {
  if (cachedBounds.northEast.latitude < bounds.northEast.latitude) {
    return false;
  }
  if (cachedBounds.northEast.longitude < bounds.northEast.longitude) {
    return false;
  }
  if (cachedBounds.southWest.latitude > bounds.southWest.latitude) {
    return false;
  }
  if (cachedBounds.southWest.longitude > bounds.southWest.longitude) {
    return false;
  }

  return true;
};

export const isCachedRegion = (displayPosition: DisplayPosition) => {
  const cachedDisplayPosition = getSessionStorage<DisplayPosition | null>(
    SESSION_KEY_LAST_REQUEST_POSITION,
    null
  );

  if (cachedDisplayPosition === null) {
    return false;
  }

  const cachedBounds = getBounds(cachedDisplayPosition);
  const bounds = getBounds(displayPosition);

  return isBoundsWithinCachedBounds(cachedBounds, bounds);
};
