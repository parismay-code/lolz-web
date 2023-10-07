import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import IArticle from '@interfaces/IArticle';

import Comments from '@components/Comments';
import ArticleForm from '@components/ArticleForm.tsx';

interface ArticleProps {
    isAdmin: boolean;
}

const Article: FC<ArticleProps> = ({ isAdmin }) => {
    const { id } = useParams();

    const fetchArticle = async (id: number) => {
        if (isNaN(id) || id < 0) {
            return Promise.reject();
        }

        const response = await window.axios.get(`/articles/${id}`);

        return response.data as IArticle;
    };

    const { data } = useQuery({
        queryKey: ['article', id],
        queryFn: () => fetchArticle(parseInt(id || '-1')),
        onError: (err) => {
            console.log(err);
        },
        staleTime: 10 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        keepPreviousData: true,
    });

    return data ? <section className={isAdmin ? 'w-full h-full flex flex-col' : ''}>
        {
            isAdmin ? <>
                    <h1 className='text-3xl font-semibold mb-5'>Редактирование статьи "{data.title}"</h1>

                    <ArticleForm article={data} />
                </>
                : <>
                    <h1 className='text-3xl font-semibold mb-5'>Статья "{data.title}"</h1>

                    <pre className='font-sans whitespace-pre-wrap break-words pb-10 mb-10 border-b-2'>{data.description}</pre>

                    <pre className='font-sans whitespace-pre-wrap break-words pb-10 mb-10 border-b-2'>{data.content}</pre>
                </>
        }

        {!isAdmin && <Comments articleId={data.id} />}
    </section> : null;
};

export default Article;
