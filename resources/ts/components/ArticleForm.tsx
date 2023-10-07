import { FC, SyntheticEvent, useState } from 'react';
import IArticle from '@interfaces/IArticle.ts';

interface ArticleFormProps {
    article?: IArticle;
}

interface FormData {
    title: { value: string };
    description: { value: string };
    content: { value: string };
}

const ArticleForm: FC<ArticleFormProps> = ({ article }) => {
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
            let response;

            if (article) {
                response = await window.axios.put(`/articles/${article.id}`, body);
            } else {
                response = await window.axios.post('/articles', body);
            }

            if (response.status === 200) {
                window.location.href = `/articles/${response.data.id}`;
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            if (!article) {
                throw new Error('no article');
            }

            const response = await window.axios.delete(`articles/${article.id}`);

            if (response.status === 200) {
                window.location.href = '/admin/articles/edit';
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return <form method='post' action='#' onSubmit={handleSubmit}
                 className='w-full grow flex flex-col items-center gap-5'>
        <div className='w-full flex items-center justify-between gap-5'>
            <div className='grow flex flex-col items-start gap-1'>
                <label htmlFor='title'>Название</label>
                <input type='text' id='title' name='title' disabled={loading}
                       defaultValue={article ? article.title : ''} />
            </div>

            <div className='basis-80 h-full flex items-center gap-1'>
                <button
                    type='submit'
                    disabled={loading}
                    className='h-full'
                >
                    {loading ? 'Ожидайте...' : article ? 'Изменить' : 'Создать'}
                </button>

                {article && <button
                    type='button'
                    disabled={loading}
                    className='h-full delete-button'
                    onClick={handleDelete}
                >
                    {loading ? 'Ожидайте...' : 'Удалить'}
                </button>}
            </div>
        </div>

        <div className='w-full flex flex-col items-start gap-1'>
            <label htmlFor='description'>Описание</label>
            <textarea
                title='Описание'
                id='description'
                name='description'
                disabled={loading}
                className='min-h-[5vh] max-h-[40vh]'
                defaultValue={article ? article.description : ''}
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
                defaultValue={article ? article.content : ''}
            />
        </div>
    </form>;
};

export default ArticleForm;
