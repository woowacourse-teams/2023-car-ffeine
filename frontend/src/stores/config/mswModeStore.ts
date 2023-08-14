import { worker } from '@mocks/browser';

import { store } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

export const mswModeStore = store<boolean>(getAPIEndPoint() === 'http://localhost:8080/api');

export const mswModeActions = {
  startMsw: async () => {
    if (getAPIEndPoint() !== 'http://localhost:8080/api') {
      return;
    }

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
