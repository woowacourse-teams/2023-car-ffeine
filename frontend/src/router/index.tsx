import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import GoogleLogin from '../components/login/GoogleLogin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App
        apiKey={
          process.env.NODE_ENV === 'production'
          ? process.env.GOOGLE_MAPS_API_KEY_PROD
          : process.env.GOOGLE_MAPS_API_KEY_DEV
        }
      />
    ),
  },
  {
    path: '/google',
    element: <GoogleLogin />,
  },
]);
