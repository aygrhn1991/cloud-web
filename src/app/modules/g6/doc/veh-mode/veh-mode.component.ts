import { Component, OnInit } from '@angular/core';
import { NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { G6DocResult, Result1 } from 'src/app/models/result.model';
import { UtilService } from 'src/app/services/util.service';
import { VehModeModel } from 'src/app/models/g6/g6doc/veh-mode.model';
import { G6DocHttpService } from 'src/app/services/g6/g6-http-doc.service';

@Component({
  selector: 'app-veh-mode',
  templateUrl: './veh-mode.component.html',
  styleUrls: ['./veh-mode.component.css']
})
export class VehModeComponent implements OnInit {

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
    this.http.getG6DocVehMode().subscribe((data: Result1) => {
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

  //#region 添加车辆型号
  isVisibleAdd: boolean = false;
  addModel: VehModeModel = new VehModeModel();
  showModalAdd(): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.addModel = new VehModeModel();
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.modelCn)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.http.addG6DocVehMode(this.addModel).subscribe((data: Result1) => {
      if (data.success) {
        this.http.uploadG6DocVehMode(this.token, this.addModel).subscribe((d: G6DocResult) => {
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
    this.addModel.detectionReport.fileName = file.name;
    this.addModel.detectionReport.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.detectionReport.value = data;
    });
    return false;
  };
  //#endregion

}
