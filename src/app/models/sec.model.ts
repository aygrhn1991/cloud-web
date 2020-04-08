export class AccountModel {
    platform: number;
    name: string;
    account: string;
    password: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
}
export class MenuModel {
    name: string;
    _select: boolean;
    pages: Array<PageModel>;
}
export class PageModel {
    id: number;
    groupName: string;
    name: string;
    path: string;
    sort: number;
    _select: boolean;
}
export class RoleModel {
    id: number;
    name: string;
    _select: boolean;
    pages: Array<PageModel>;
}
export class UserModel {
    id: number;
    name: string;
    account: string;
    password: string;
    state: number;
    roles: Array<RoleModel>;
}