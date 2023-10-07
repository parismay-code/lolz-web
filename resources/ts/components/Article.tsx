import { FC } from 'react';

import IArticle from '@interfaces/IArticle';
import { Link } from 'react-router-dom';

interface ArticleProps {
    article: IArticle;
    isAdmin: boolean;
}

const Article: FC<ArticleProps> = ({ article, isAdmin }) => {
    const title = article.title.length > 30 ? article.title.substring(0, 26) + '...' : article.title;

    const description = article.description.length > 300 ? article.description.substring(0, 296) + '...' : article.description;

    return <Link
        to={isAdmin ? `/admin/articles/${article.id}/edit` : `/articles/${article.id}`}
        className='relative rounded grow basis-80 min-h-[18rem] max-h-[25rem] p-3 pb-7 border-2 border-dashed border-opacity-75 opacity-75 hover:border-opacity-100 hover:opacity-100 transition-all'
    >
        <h2 className='mb-5 font-semibold' title={article.title}>Статья "{title}"</h2>

        <span>Описание:</span>
        <pre className='font-sans balance'>{description}</pre>

        {isAdmin && <span className='absolute left-3 bottom-3 text-sm opacity-50'>ID: {article.id}</span>}
    </Link>;
};

export default Article;
