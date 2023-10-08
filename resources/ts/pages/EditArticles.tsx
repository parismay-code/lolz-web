import { FC } from 'react';

import ArticlesList from '@components/ArticlesList';

const EditArticles: FC = () => {
    return <div className='w-full h-full'>
        <ArticlesList isAdmin={true} filter='new' />
    </div>;
};

export default EditArticles;
