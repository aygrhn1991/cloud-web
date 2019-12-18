import { DocFileModel } from './doc-file.model';

export class DtuModeModel {
    tboxModel: string = null;
    tboxFactoryId: string = null;
    tboxFactoryName: string = null;
    contactorName: string = null;
    contactorPhone: string = null;
    tboxFactoryNote: string = null;
    remark: string = null;
    chipModel: string = null;
    reportId: string = null;
    tboxExplain: string = null;
    requestID: string = null;
    tboxFactoryLicenceImg: DocFileModel = new DocFileModel();
    reportImg: DocFileModel = new DocFileModel();
    tboxFile: DocFileModel = new DocFileModel();
}