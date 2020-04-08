import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { SearchModel, Result, G6DocResult } from 'src/app/models/result.model';
import { VehDocModel } from 'src/app/models/g6/g6doc/veh-doc.model';
import { VehModifyModel } from 'src/app/models/g6/g6doc/veh-modify.model';
import { G6DocHttpService } from 'src/app/services/g6/g6-http-doc.service';

@Component({
  selector: 'app-veh-doc',
  templateUrl: './veh-doc.component.html',
  styleUrls: ['./veh-doc.component.css']
})
export class VehDocComponent implements OnInit {

  //#region 基本数据
  docOptions: Array<any> = [
    { value: -1, label: '全部' },
    { value: 0, label: '未备案' },
    { value: 1, label: '已备案' },
    { value: 2, label: '审核中' },
  ];
  typeOptions: Array<any> = [
    { value: 0, label: '防篡改基础信息备案激活状态' },
    { value: 1, label: '在线状态' },
    { value: 2, label: '静态备案审核状态' },
    { value: 3, label: '接入状态' },
  ];
  //#endregion

  constructor(private http: G6DocHttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.searchModel = Object.assign(new SearchModel(), {
      docState: null,
    });
    this.reset();
  }

  //#region 登录获取token
  loginState: boolean = false;
  username: string = null;
  password: string = null;
  token: string = null;
  login() {
    if (this.util.isNull(this.username) || this.util.isNull(this.password)) {
      this.notification.error('用户名密码不能为空', null);
      return;
    }
    this.http.g6DocLogin(this.username, this.password).subscribe((data: G6DocResult) => {
      this.notification.info(data.message, null);
      if (data.type == 'success' && data.code == 200) {
        this.loginState = true;
        this.token = data.data.token;
      } else {
        this.loginState = false;
      }
    })
  }
  //#endregion

  //#region 搜索区
  loading: boolean = false;
  vinOptions: Array<any> = [];
  dataOrg: Array<any> = [];
  dataList: Array<any> = [];
  searchModel: any = null;
  getData(): void {
    this.loading = true;
    this.http.getG6DocVeh().subscribe((data: Result) => {
      this.loading = false;
      this.dataOrg = data.data;
      this.dataList = this.dataOrg;
    })
  }
  filterData(): void {
    if (this.util.isNull(this.searchModel.vid)) {
      if (this.searchModel.docState == -1) {
        this.dataList = this.dataOrg;
      } else {
        this.dataList = this.dataOrg.filter((e) => {
          return e.state_doc == this.searchModel.docState;
        });
      }
    } else {
      if (this.searchModel.docState == -1) {
        this.dataList = this.dataOrg.filter((e) => {
          return e.C_ID == this.searchModel.vid;
        });
      } else {
        this.dataList = this.dataOrg.filter((e) => {
          return e.C_ID == this.searchModel.vid && e.state_doc == this.searchModel.docState;
        });
      }
    }
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.docState = -1;
    this.getData();
  }
  onChange(value: string): void {
    if (this.util.isNull(value)) {
      this.searchModel.vid = null;
      return;
    }
    this.vinOptions = this.dataList.filter((e) => {
      return e.C_VIN.indexOf(value) != -1;
    }).slice(0, 10);
    if (this.vinOptions.filter(e => { return e.C_VIN == this.searchModel.vin }).length == 0) {
      this.searchModel.vid = null;
      return;
    }
    this.vinOptions.forEach(e => {
      if (e.C_VIN == this.searchModel.vin) {
        this.searchModel.vid = e.C_ID;
      }
    });
  }
  //#endregion

  //#region 添加车辆
  isVisibleAdd: boolean = false;
  addModel: VehDocModel = new VehDocModel();
  tempId: number = null;
  showModalAdd(e): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.addModel = new VehDocModel();
    this.addModel.vehicleFrameNo = e.C_VIN;
    this.tempId = e.C_ID;
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    for (var item in this.addModel) {
      if (this.util.isNull(this.addModel[item])) {
        this.notification.error('必填项不能为空', null);
        return;
      }
    }
    this.http.addG6DocVeh(this.tempId, this.addModel).subscribe((data: Result) => {
      if (data.successed) {
        this.http.uploadG6DocVeh(this.token, this.addModel).subscribe((d: G6DocResult) => {
          this.notification.info(d.message, null);
          this.isVisibleAdd = false;
          this.getData();
        });
      } else {
        this.notification.error('备案信息本地保存失败', null);
      }
    })
  }
  //#endregion

  //#region 更换终端
  isVisibleEdit: boolean = false;
  editModel: VehModifyModel = new VehModifyModel();
  showModalEdit(e): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.editModel = new VehModifyModel();
    this.editModel.vin = e.C_VIN;
    this.editModel.tboxModelOld = e.tboxType;
    this.editModel.chipModelOld = e.chipType;
    this.editModel.tboxSnOld = e.tboxSn;
    this.editModel.chipSnOld = e.chipSn;
    this.editModel.remark = e.remark;
    this.editModel.contactorPhone = e.contactorPhone;
    this.editModel.contactorName = e.contactorName;
    this.isVisibleEdit = true;
  }
  handleOkEdit(): void {
    for (var item in this.editModel) {
      if (this.util.isNull(this.editModel[item])) {
        this.notification.error('必填项不能为空', null);
        return;
      }
    }
    this.http.editG6DocVeh(this.editModel).subscribe((data: Result) => {
      if (data.successed) {
        this.http.uploadG6DocVehEdit(this.token, this.editModel).subscribe((d: G6DocResult) => {
          this.notification.info(d.message, null);
          this.isVisibleEdit = false;
          this.getData();
        });
      } else {
        this.notification.error('备案信息本地保存失败', null);
      }
    })
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.editModel.strRequestFile.fileName = file.name;
    this.editModel.strRequestFile.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.editModel.strRequestFile.value = data;
    });
    return false;
  };
  //#endregion

  //#region 结果查询
  checkType(veh, type) {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.http.getG6DocVehState(this.token, veh.C_ID, type).subscribe((data: G6DocResult) => {
      if (data.type == 'success' && data.code == 200) {
        this.notification.info(data.data.retDetail, null);
      } else {
        this.notification.info(data.message, null);
      }
    });
  }
  checkModify(e) {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.http.getG6DocVehEditResult(this.token, e.requestID).subscribe((data: G6DocResult) => {
      if (data.type == 'success' && data.code == 200) {
        this.notification.info(data.data.retDetail, null);
      } else {
        this.notification.info(data.message, null);
      }
    });
  }
  //#endregion

  //#region 状态同步
  refresh() {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    let tempList = this.dataOrg.filter(e => { return e.state_doc == 1 });
    if (tempList.length == 0) {
      this.notification.error('没有需要同步的车辆', null);
      return;
    }
    tempList.forEach(e => {
      this.http.getG6DocVehState(this.token, e.C_ID, this.typeOptions[2].value).subscribe((data: G6DocResult) => {
        if (data.type == 'success' && data.code == 200) {
          this.notification.info(e.C_VIN + data.data.retDetail, null);
          this.http.editG6DocVehState(e.C_ID, this.typeOptions[2].value, data.data.retStatus).subscribe(() => {
            this.notification.info(e.C_VIN + '状态已更新', null);
          });
        } else {
          this.notification.info(data.message, null);
        }
      });
    });
  }
  //#endregion

}
