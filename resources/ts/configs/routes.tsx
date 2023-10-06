import { RouteObject } from 'react-router-dom';

import GuestsLayout from '@components/GuestsLayout';
import ProtectedLayout from '@components/ProtectedLayout';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <GuestsLayout />,
    children: [
      {
        path: '/',
        element: <div>Login Page</div>,
      },
      {
        path: 'registration',
        element: <div>Registration Page</div>,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: 'home',
        element: <div>Home Page</div>,
      },
    ],
  },
];

export default routes;
