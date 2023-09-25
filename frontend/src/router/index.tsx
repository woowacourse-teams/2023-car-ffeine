import { createBrowserRouter } from 'react-router-dom';

import GoogleLogin from '@components/login-page/GoogleLogin';

import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/google',
    element: <GoogleLogin />,
  },
]);
