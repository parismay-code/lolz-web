import IAuthStore from '@interfaces/IAuthStore';
import IArticlesStore from '@interfaces/IArticlesStore';

export default interface IStoresContext {
    authStore?: IAuthStore;
    articlesStore?: IArticlesStore;
}
