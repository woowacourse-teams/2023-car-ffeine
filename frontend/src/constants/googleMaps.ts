import type { ZoomBreakpoints } from '@stores/google-maps/zoomStore/types';

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const MIN_ZOOM_LEVEL = 8;
export const MAX_ZOOM_LEVEL = 20;
export const INITIAL_ZOOM_LEVEL = 16;

export const ZOOM_BREAKPOINTS: ZoomBreakpoints = {
  low: MIN_ZOOM_LEVEL,
  middle: 12,
  high: INITIAL_ZOOM_LEVEL, // 기존 코드와 호환을 위해 일단 이렇게 처리했습니다.
  max: 17,
};

export const DELTA_MULTIPLE = 2;
