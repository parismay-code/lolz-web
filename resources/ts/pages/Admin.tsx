import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useHeader } from '@contexts/HeaderContext';

import IHeaderLink from '@interfaces/IHeaderLink';

const links: Array<IHeaderLink> = [
    {
        title: 'Редактирование',
        link: '/admin/articles/edit',
    },
    {
        title: 'Создание',
        link: '/admin/articles/create',
    },
];

const Admin: FC = () => {
    const { setLinks, setTitle } = useHeader();

    useEffect(() => {
        setLinks(links);
        setTitle('Администрирование');

        return () => {
            setLinks([]);
            setTitle('');
        };
    }, []);

    return <section className='relative w-full h-full flex items-start'>
        <Outlet />
    </section>;
};

export default Admin;
