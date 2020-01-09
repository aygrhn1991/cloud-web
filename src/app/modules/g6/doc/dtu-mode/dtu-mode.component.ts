import { Component, OnInit } from '@angular/core';
import { NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { UtilService } from 'src/app/services/util.service';
import { Result1, G6DocResult } from 'src/app/models/result.model';
import { DtuModeModel } from 'src/app/models/g6/g6doc/dtu-mode.model';
import { G6DocHttpService } from 'src/app/services/g6/g6-http-doc.service';

@Component({
  selector: 'app-dtu-mode',
  templateUrl: './dtu-mode.component.html',
  styleUrls: ['./dtu-mode.component.css']
})
export class DtuModeComponent implements OnInit {

  constructor(private http: G6DocHttpService,
    private notification: NzNotificationService,
    private util: UtilService) { }

  ngOnInit() {
    this.getData();
  }

  loading: boolean = false;
  dataList: Array<any> = [];
  getData(): void {
    this.loading = true;
    this.http.getG6DocDtuMode().subscribe((data: Result1) => {
      this.loading = false;
      this.dataList = data.data;
    })
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

  //#region 添加终端型号
  isVisibleAdd: boolean = false;
  addModel: DtuModeModel = new DtuModeModel();
  showModalAdd(): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.addModel = new DtuModeModel();
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.tboxModel) || this.util.isNull(this.addModel.tboxFactoryId) || this.util.isNull(this.addModel.tboxFactoryName) ||
      this.util.isNull(this.addModel.contactorName) || this.util.isNull(this.addModel.contactorPhone) || this.util.isNull(this.addModel.tboxFactoryNote) ||
      this.util.isNull(this.addModel.tboxFactoryLicenceImg.fileName)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.http.uploadG6DocDtuMode(this.token, this.addModel).subscribe((data: G6DocResult) => {
      this.notification.info(data.message, null);
      if (data.type == 'success' && data.code == 200) {
        this.addModel.requestID = data.data.requestID;
        this.http.addG6DocDtuMode(this.addModel).subscribe((d: Result1) => {
          if (d.success) {
            this.isVisibleAdd = false;
            this.notification.success('备案信息本地保存成功', null);
            this.getData();
          } else {
            this.notification.error('备案信息本地保存失败', null);
          }
        });
      }
    });
  }
  beforeUpload1 = (file: UploadFile): boolean => {
    this.addModel.tboxFactoryLicenceImg.fileName = file.name;
    this.addModel.tboxFactoryLicenceImg.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.tboxFactoryLicenceImg.value = data;
    });
    return false;
  };
  beforeUpload2 = (file: UploadFile): boolean => {
    this.addModel.reportImg.fileName = file.name;
    this.addModel.reportImg.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.reportImg.value = data;
    });
    return false;
  };
  beforeUpload3 = (file: UploadFile): boolean => {
    this.addModel.tboxFile.fileName = file.name;
    this.addModel.tboxFile.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.tboxFile.value = data;
    });
    return false;
  };
  //#endregion
  
  //#region 结果查询
  check(e) {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.http.getG6DocDtuModeResult(this.token, e.requestID).subscribe((data: G6DocResult) => {
      if (data.type == 'success' && data.code == 200) {
        this.notification.info(data.data.retDetail, null);
      } else {
        this.notification.info(data.message, null);
      }
    });
  }
  //#endregion

}
