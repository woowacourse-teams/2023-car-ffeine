import { createBrowserRouter } from 'react-router-dom';

import GoogleLogin from '@components/login-page/GoogleLogin';

import NotFound from '@ui/NotFound';

import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/google',
        element: <GoogleLogin />,
      },
    ],
  },
]);
