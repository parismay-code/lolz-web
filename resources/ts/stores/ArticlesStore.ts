import { makeAutoObservable } from 'mobx';

import IArticlesStore from '@interfaces/IArticlesStore';
import IArticle from '@interfaces/IArticle';
import IComment from '@interfaces/IComment';

export default class ArticlesStore implements IArticlesStore {
    articles: Array<IArticle> = [];
    comments: Record<number, Array<IComment>> = {};

    constructor() {
        makeAutoObservable(this);
    }

    setArticles = (articles: Array<IArticle>) => {
        this.articles = articles;
    };

    setComments = (articleId: number, comments: Array<IComment>) => {
        this.comments[articleId] = comments;
    };
}
