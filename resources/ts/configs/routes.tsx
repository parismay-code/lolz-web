import { RouteObject } from 'react-router-dom';

import ProtectedLayout from '@components/ProtectedLayout';
import Layout from '@components/Layout';

import Home from '@pages/Home';
import Article from '@pages/Article';
import Login from '@pages/Login';
import Admin from '@pages/Admin';

const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/articles/:id',
                element: <Article />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: 'admin',
                element: <Admin />,
            },
        ],
    },
];

export default routes;
