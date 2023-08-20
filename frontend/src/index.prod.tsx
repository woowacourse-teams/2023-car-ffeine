import { router } from 'router';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { GlobalStyle } from 'style/GlobalStyle';

const queryClient = new QueryClient();

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
