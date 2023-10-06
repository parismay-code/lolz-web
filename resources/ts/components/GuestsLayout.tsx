import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@contexts/StoresContext.tsx';
import { Navigate, Outlet } from 'react-router-dom';

const GuestsLayout: FC = observer(() => {
  const { authStore } = useStores();

  const user = authStore.user;

  if (user) {
    return <Navigate to='home' />;
  }

  return <>
    <Outlet />
  </>;
});

export default GuestsLayout;
