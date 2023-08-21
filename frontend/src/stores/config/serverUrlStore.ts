import { store } from '@utils/external-state';

import { DEVELOP_SERVER_URL, PRODUCTION_SERVER_URL } from '@constants/server';

type ServerUrl = typeof PRODUCTION_SERVER_URL | typeof DEVELOP_SERVER_URL;

const isProductionServer = window.location.href.search(/https:\/\/carffe.in/) !== -1;
export const serverUrlStore = store<ServerUrl>(
  isProductionServer ? PRODUCTION_SERVER_URL : DEVELOP_SERVER_URL
);
