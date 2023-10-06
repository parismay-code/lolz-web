import { makeAutoObservable } from 'mobx';
import IAuthStore from '@interfaces/IAuthStore';
import IUser from '@interfaces/IUser.ts';

export default class AuthStore implements IAuthStore {
    user: IUser | null = null;

    constructor() {
        this.user = JSON.parse(localStorage.getItem('lolz_user') || 'null');

        makeAutoObservable(this);
    }

    setUser = (user: IUser) => {
        if (user) {
            localStorage.setItem('lolz_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('lolz_user');
        }

        this.user = user;
    };

    csrfToken = async () => {
        await window.axios.get('/sanctum/csrf-cookie');
        return true;
    };
}
