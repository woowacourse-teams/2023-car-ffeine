import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import NotFound from '@ui/NotFound';

import App from '../App';

const GoogleLogin = lazy(() => import('@components/login-page/GoogleLogin'));
const CarFfeineMap = lazy(() => import('@map/CarFfeineMap'));

export const router = createBrowserRouter([
  {
    path: '/google',
    element: <GoogleLogin />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/maps',
    element: <CarFfeineMap />,
    errorElement: <NotFound />,
  },
]);
