import { FC } from 'react';
import ArticlesList from '@components/ArticlesList.tsx';

const Home: FC = () => {
    return <section className='w-full h-full'>
        <h1 className='font-semibold mb-5'>Просмотр статей</h1>

        <ArticlesList isAdmin={false} />
    </section>;
};

export default Home;
