import { worker } from './browser';

export const startMsw = async () => {
  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
};
