import IArticle from '@interfaces/IArticle.ts';
import IComment from '@interfaces/IComment.ts';

export default interface IArticlesStore {
    articles: Array<IArticle>;
    comments: Record<number, Array<IComment>>;

    setArticles(articles: Array<IArticle>): void;

    setComments(articleId: number, comments: Array<IComment>): void;
}
