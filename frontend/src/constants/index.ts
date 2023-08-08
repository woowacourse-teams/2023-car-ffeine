export const DEFAULT_TOKEN = -1;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'];

export const SERVERS = {
  localhost: 'http://localhost:8080/api',
  dain: 'https://dain.carffe.in/api',
  production: 'https://api.carffe.in/api',
} as const;

export const FORM_ADDRESS_LENGTH_LIMIT = 150;
export const FORM_DETAIL_LOCATION_LENGTH_LIMIT = 200;
export const FORM_OPERATING_TIME_LENGTH_LIMIT = 50;
export const FORM_CONTACT_LENGTH_LIMIT = 20;
export const FORM_PRIVATE_REASON_LENGTH_LIMIT = 100;
