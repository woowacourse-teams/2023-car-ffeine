export const DEFAULT_TOKEN = -1;

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const INITIAL_ZOOM_SIZE = 15;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

export const SERVERS = {
  localhost: 'http://localhost:8080/api',
  dain: 'https://dain.carffe.in/api',
  production: 'https://api.carffe.in/api',
} as const;
