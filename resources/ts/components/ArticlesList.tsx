import { FC, useState } from 'react';
import Article from '@components/Article.tsx';
import { useQuery } from 'react-query';
import IPaginated from '@interfaces/IPaginated.ts';
import IArticle from '@interfaces/IArticle.ts';

interface ArticlesListProps {
    isAdmin: boolean;
}

const fetchArticles = async (page = 1) => {
    const response = await window.axios.get(`/articles?page=${page}`);

    return response.data;
};

const ArticlesList: FC<ArticlesListProps> = ({ isAdmin }) => {
    const [page, setPage] = useState<number>(1);

    const { data } = useQuery<IPaginated<Array<IArticle>>>({
        queryKey: ['articles', page],
        queryFn: () => fetchArticles(page),
        onError: (err) => {
            console.log(err);
        },
        keepPreviousData: true,
    });

    return <div className='relative w-full h-full flex flex-col'>
        <div className='flex flex-wrap gap-2'>
            {data?.data.map((el) => {
                return <Article key={el.id} article={el} isAdmin={isAdmin} />;
            })}
        </div>

        {data && data.pagination.total > data.pagination.per_page &&
            <div
                className='absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 mb-40 mx-auto font-bold'>
                <button
                    type='button'
                    disabled={data.pagination.current_page - 1 === 0}
                    className='link'
                    onClick={() => {
                        setPage(prev => Math.max(prev - 1, 1));
                    }}
                >
                    {'<'}
                </button>

                <div className='flex w-16 justify-between'>
                    <button
                        type='button'
                        className='link p-2'
                        disabled={data.pagination.current_page - 1 === 0}
                        onClick={() => {
                            setPage(prev => Math.max(prev - 1, 1));
                        }}
                    >
                        {data.pagination.current_page - 1 > 0 ? data.pagination.current_page - 1 : ''}
                    </button>

                    <div className='link link_active p-2'>
                        {data.pagination.current_page}
                    </div>

                    <button
                        type='button'
                        className='link p-2'
                        disabled={data.pagination.current_page + 1 > data.pagination.last_page}
                        onClick={() => {
                            setPage(prev => Math.min(prev + 1, data.pagination.last_page));
                        }}
                    >
                        {data.pagination.current_page + 1 <= data.pagination.last_page ? data.pagination.current_page + 1 : ''}
                    </button>
                </div>

                <button
                    type='button'
                    disabled={data.pagination.current_page + 1 > data.pagination.last_page}
                    className='link'
                    onClick={() => {
                        setPage(prev => Math.min(prev + 1, data.pagination.last_page));
                    }}
                >
                    {'>'}
                </button>
            </div>}
    </div>;
};

export default ArticlesList;
