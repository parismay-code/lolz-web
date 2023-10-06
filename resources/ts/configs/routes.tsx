import { RouteObject } from 'react-router-dom';

import ProtectedLayout from '@components/ProtectedLayout';
import Layout from '@components/Layout';

import Home from '@pages/Home';
import Article from '@pages/Article';
import Login from '@pages/Login';
import Admin from '@pages/Admin';
import CreateArticle from '@pages/CreateArticle.tsx';
import EditArticles from '@pages/EditArticles.tsx';

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
                path: '/admin',
                element: <Admin />,
                children: [
                    {
                        path: '/admin',
                        element: <div
                            className='w-full h-full flex items-center justify-center font-bold opacity-50'
                        >
                            Административная панель
                        </div>,
                    },
                    {
                        path: '/admin/articles/create',
                        element: <CreateArticle />,
                    },
                    {
                        path: '/admin/articles/edit',
                        element: <EditArticles />,
                    },
                    {
                        path: '/admin/articles/:id/edit',
                        element: <div>edit article</div>,
                    },
                ],
            },
        ],
    },
];

export default routes;
