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

const fetchComments = async (articleId: number) => {
    if (articleId < 0) {
        return Promise.reject();
    }

    const response = await window.axios.get(`/articles/${articleId}/comments`);

    return response.data as Array<IComment>;
};

const Comments: FC<CommentsProps> = ({ articleId }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useRef<HTMLFormElement>(null);

    const queryClient = useQueryClient();

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

    return <div className='mt-16'>
        <h2 className='text-[2rem] font-bold mb-14'>Комментарии <span
            className='text-black/30'>({data?.length || 0})</span></h2>

        <form ref={form} method='post' action='#' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='grow flex flex-col items-start gap-1'>
                <label htmlFor='author' className='font-bold text-[1.2rem]'>Ваше имя</label>
                <input type='text' id='author' name='author' disabled={loading} />
            </div>

            <div className='flex flex-col items-start gap-1 mb-7'>
                <label htmlFor='content' className='font-bold text-[1.2rem]'>Комментарий</label>
                <textarea
                    title='Комментарий'
                    id='content'
                    name='content'
                    disabled={loading}
                    className='min-h-[5vh] max-h-[40vh]'
                />
            </div>

            <button
                type='submit'
                disabled={loading}
                className='w-80 ml-auto'
            >
                {loading ? 'Ожидайте...' : 'Отправить'}
            </button>
        </form>

        <hr className='my-16 mx-auto w-1/2 h-[0.1rem] bg-gray border-none' />

        <div>
            {data && data.map((el) => {
                return <Comment key={el.id} comment={el} />;
            })}
        </div>
    </div>;
};

export default Comments;
