import { store } from '@utils/external-state';

import type { servers } from '@constants';

export const developmentServerStore = store<keyof typeof servers>('localhost');

export const developmentServerActions = {
  changeServer: (nextServer: keyof typeof servers) => {
    developmentServerStore.setState(nextServer);
  },
};
