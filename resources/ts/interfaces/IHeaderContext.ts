import IHeaderLink from '@interfaces/IHeaderLink';

export default interface IHeaderContext {
    links: Array<IHeaderLink>;
    title: string;

    setLinks(links: Array<IHeaderLink>): void;
    setTitle(title: string): void;
}
