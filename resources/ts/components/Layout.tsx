import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';

interface LayoutProps {
    isLoading?: boolean;
}

const Layout: FC<LayoutProps> = ({ isLoading }) => {
    return <>
        <Header />
        <main className='container mx-auto grow'>
            {isLoading ? <div>Loading...</div> : <Outlet />}
        </main>
    </>;
};

export default Layout;
