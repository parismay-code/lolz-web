import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import IArticle from '@interfaces/IArticle';

import ArticleForm from '@components/ArticleForm';
import Comments from '@components/Comments';
import { useHeader } from '@contexts/HeaderContext.tsx';

interface ArticleProps {
    isAdmin: boolean;
}

const fetchArticle = async (id: number) => {
    if (isNaN(id) || id < 0) {
        return Promise.reject();
    }

    const response = await window.axios.get(`/articles/article/${id}`);

    return response.data as IArticle;
};

const Article: FC<ArticleProps> = ({ isAdmin }) => {
    const { id } = useParams();

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

    const { setTitle } = useHeader();

    useEffect(() => {
        if (!isAdmin) {
            setTitle(data?.title || '');
        }

        return () => {
            if (!isAdmin) {
                setTitle('');
            }
        };
    }, [data, isAdmin]);

    return data ? <section className={isAdmin ? 'w-full h-full flex flex-col' : ''}>
        {
            isAdmin ? <ArticleForm article={data} />
                :
                <div className='w-full py-16 px-14 drop-shadow shadow-shadow/50 bg-white text-[1.5rem]'>
                    <pre
                        className='font-sans whitespace-pre-wrap break-words text-black/50 mb-10'>{data.description}</pre>

                    <pre className='font-sans whitespace-pre-wrap break-words'>{data.content}</pre>
                </div>
        }

        {!isAdmin && <Comments articleId={data.id} />}
    </section> : null;
};

export default Article;
