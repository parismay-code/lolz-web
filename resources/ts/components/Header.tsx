import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import cn from 'classnames';

import { useStores } from '@contexts/StoresContext';
import { useHeader } from '@contexts/HeaderContext';

import logo from '@assets/images/logo.svg';

interface ILink {
    title: string;
    link: string;
    authRequired: boolean;
    display: boolean;
}

const links: Array<ILink> = [
    {
        title: 'Статьи',
        link: '/',
        authRequired: false,
        display: true,
    },
    {
        title: 'Администрирование',
        link: '/admin',
        authRequired: true,
        display: true,
    },
    {
        title: 'Войти',
        link: '/login',
        authRequired: false,
        display: false,
    },
];

const Header: FC = observer(() => {
    const { authStore } = useStores();

    const headerContext = useHeader();

    const queryClient = useQueryClient();

    const login = links.find((el) => el.link === '/login') as ILink;

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

    return <header className='pt-14 px-24 bg-white drop-shadow shadow-shadow/50'>
        <nav className='flex items-center justify-between mb-24'>
            <div className='flex items-center gap-10'>
                <img src={logo} alt='Логотип' className='h-9 w-9' />

                {links.map((el) => {
                    if ((el.authRequired && !authStore.user) || !el.display) {
                        return null;
                    }

                    return <NavLink
                        key={el.link}
                        to={el.link}
                        className={({ isActive }) => cn(
                            'link text-[1.5rem]',
                            isActive && 'link_active',
                        )}
                    >
                        {el.title}
                    </NavLink>;
                })}
            </div>

            <div>
                {!authStore.user ? <NavLink
                        to={login.link}
                        className={({ isActive }) => cn(
                            'link text-[1.5rem]',
                            isActive && 'link_active',
                        )}
                    >
                        {login.title}
                    </NavLink> :
                    <a href='#' className='link text-[1.5rem]' onClick={handleLogout}>Выход</a>}
            </div>
        </nav>

        <h1 className='w-full font-bold text-[4rem] text-center mb-12'>{headerContext.title}</h1>

        {headerContext.links.length > 0 && <div className='flex items-center justify-center gap-12'>
            {headerContext.links.map((el) => {
                return <NavLink
                    key={el.link}
                    to={el.link}
                    className={({ isActive }) => cn(
                        'pb-8 text-[1.2rem] font-medium text-black slider',
                        isActive && 'slider_active',
                    )}
                >
                    {el.title}
                </NavLink>;
            })}
        </div>}
    </header>;
});

export default Header;
