import { Component, OnInit } from '@angular/core';
import { NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { UtilService } from 'src/app/services/util.service';
import { Result1, G6DocResult } from 'src/app/models/result.model';
import { ChipPrefixModel } from 'src/app/models/g6/g6doc/chip-prefix.model';
import { G6DocHttpService } from 'src/app/services/g6/g6-http-doc.service';

@Component({
  selector: 'app-chip-prefix',
  templateUrl: './chip-prefix.component.html',
  styleUrls: ['./chip-prefix.component.css']
})
export class ChipPrefixComponent implements OnInit {

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
    this.http.getG6DocChipPrefix().subscribe((data: Result1) => {
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

  //#region 添加芯片型号标识符申请
  isVisibleAdd: boolean = false;
  addModel: ChipPrefixModel = new ChipPrefixModel();
  showModalAdd(): void {
    if (!this.loginState) {
      this.notification.error('请先登录', null);
      return;
    }
    this.addModel = new ChipPrefixModel();
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.chipModelName) || this.util.isNull(this.addModel.contactorName) ||
      this.util.isNull(this.addModel.contactorPhone) || this.util.isNull(this.addModel.authorizeFile.fileName)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.http.uploadG6DocChipPrefix(this.token, this.addModel).subscribe((data: G6DocResult) => {
      this.notification.info(data.message, null);
      if (data.type == 'success' && data.code == 200) {
        this.addModel.requestID = data.data.requestID;
        this.http.addG6DocChipPrefix(this.addModel).subscribe((d: Result1) => {
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
  beforeUpload = (file: UploadFile): boolean => {
    this.addModel.authorizeFile.fileName = file.name;
    this.addModel.authorizeFile.type = file.type;
    this.util.fileToBase64(file).then((data: any) => {
      this.addModel.authorizeFile.value = data;
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
    this.http.getG6DocChipPrefixResult(this.token, e.requestID).subscribe((data: G6DocResult) => {
      if (data.type == 'success' && data.code == 200) {
        this.notification.info(data.data.retDetail, null);
      } else {
        this.notification.info(data.message, null);
      }
    });
  }
  //#endregion

}
