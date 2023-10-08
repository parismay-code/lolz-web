import { FC } from 'react';

import IComment from '@interfaces/IComment';

interface CommentsProps {
    comment: IComment;
}

const Comment: FC<CommentsProps> = ({ comment }) => {
    const date = new Date(comment.created_at);

    return <div
        className='relative min-w-[30rem] w-fit flex flex-col gap-2 mb-16'>
        <span className='font-bold text-[1.2rem]'>{comment.author}</span>

        <div className='w-[85%] p-7 pt-10 bg-white drop-shadow shadow-shadow/50'>
            <pre className='font-sans whitespace-pre-wrap break-words text-[1.2rem] balance'>{comment.content}</pre>

            <span className='absolute top-3 right-3 text-black/30'>
            {
                `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}
                ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
            }
        </span>
        </div>
    </div>;
};

export default Comment;
