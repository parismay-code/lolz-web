import IUser from '@interfaces/IUser.ts';

export default interface IAuthStore {
    user: IUser | null;

    setUser(user: IUser): void;

    csrfToken(): Promise<boolean>;
}
