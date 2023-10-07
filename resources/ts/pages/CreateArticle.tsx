import { FC } from 'react';

import ArticleForm from '@components/ArticleForm';

const CreateArticle: FC = () => {
    return <div className='w-full h-full flex flex-col gap-5'>
        <h1 className='font-semibold'>Создание статьи</h1>

        <ArticleForm />
    </div>;
};

export default CreateArticle;
