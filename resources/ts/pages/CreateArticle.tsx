import { FC, SyntheticEvent, useState } from 'react';

interface FormData {
    title: { value: string };
    description: { value: string };
    content: { value: string };
}

const CreateArticle: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();

        setLoading(true);

        const { title, description, content } = event.target as typeof event.target & FormData;

        const body = {
            title: title.value,
            description: description.value,
            content: content.value,
        };

        try {
            await window.axios.post('/articles', body);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return <div className='w-full h-full flex flex-col gap-5'>
        <h1 className='font-semibold'>Создание статьи</h1>

        <form method='post' action='#' onSubmit={handleSubmit} className='w-full grow flex flex-col items-center gap-5'>
            <div className='w-full flex items-center justify-between gap-5'>
                <div className='grow flex flex-col items-start gap-1'>
                    <label htmlFor='title'>Название</label>
                    <input type='text' id='title' name='title' disabled={loading} />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='basis-80 h-full'
                >
                    {loading ? 'Ожидайте...' : 'Создать'}
                </button>
            </div>

            <div className='w-full flex flex-col items-start gap-1'>
                <label htmlFor='description'>Описание</label>
                <textarea
                    title='Описание'
                    id='description'
                    name='description'
                    disabled={loading}
                    className='min-h-[5vh] max-h-[40vh]'
                />
            </div>

            <div className='w-full grow flex flex-col items-start gap-1'>
                <label htmlFor='content'>Контент</label>
                <textarea
                    title='Контент'
                    id='content'
                    name='content'
                    disabled={loading}
                    className='grow resize-none'
                />
            </div>
        </form>
    </div>;
};

export default CreateArticle;
