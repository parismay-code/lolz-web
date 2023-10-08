import { createContext, FC, ReactNode, useContext, useState } from 'react';

import IHeaderContext from '@interfaces/IHeaderContext';
import IHeaderLink from '@interfaces/IHeaderLink';

const HeaderContext = createContext<IHeaderContext>({
    links: [],
    setLinks: () => {
    },
    title: '',
    setTitle: () => {
    },
});

export const HeaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [_links, setLinks] = useState<Array<IHeaderLink>>([]);
    const [_title, setTitle] = useState<string>('');

    return <HeaderContext.Provider value={{ links: _links, setLinks: setLinks, title: _title, setTitle: setTitle }}>
        {children}
    </HeaderContext.Provider>;
};

export const useHeader = () => {
    return useContext(HeaderContext);
};
