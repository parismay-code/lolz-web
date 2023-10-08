import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import IPaginated from '@interfaces/IPaginated';
import IArticle from '@interfaces/IArticle';

import Article from '@components/Article';

interface ArticlesListProps {
    isAdmin: boolean;
    filter: string;
}

const fetchArticles = async (page = 1, filter = 'new') => {
    const response = await window.axios.get(`/articles/${filter}?page=${page}`);

    return response.data;
};

const ArticlesList: FC<ArticlesListProps> = ({ isAdmin, filter }) => {
    const [page, setPage] = useState<number>(1);

    const { data } = useQuery<IPaginated<Array<IArticle>>>({
        queryKey: ['articles', page, filter],
        queryFn: () => fetchArticles(page, filter),
        onError: (err) => {
            console.log(err);
        },
        keepPreviousData: true,
    });

    return <div className='relative'>
        <div className='flex flex-wrap justify-evenly gap-5'>
            {data?.data.map((el) => {
                return <Article key={el.id} article={el} isAdmin={isAdmin} />;
            })}
        </div>

        {data && data.pagination.total > data.pagination.per_page &&
            <div
                className='absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 mx-auto font-bold'>
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
