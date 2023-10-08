import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';

interface LayoutProps {
    isLoading?: boolean;
}

const Layout: FC<LayoutProps> = ({ isLoading }) => {
    return <>
        <Header />
        <main className='relative px-36 py-24 grow'>
            {isLoading ? <div className='w-full h-full flex items-center justify-center'>Loading...</div> : <Outlet />}
        </main>
    </>;
};

export default Layout;
