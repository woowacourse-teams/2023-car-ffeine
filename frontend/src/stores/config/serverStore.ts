import { store } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

import type { SERVERS } from '@constants';

export const serverStore = store<keyof typeof SERVERS>(
  process.env.NODE_ENV === 'production'
    ? 'production'
    : getAPIEndPoint() === 'http://localhost:8080/api'
    ? 'localhost'
    : 'dain'
);

export const serverActions = {
  changeServer: (nextServer: keyof typeof SERVERS) => {
    serverStore.setState(nextServer);
  },
};
