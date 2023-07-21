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
