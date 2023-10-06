import { createContext, FC, ReactNode, useContext } from 'react';

import IStoresContext from '@interfaces/IStoresContext';
import AuthStore from '@stores/AuthStore';
import ArticlesStore from '@stores/ArticlesStore.ts';

const StoresContext = createContext<IStoresContext>({});

export const StoresProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const authStore = new AuthStore();
    const articlesStore = new ArticlesStore();

    return <StoresContext.Provider value={{ authStore, articlesStore }}>
        {children}
    </StoresContext.Provider>;
};

export const useStores = () => {
    return useContext(StoresContext) as Required<IStoresContext>;
};
