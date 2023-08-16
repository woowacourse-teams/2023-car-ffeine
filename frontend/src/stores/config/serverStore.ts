import { store } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

import type { SERVERS } from '@constants';

const APIEndPoint = getAPIEndPoint();

export const serverStore = store<keyof typeof SERVERS>(
  APIEndPoint === 'https://api.carffe.in/api'
    ? 'production'
    : APIEndPoint === 'https://dain.carffe.in/api'
    ? 'dain'
    : 'localhost'
);

export const serverActions = {
  changeServer: (nextServer: keyof typeof SERVERS) => {
    serverStore.setState(nextServer);
  },
};
