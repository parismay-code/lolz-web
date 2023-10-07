import { FC } from 'react';

import IComment from '@interfaces/IComment';

interface CommentsProps {
    comment: IComment;
}

const Comment: FC<CommentsProps> = ({ comment }) => {
    const date = new Date(comment.created_at);

    return <div
        className='relative min-w-[30rem] w-fit flex flex-col gap-3 justify-between p-3 mb-5 border-b-2 rounded bg-zinc-300/50'>
        <span className='font-semibold'>{comment.author}</span>

        <pre className='w-[80%] font-sans balance'>{comment.content}</pre>

        <span className='absolute top-3 right-3 opacity-75 text-sm'>
            {
                `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}
                ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
            }
        </span>
    </div>;
};

export default Comment;
