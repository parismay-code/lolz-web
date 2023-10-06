import { FC } from 'react';

import IArticle from '@interfaces/IArticle';
import { Link } from 'react-router-dom';

interface ArticleProps {
    article: IArticle;
    isAdmin: boolean;
}

const Article: FC<ArticleProps> = ({ article, isAdmin }) => {
    return <Link
        to={isAdmin ? `/admin/articles/${article.id}/edit` : `/articles/${article.id}`}
        className='relative rounded grow basis-80 min-h-[18rem] max-h-[25rem] p-3 border-2 border-dashed border-opacity-75 opacity-75 hover:border-opacity-100 hover:opacity-100 transition-all'
    >
        <h2 className='mb-5'>Статья "{article.title}"</h2>

        <span>Описание:</span>
        <pre className='font-sans'>{article.description}</pre>

        {isAdmin && <span className='absolute left-3 bottom-3 text-sm opacity-50'>ID: {article.id}</span>}
    </Link>;
};

export default Article;
