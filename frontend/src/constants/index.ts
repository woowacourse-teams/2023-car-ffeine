export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const INITIAL_ZOOM_SIZE = 14;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

export const DEVELOP_URL = 'http://localhost:8080/api';
export const PRODUCTION_URL = 'http://1.1.1.1:8080/api';

type ModeType = 'development' | 'production';

const URL: Readonly<Record<ModeType, string>> = {
  development: DEVELOP_URL,
  production: PRODUCTION_URL,
};

const MODE = process.env.NODE_ENV as ModeType;
export const BASE_URL = URL[MODE];

export const ERROR_PREFIX = '[error]';
export const ERROR_MESSAGES = {
  NO_STATION_FOUND: `${ERROR_PREFIX} 해당 충전소가 존재하지 않습니다.`,
  STATION_DETAILS_FETCH_ERROR: `${ERROR_PREFIX} 충전소 세부 정보를 불러올 수 없습니다.`,
} as const;
