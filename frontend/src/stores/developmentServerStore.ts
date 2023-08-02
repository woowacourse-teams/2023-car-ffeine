import { store } from '@utils/external-state';

import type { SERVERS } from '@constants';

export const developmentServerStore = store<keyof typeof SERVERS>(
  process.env.NODE_ENV === 'production' ? 'production' : 'localhost'
);

export const developmentServerActions = {
  changeServer: (nextServer: keyof typeof SERVERS) => {
    developmentServerStore.setState(nextServer);
  },
};
