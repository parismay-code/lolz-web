import IRole from '@interfaces/IRole';
import IScope from '@interfaces/IScope';

export default interface IUser {
    id: number;
    login: string;
    roles: Array<IRole>;
    scopes: Array<IScope>;
    created_at: string;
    updated_at: string;
}
