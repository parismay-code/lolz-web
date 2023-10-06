import { createContext, FC, ReactNode, useContext } from 'react';

import IStoresContext from '@interfaces/IStoresContext';
import AuthStore from '@stores/AuthStore';

const StoresContext = createContext<IStoresContext>({});

export const StoresProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const authStore = new AuthStore();

    return <StoresContext.Provider value={{ authStore }}>
        {children}
    </StoresContext.Provider>;
};

export const useStores = () => {
    return useContext(StoresContext) as Required<IStoresContext>;
};
