import { FC } from 'react';
import { Link } from 'react-router-dom';

import IArticle from '@interfaces/IArticle';

import dateIcon from '@assets/images/date.svg';

interface ArticleProps {
    article: IArticle;
    isAdmin: boolean;
}

const Article: FC<ArticleProps> = ({ article, isAdmin }) => {
    const title = article.title.length > 30 ? article.title.substring(0, 26) + '...' : article.title;

    const description = article.description.length > 35 ? article.description.substring(0, 31) + '...' : article.description;

    const date = new Date(article.created_at);

    return <Link
        to={isAdmin ? `/admin/articles/${article.id}/edit` : `/articles/${article.id}`}
        className='relative w-[27rem] h-72 p-8 bg-white drop-shadow shadow-shadow/50 transition-all'
    >
        <h2 className='mb-5 font-semibold text-[1.5rem] text-black/30' title={article.title}>{title}</h2>

        <p className='text-[2rem] font-bold balance'>{description}</p>

        <div className='absolute bottom-8 left-8 flex items-center gap-4'>
            <img src={dateIcon} alt={article.created_at} className='h-7' />
            <span
                className='text-black/50 font-medium text-[1.5rem]'>{`${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear().toString()}`}</span>
        </div>
    </Link>;
};

export default Article;
