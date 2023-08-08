import * as process from 'process';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { configureToken } from '@utils/configureToken';

import { mswModeActions } from '@stores/config/mswModeStore';
import { serverStore } from '@stores/config/serverStore';

import App from 'App';

import { GlobalStyle } from 'style/GlobalStyle';

import { SERVERS } from '@constants';

const GoogleLogin = () => {
  useEffect(() => {
    const mode = serverStore.getState();

    const url = window.location.search;

    console.log(url.split('&')[0].replace('?code=', ''));

    fetch(`${SERVERS[mode]}/api/oauth/google/login`, {
      method: 'POST',
      body: JSON.stringify({
        code: url.split('&')[0].replace('?code=', ''),
        redirectUri: 'http://localhost:3000/google',
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return <></>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App
        apiKey={
          process.env.NODE_ENV === 'development'
            ? process.env.GOOGLE_MAPS_API_KEY_DEV
            : process.env.GOOGLE_MAPS_API_KEY_PROD
        }
      />
    ),
  },
  {
    path: '/google',
    element: <GoogleLogin />,
  },
]);

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
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

configureToken();
main();
