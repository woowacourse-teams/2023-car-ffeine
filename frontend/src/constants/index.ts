export const DEFAULT_TOKEN = -1;

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const INITIAL_ZOOM_SIZE = 15;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

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
