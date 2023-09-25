export const mswModeActions = {
  startMsw: async () => {
    const { worker } = require('@mocks/browser');

    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    });
  },
  stopMsw: async () => {
    const { worker } = require('@mocks/browser');

    await worker.stop();
  },
};
