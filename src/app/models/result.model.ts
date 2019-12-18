export class SearchModel {
    vid: number = null;
    vin: string = null;
    dateStart: Date = null;
    dateEnd: Date = null;
    pageNum: number = null;
    pageSize: number = null;
    total: number = null;
    constructor() {
        this.vid = null;
        this.vin = null;
        this.dateStart = null;
        this.dateEnd = null;
        this.pageNum = null;
        this.pageSize = null;
        this.total = null;
    }
}
export class Result1 {
    success: boolean = null;
    message: string = null;
    data: any = null;
    constructor() {
        this.success = null;
        this.message = null;
        this.data = null;
    }
}
export class Result2 {
    successed: boolean = null;
    msg: string = null;
    data: any = null;
    constructor() {
        this.successed = null;
        this.msg = null;
        this.data = null;
    }
}
export class G6DocResult {
    type: string = null;
    message: string = null;
    code: number = null;
    data = {
        token: null,
        retStatus: null,
        retDetail: null,
        requestID: null,
    };
    constructor() {
        this.type = null;
        this.message = null;
        this.code = null;
        this.data = {
            token: null,
            retStatus: null,
            retDetail: null,
            requestID: null,
        };
    }
}
