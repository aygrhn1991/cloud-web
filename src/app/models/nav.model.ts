export class NavModel {
    title: string = null;
    path: string = null;
    selected: boolean = null;
    active: boolean = null;
    show: boolean = null;
    subnavs: Array<NavModel> = null;
    menus: Array<NavModel> = null;
    pages: Array<NavModel> = null;
    constructor() {
        this.title = null;
        this.path = null;
        this.selected = false;
        this.active = false;
        this.show = true;
        this.subnavs = [];
        this.menus = [];
        this.pages = [];
    }
}
