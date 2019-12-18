import { DocFileModel } from './doc-file.model';

export class VehModifyModel {
    vin: string = null;
    tboxModelOld: string = null;
    tboxModelNew: string = null;
    chipModelOld: string = null;
    chipModelNew: string = null;
    chipSnNew: string = null;
    chipSnOld: string = null;
    tboxSnOld: string = null;
    tboxSnNew: string = null;
    remark: string = null;
    contactorPhone: string = null;
    contactorName: string = null;
    strRequestFile: DocFileModel = new DocFileModel();
}