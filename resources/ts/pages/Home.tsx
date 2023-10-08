import { FC, useEffect, useState } from 'react';

import { useHeader } from '@contexts/HeaderContext';

import IHeaderLink from '@interfaces/IHeaderLink';

import ArticlesList from '@components/ArticlesList';
import { useLocation } from 'react-router-dom';

const links: Array<IHeaderLink> = [
    {
        title: 'Популярные',
        link: '/',
    },
    {
        title: 'Новые',
        link: '/new',
    },
];

const Home: FC = () => {
    const location = useLocation();

    const [filter, setFilter] = useState<string>(location.pathname === '/new' ? 'new' : 'popular');

    const { setLinks, setTitle } = useHeader();

    useEffect(() => {
        setLinks(links);
        setTitle('Просмотр статей');

        return () => {
            setLinks([]);
            setTitle('');
        };
    }, []);

    useEffect(() => {
        location.pathname === '/new' ? setFilter('new') : setFilter('popular');
    }, [location.pathname]);

    return <section className='w-full h-full'>
        <ArticlesList isAdmin={false} filter={filter} />
    </section>;
};

export default Home;
