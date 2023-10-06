import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useStores } from '@contexts/StoresContext';

import Layout from '@components/Layout';
import IUser from '@interfaces/IUser.ts';

const ProtectedLayout: FC = observer(() => {
    const { authStore } = useStores();

    const fetchUser = async () => {
        const response = await window.axios.get('/user');

        return response.data;
    };

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUser,
        onSuccess: (data: IUser) => {
            authStore.setUser(data);
        },
        onError: () => {
            localStorage.removeItem('user');
        },
        staleTime: 120 * 60 * 1000,
        cacheTime: 120 * 60 * 1000,
        retry: false,
    });

    if (!isLoading && !authStore.user) {
        return <Navigate to='/login' />;
    }

    return <Layout isLoading={isLoading} />;
});

export default ProtectedLayout;
