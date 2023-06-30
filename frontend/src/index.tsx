import App from './App';
import { createRoot } from 'react-dom/client';
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

  root.render(<App />);
};

main();
