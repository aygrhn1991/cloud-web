import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { UtilService } from 'src/app/services/util.service';
import { G6DocResult } from 'src/app/models/result.model';
import { EngModeModel } from 'src/app/models/g6/g6doc/eng-mode.model';
import { VehModeModel } from 'src/app/models/g6/g6doc/veh-mode.model';
import { ChipModeModel } from 'src/app/models/g6/g6doc/chip-mode.model';
import { ChipPrefixModel } from 'src/app/models/g6/g6doc/chip-prefix.model';
import { DtuModeModel } from 'src/app/models/g6/g6doc/dtu-mode.model';
import { DtuAuthorityModel } from 'src/app/models/g6/g6doc/dtu-authority.model';
import { VehDocModel } from 'src/app/models/g6/g6doc/veh-doc.model';
import { G6DocHttpService } from 'src/app/services/g6/g6doc/g6-doc-http.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css']
})
export class ApiTestComponent implements OnInit {

  constructor(private http: G6DocHttpService,
    private notification: NzNotificationService,
    private util: UtilService) { }

  ngOnInit() { }

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

  //#region 接口列表
  apiOptions = [
    { label: '1.1 平台登录', value: '/api/v10/login', model: { username: null, password: null } },
    { label: '2.1 发动机型号备案', value: '/api/v10/insertVehicleEngine', model: { token: null, strEngine: new EngModeModel() } },
    { label: '3.1 车辆型号备案', value: '/api/v10/insertVehicleType', model: { token: null, strVehicleModel: new VehModeModel() } },
    { label: '4.1 芯片型号备案', value: '/api/v10/insertChipModel', model: { token: null, strChip: new ChipModeModel() } },
    { label: '4.2 芯片型号备案结果查询', value: '/api/v10/insertChipModelResult', model: { token: null, requestID: null } },
    { label: '4.3 已备案芯片型号查询', value: '/api/v10/getChipModel', model: { token: null, chipModel: null } },
    { label: '4.4 芯片型号标识符申请', value: '/api/v10/getChipPrefix', model: Object.assign(new ChipPrefixModel(), { token: null }) },
    { label: '4.5 芯片型号标识符申请结果查询', value: '/api/v10/getChipPrefixResult', model: { token: null, requestID: null } },
    { label: '5.1 车载终端型号备案', value: '/api/v10/insertTbox', model: { token: null, strTbox: new DtuModeModel() } },
    { label: '5.2 车载终端型号备案结果查询', value: '/api/v10/insertTboxModelResult', model: { token: null, requestID: null } },
    { label: '5.3 已备案车载终端型号查询', value: '/api/v10/getTboxModel', model: { token: null, tboxModel: null } },
    { label: '5.4 车载终端型号授权备案', value: '/api/v10/insertTboxModelAuthority', model: Object.assign(new DtuAuthorityModel(), { token: null }) },
    { label: '5.5 车载终端型号授权备案结果查询', value: '/api/v10/insertTboxModelAuthorityResult', model: { token: null, requestID: null } },
    { label: '6.1 更换终端信息备案', value: '/api/v10/changeTbox', model: { token: null, aaaaaaaaaaaa: null } },
    { label: '6.2 更换终端信息备案结果查询', value: '/api/v10/changeTboxResult', model: { token: null, aaaaaaaaaaaa: null } },
    { label: '7.1 车辆信息备案申请', value: '/api/v10/insertVehicle', model: { token: null, strVehicle: new VehDocModel() } },
    { label: '8.1 车辆状态查询', value: '/api/v10/vehicleStatus', model: { token: null, vin: null, type: null } },
  ];
  //#endregion

  //#region 调用api
  url: string = null;
  body: string = null;
  result: string = null;
  send() {
    if (this.util.isNull(this.url)) {
      this.notification.error('请选择或填写测试地址', null);
      return;
    }
    if (this.util.isNull(this.body)) {
      this.notification.error('请填写请求体信息', null);
      return;
    }
    let bodyObj = null;
    try {
      bodyObj = JSON.parse(this.body);
    } catch (error) {
      this.notification.error('请求体格式不是JSON格式', null);
      return;
    }
    this.http.uploadG6DocApiTest(this.url, JSON.stringify(bodyObj)).subscribe((data: G6DocResult) => {
      this.result = this.util.jsonFormatter(JSON.stringify(data));
    });
  }
  template() {
    if (this.util.isNull(this.url)) {
      this.notification.error('请选择或填写测试地址', null);
      return;
    }
    for (let i = 0; i < this.apiOptions.length; i++) {
      if (this.url == this.apiOptions[i].value) {
        this.body = this.util.jsonFormatter(JSON.stringify(this.apiOptions[i].model));
        return;
      }
    }
    this.notification.error('该url不存在模板', null);
  }
  //#endregion


}
