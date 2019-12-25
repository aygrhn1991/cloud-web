export class MenuModel {
    title: string = null;
    path: string = null;
    selected: boolean = null;
    active: boolean = null;
    show: boolean = null;
    pages: Array<MenuModel> = [];
}
