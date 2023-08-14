import { worker } from '@mocks/browser';
import * as process from 'process';

import { store } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

export const mswModeStore = store<boolean>(
  process.env.NODE_ENV === 'development' && getAPIEndPoint() === 'http://localhost:8080/api'
);
export const mswModeActions = {
  startMsw: async () => {
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    });
    mswModeStore.setState(true);
  },
  stopMsw: async () => {
    await worker.stop();
    mswModeStore.setState(false);
  },
};
