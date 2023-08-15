import { router } from 'router';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { configureToken } from '@utils/configureToken';
import { getAPIEndPoint } from '@utils/login';

import { mswModeActions } from '@stores/config/mswModeStore';

import { GlobalStyle } from 'style/GlobalStyle';

const queryClient = new QueryClient();

const main = async () => {
  if (getAPIEndPoint() === 'http://localhost:8080/api') {
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
