import type { DeltaAreaBreakpoints } from '@stores/google-maps/deltaAreaStore/types';

export const MIN_ZOOM_LEVEL = 8;
export const MAX_ZOOM_LEVEL = 20;
export const INITIAL_ZOOM_LEVEL = 16;

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const DELTA_AREA_BREAKPOINTS: DeltaAreaBreakpoints = {
  small: 0.0000085,
  medium: 0.000145,
  large: 0.137,
};

export const DELTA_MULTIPLE = 2;
