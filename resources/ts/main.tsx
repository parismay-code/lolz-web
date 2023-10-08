import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

import { StoresProvider } from '@contexts/StoresContext';

import './bootstrap';

import './style.css';
import { HeaderProvider } from '@contexts/HeaderContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StoresProvider>
            <HeaderProvider>
                <App />
            </HeaderProvider>
        </StoresProvider>
    </QueryClientProvider>,
);

