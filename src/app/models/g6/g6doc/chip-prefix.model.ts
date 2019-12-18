import { DocFileModel } from './doc-file.model';

export class ChipPrefixModel {
    chipModelName: string = null;
    contactorName: string = null;
    contactorPhone: string = null;
    requestID: string = null;
    authorizeFile: DocFileModel = new DocFileModel();
}