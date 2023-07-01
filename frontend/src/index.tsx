import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { worker } from './mocks/browser';

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }

  const domNode = document.getElementById('root');
  const root = createRoot(domNode);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

main();
