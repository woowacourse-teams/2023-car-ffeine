export const DEFAULT_TOKEN = -1;

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const INITIAL_ZOOM_SIZE = 15;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

const ERROR_PREFIX = '[error]';
export const ERROR_MESSAGES = {
  NO_STATION_FOUND: `${ERROR_PREFIX} 해당 충전소가 존재하지 않습니다.`,
  STATION_DETAILS_FETCH_ERROR: `${ERROR_PREFIX} 충전소 세부 정보를 불러올 수 없습니다.`,
  NO_SEARCH_RESULT: `${ERROR_PREFIX} 검색 결과가 없습니다.`,
} as const;

// 키
export const LOCAL_STORAGE_KEY_LAST_POSITION = 'CARFFEINE_LAST_POSITION';
export const LOCAL_KEY_GOOGLE_MAPS_API = 'CARFFEINE_GOOGLE_MAPS_API';
export const LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN = 'CARFFEINE_GOOGLE_MAPS_API_LAST_LOGIN';
export const LOCAL_KEY_TOKEN = 'CARFFEINE_TOKEN';
export const SESSION_KEY_REPORTED_STATIONS = 'CARFFEINE_REPORTED_STATIONS';

// 날짜
export const KOREAN_DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const ENGLISH_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export const ENGLISH_DAYS_TO_KOREAN_DAYS = Object.fromEntries(
  ENGLISH_DAYS.map((day, index) => [day, KOREAN_DAYS[index]])
);

// API 검색
export const SEARCH_SCOPE =
  '&scope=stationName&scope=address&scope=speed&scope=latitude&scope=longitude';

export const MAX_SEARCH_RESULTS = 10;

export const SERVERS = {
  localhost: 'http://localhost:8080/api',
  dain: 'https://dain.carffe.in/api',
  production: 'https://api.carffe.in/api',
} as const;
