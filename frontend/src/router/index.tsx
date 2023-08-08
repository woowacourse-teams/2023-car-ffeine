import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import GoogleLogin from '../components/login/GoogleLogin';

export const router = createBrowserRouter([
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
