import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import GoogleLogin from '../components/login/GoogleLogin';

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
