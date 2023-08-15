import * as process from 'process';
import { router } from 'router';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { configureToken } from '@utils/configureToken';
import { getAPIEndPoint } from '@utils/login';
import { getSessionStorage } from '@utils/storage';

import { mswModeActions } from '@stores/config/mswModeStore';
import { serverActions } from '@stores/config/serverStore';

import { GlobalStyle } from 'style/GlobalStyle';

import { SESSION_KEY_SERVER_MODE } from '@constants/storageKeys';

const queryClient = new QueryClient();

const main = async () => {
  if (process.env.NODE_ENV === 'development' && getAPIEndPoint() === 'http://localhost:8080/api') {
    await mswModeActions.startMsw();
  }

  const domNode = document.getElementById('root');
  const root = createRoot(domNode);

  root.render(
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

configureToken();
main();
