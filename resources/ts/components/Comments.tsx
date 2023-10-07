import { FC, SyntheticEvent, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import IComment from '@interfaces/IComment';

import Comment from '@components/Comment';

interface CommentsProps {
    articleId: number;
}

interface FormData {
    author: { value: string };
    content: { value: string };
}

const Comments: FC<CommentsProps> = ({ articleId }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useRef<HTMLFormElement>(null);

    const queryClient = useQueryClient();

    const fetchComments = async (articleId: number) => {
        if (articleId < 0) {
            return Promise.reject();
        }

        const response = await window.axios.get(`/articles/${articleId}/comments`);

        return response.data as Array<IComment>;
    };

    const { data } = useQuery({
        queryKey: ['comments', articleId],
        queryFn: () => fetchComments(articleId),
        onError: (err) => {
            console.log(err);
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();

        setLoading(true);

        const { author, content } = event.target as typeof event.target & FormData;

        const body = {
            author: author.value,
            content: content.value,
        };

        try {
            const response = await window.axios.post(`/articles/${articleId}/comments`, body);

            if (response.status === 200) {
                await queryClient.invalidateQueries(['comments', articleId]);
                form.current?.reset();
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return <div className='pb-10'>
        <h2 className='text-2xl font-semibold mb-5'>Комментарии</h2>

        <form ref={form} method='post' action='#' onSubmit={handleSubmit} className='flex flex-col gap-5 mb-10'>
            <h3 className='text-xl font-semibold'>Оставить комментарий</h3>

            <div className='w-1/2 h-12 flex items-end justify-between gap-5'>
                <div className='grow flex flex-col items-start gap-1'>
                    <label htmlFor='author'>Ваше имя</label>
                    <input type='text' id='author' name='author' disabled={loading} />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='basis-80 h-full'
                >
                    {loading ? 'Ожидайте...' : 'Отправить'}
                </button>
            </div>

            <div className='flex flex-col items-start gap-1'>
                <label htmlFor='content'>Комментарий</label>
                <textarea
                    title='Комментарий'
                    id='content'
                    name='content'
                    disabled={loading}
                    className='min-h-[5vh] max-h-[40vh]'
                />
            </div>
        </form>

        <div>
            {data && data.map((el) => {
                return <Comment key={el.id} comment={el} />;
            })}
        </div>
    </div>;
};

export default Comments;
