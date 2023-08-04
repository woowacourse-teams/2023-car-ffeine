export const DEFAULT_TOKEN = -1;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

export const SERVERS = {
  localhost: 'http://localhost:8080/api',
  dain: 'https://dain.carffe.in/api',
  production: 'https://api.carffe.in/api',
} as const;
