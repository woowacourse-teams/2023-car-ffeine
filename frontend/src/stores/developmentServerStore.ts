import { store } from '@utils/external-state';

import type { servers } from '@constants';

export const developmentServerStore = store<keyof typeof servers>(
  process.env.NODE_ENV === 'production' ? 'production' : 'localhost'
);

export const developmentServerActions = {
  changeServer: (nextServer: keyof typeof servers) => {
    developmentServerStore.setState(nextServer);
  },
};
