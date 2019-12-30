import { Component, OnInit } from '@angular/core';
import { G6DocResult, Result1 } from 'src/app/models/result.model';
import { NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { EngModeModel } from 'src/app/models/g6/g6doc/eng-mode.model';
import { UtilService } from 'src/app/services/util.service';
import { G6DocHttpService } from 'src/app/services/g6/g6doc/g6-doc-http.service';

@Component({
  selector: 'app-eng-mode',
  templateUrl: './eng-mode.component.html',
  styleUrls: ['./eng-mode.component.css']
})
export class EngModeComponent implements OnInit {

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
    this.http.getG6DocEngMode().subscribe((data: Result1) => {
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

  //#region 添加发动机型号
  isVisibleAdd: boolean = false;
  addModel: EngModeModel = new EngModeModel();
  showModalAdd(): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.addModel = new EngModeModel();
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.engineModel)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.http.addG6DocEngMode(this.addModel).subscribe((data: Result1) => {
      if (data.success) {
        this.http.uploadG6DocEngMode(this.token, this.addModel).subscribe((d: G6DocResult) => {
          this.notification.info(d.message, null);
          this.isVisibleAdd = false;
          this.getData();
        });
      } else {
        this.notification.error('备案信息本地保存失败', null);
      }
    })
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.addModel.obdInterfacePhoto.fileName = file.name;
    this.addModel.obdInterfacePhoto.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.obdInterfacePhoto.value = data;
    });
    return false;
  };
  //#endregion

}
