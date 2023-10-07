import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

interface ILink {
    title: string;
    link: string;
}

const links: Array<ILink> = [
    {
        title: 'Создание статьи',
        link: '/admin/articles/create',
    },
    {
        title: 'Редактирование статей',
        link: '/admin/articles/edit',
    },
];

const Admin: FC = () => {
    return <section className='relative w-full h-full flex items-start'>
        <nav className='h-full w-[15%] pr-5 border-r-2 border-violet-950 flex flex-col items-start gap-2'>
            {links.map((el) => {
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
        </nav>

        <div className='h-full w-[85%] pl-5 pb-5 grow'>
            <Outlet />
        </div>
    </section>;
};

export default Admin;
