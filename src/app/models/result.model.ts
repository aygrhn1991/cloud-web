export class Search {
    string1: string;
    string2: string;
    number1: number;
    number2: number;
    datetime1: Date;
    datetime2: Date;
    daterange: Array<Date>;
    pageNum: number;
    pageSize: number;
    totalPage: number;

    vid: number = null;
    vin: string = null;
    dateStart: Date = null;
    dateEnd: Date = null;
    total: number = null;
}
export class Result {
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
