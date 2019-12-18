import { DocFileModel } from './doc-file.model';

export class ChipModeModel {
    chipModel: string = null;
    chipFactoryId: string = null;
    chipFactoryName: string = null;
    contactorName: string = null;
    contactorPhone: string = null;
    chipFactoryNote: string = null;
    remark: string = null;
    chipExplain: string = null;
    requestID: string = null;
    chipFactorylicence: DocFileModel = new DocFileModel();
    iso9001Img: DocFileModel = new DocFileModel();
    ios14001_img: DocFileModel = new DocFileModel();
    guomiImg: DocFileModel = new DocFileModel();
    chipFile: DocFileModel = new DocFileModel();
}