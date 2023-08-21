import { store } from '@utils/external-state';

export const mswModeStore = store<boolean>(process.env.NODE_ENV === 'development');

export const mswModeActions = {
  startMsw: async () => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const { worker } = require('@mocks/browser');

    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    });

    mswModeStore.setState(true);
  },
  stopMsw: async () => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const { worker } = require('@mocks/browser');

    await worker.stop();

    mswModeStore.setState(false);
  },
};
