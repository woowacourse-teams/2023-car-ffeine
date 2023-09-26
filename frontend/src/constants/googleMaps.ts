export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const MIN_ZOOM_SIZE = 8;
export const MAX_ZOOM_SIZE = 20;
export const INITIAL_ZOOM_SIZE = 16;

export const ZOOM_BREAK_POINTS = {
  country: MIN_ZOOM_SIZE,
  city: 12,
  town: INITIAL_ZOOM_SIZE, // 기존 코드와 호환을 위해 일단 이렇게 처리했습니다.
};

export const ZOOM_STATE = {
  country: 'country',
  city: 'city',
  town: 'town',
} as const;

export const DELTA_FACTOR = 2;
