import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';

import { useStores } from '@contexts/StoresContext';

const ProtectedLayout: FC = observer(() => {
  const { authStore } = useStores();

  const user = authStore.user;

  const fetchUser = async () => {
    try {
      const response = await window.axios.get('/user');

      if (response.status === 200) {
        authStore.setUser(response.data.data);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <Navigate to='/' />;
  }

  return <>
    <Outlet />
  </>;
});

export default ProtectedLayout;
