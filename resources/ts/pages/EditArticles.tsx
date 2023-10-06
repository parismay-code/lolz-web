import { FC } from 'react';

import ArticlesList from '@components/ArticlesList';

const EditArticles: FC = () => {
    return <div className='w-full h-full'>
        <h1 className='font-semibold mb-5'>Редактирование статей</h1>

        <ArticlesList isAdmin={true} />
    </div>;
};

export default EditArticles;
