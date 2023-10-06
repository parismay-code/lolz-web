import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useStores } from '@contexts/StoresContext';
import { useQueryClient } from 'react-query';

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

    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            const response = await window.axios.post('/logout');

            if (response.status === 200) {
                await queryClient.invalidateQueries({ queryKey: ['auth'] });
                localStorage.removeItem('lolz_user');
                window.location.href = '/';
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return <header className='py-3 z-50'>
        <nav className='flex items-center justify-center gap-5 font-semibold'>
            {links.map((el) => {
                if (el.authRequired && !authStore.user) {
                    return null;
                }

                return <NavLink
                    key={el.link}
                    to={el.link}
                    className={({ isActive }) => cn(
                        'link',
                        isActive && 'link_active',
                    )}
                >
                    {el.title}
                </NavLink>;
            })}

            {!authStore.user ? <NavLink
                    to='/login'
                    className={({ isActive }) => cn(
                        'link',
                        isActive && 'link_active',
                    )}
                >
                    Вход
                </NavLink> :
                <a href='#' className='link' onClick={handleLogout}>Выход</a>}
        </nav>
    </header>;
});

export default Header;
