import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useStores } from '@contexts/StoresContext';

interface ILink {
    title: string;
    link: string;
    authRequired: boolean;
}

const links: Array<ILink> = [
    {
        title: 'Статьи',
        link: '/',
        authRequired: false,
    },
    {
        title: 'Администрирование',
        link: '/admin',
        authRequired: true,
    },
];

const Header: FC = observer(() => {
    const { authStore } = useStores();

    return <header className='py-3'>
        <nav className='flex items-center justify-center gap-5 font-semibold'>
            {links.map((el, key) => {
                if (el.authRequired && !authStore.user) {
                    return null;
                }

                return <NavLink
                    key={key}
                    to={el.link}
                    className={({ isActive }) => cn(
                        'link',
                        isActive && 'link_active',
                    )}
                >
                    {el.title}
                </NavLink>;
            })}

            {!authStore.user && <NavLink
                to='/login'
                className={({ isActive }) => cn(
                    'link',
                    isActive && 'link_active',
                )}
            >
                Вход
            </NavLink>}
        </nav>
    </header>;
});

export default Header;
