export const DEVELOP_SERVER_URL = 'https://dain.carffe.in/api';
export const PRODUCTION_SERVER_URL = 'https://api.carffe.in/api';

const isProductionServer = window.location.href.search(/https:\/\/carffe.in/) !== -1;

export const SERVER_URL = isProductionServer ? PRODUCTION_SERVER_URL : DEVELOP_SERVER_URL;
