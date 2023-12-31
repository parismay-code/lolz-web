import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from '@contexts/StoresContext';
import { useHeader } from '@contexts/HeaderContext';

type Fields = 'login' | 'password';

interface FormData {
    login: { value: string };
    password: { value: string };
}

const Login: FC = observer(() => {
    const [errors, setErrors] = useState<Record<Fields, Array<string>>>();
    const [loading, setLoading] = useState<boolean>(false);

    const { authStore } = useStores();

    const { setTitle } = useHeader();

    useEffect(() => {
        setTitle('Авторизация');

        return () => {
            setTitle('');
        }
    }, []);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();

        setLoading(true);

        const { login, password } = event.target as typeof event.target & FormData;

        const body = {
            login: login.value,
            password: password.value,
        };

        try {
            await authStore.csrfToken();

            const response = await window.axios.post('/login', body);

            if (response.status === 200) {
                authStore.setUser(response.data);
                window.location.href = '/';
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                const message = error.response.data.message as string;

                setErrors({ login: [message], password: [] });
            }

            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    if (authStore.user) {
        return <Navigate to='/' />;
    }

    return <section className='w-full h-full flex items-center justify-center -translate-y-36'>
        <form method='post' action='#' onSubmit={handleSubmit} className='w-80 flex flex-col items-center gap-2'>
            <div className='w-full flex flex-col items-start gap-1'>
                <label htmlFor='login' className='font-bold text-[1.2rem]'>Логин</label>
                <input type='text' id='login' name='login' disabled={loading} />

                <div className='flex flex-col gap-1 text-rose-500'>
                    {errors?.login?.map((el) => {
                        return <span key={el}>{el}</span>;
                    })}
                </div>
            </div>

            <div className='w-full flex flex-col items-start gap-1 mb-7'>
                <label htmlFor='password' className='font-bold text-[1.2rem]'>Пароль</label>
                <input type='password' id='password' name='password' disabled={loading} />

                <div className='flex flex-col gap-1 text-rose-500'>
                    {errors?.password?.map((el) => {
                        return <span key={el}>{el}</span>;
                    })}
                </div>
            </div>

            <button
                type='submit'
                disabled={loading}
                className='w-full'
            >
                {loading ? 'Проверка...' : 'Войти'}
            </button>
        </form>
    </section>;
});

export default Login;
