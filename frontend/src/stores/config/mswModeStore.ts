import { store } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

export const mswModeStore = store<boolean>(getAPIEndPoint() === 'http://localhost:8080/api');

export const mswModeActions = {
  startMsw: async () => {
    if (getAPIEndPoint() !== 'http://localhost:8080/api') {
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      const { worker } = require('@mocks/browser');
      await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass',
      });
    }

    mswModeStore.setState(true);
  },
  stopMsw: async () => {
    if (process.env.NODE_ENV === 'development') {
      const { worker } = require('@mocks/browser');
      await worker.stop();
    }

    mswModeStore.setState(false);
  },
};
