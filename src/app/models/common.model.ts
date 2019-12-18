export class XzqhModel {
    name: string = null;
    code: number = null;
    pcode: number = null;
    shortname: string = null;
    constructor() {
        this.name = null;
        this.code = null;
        this.pcode = null;
        this.shortname = null;
    }
}
export class XzqhTreeModel {
    label: string = null;
    value: number = null;
    isLeaf: boolean = null;
    children: Array<XzqhTreeModel> = null;
    constructor() {
        this.label = null;
        this.value = null;
        this.isLeaf = null;
        this.children = [];
    }
}
export class ColorModel {
    label: string;
    value: number;
    constructor() {
        this.label = null;
        this.value = null;
    }
}
export class PowerModel {
    label: string;
    value: number;
    constructor() {
        this.label = null;
        this.value = null;
    }
}
export class PlatformModel {
    label: string;
    value: number;
    constructor() {
        this.label = null;
        this.value = null;
    }
}