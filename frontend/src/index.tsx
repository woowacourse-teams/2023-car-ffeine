import { createRoot } from 'react-dom/client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ApiKeyChecker from '@map/ApiKeyChecker';

import { configureToken } from '@utils/configureToken';

import { mswModeActions } from '@stores/mswModeStore';

import App from 'App';

import { GlobalStyle } from 'style/GlobalStyle';

const queryClient = new QueryClient();

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    await mswModeActions.startMsw();
  }

  const domNode = document.getElementById('root');
  const root = createRoot(domNode);

  root.render(
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ApiKeyChecker render={(apiKey) => <App apiKey={apiKey} />} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

configureToken();
main();
