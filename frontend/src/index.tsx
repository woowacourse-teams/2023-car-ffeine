import { router } from 'router';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { mswModeActions } from '@utils/mswModeActions';

import { GlobalStyle } from 'style/GlobalStyle';

const queryClient = new QueryClient();

const main = async () => {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);

  if (process.env.NODE_ENV === 'development') {
    await mswModeActions.startMsw();
  }

  root.render(
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

main();
