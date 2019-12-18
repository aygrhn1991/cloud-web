export class Veh {
    vid: number = null;
    vin: string = null;
    vehNo: string = null;
    vehNoColor: number = null;
    xzqh: string = null;
    power: number = null;
    vehMode: string = null;
    simCode: string = null;
    dtuCode: string = null;
    createTime: number = null;
    remark: string = null;
    constructor() {
        this.vid = null;
        this.vin = null;
        this.vehNo = null;
        this.vehNoColor = null;
        this.xzqh = null;
        this.power = null;
        this.vehMode = null;
        this.simCode = null;
        this.dtuCode = null;
        this.createTime = null;
        this.remark = null;
    }
}
export class VehG6 extends Veh {
    engCode: string = null;
    constructor() {
        super();
        this.engCode = null;
    }
}
export class VehTBox extends Veh {
    dtuType: string = null;
    manu: string = null;
    key: string = null;
    iv: string = null;
    constructor() {
        super();
        this.dtuType = null;
        this.manu = null;
        this.key = null;
        this.iv = null;
    }
}
export class VehNE extends Veh { }
