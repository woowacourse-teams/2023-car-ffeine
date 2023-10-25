import { createBrowserRouter } from 'react-router-dom';

import CarFfeineMap from '@map/CarFfeineMap';

import GoogleLogin from '@components/login-page/GoogleLogin';

import NotFound from '@ui/NotFound';

import App from '../App';

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
