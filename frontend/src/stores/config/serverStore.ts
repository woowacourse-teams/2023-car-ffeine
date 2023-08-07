import { store } from '@utils/external-state';

import type { SERVERS } from '@constants';

export const serverStore = store<keyof typeof SERVERS>(
  process.env.NODE_ENV === 'production' ? 'production' : 'localhost'
);

export const serverActions = {
  changeServer: (nextServer: keyof typeof SERVERS) => {
    serverStore.setState(nextServer);
  },
};
