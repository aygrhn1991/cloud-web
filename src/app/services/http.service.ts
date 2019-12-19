import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Result2 } from '../models/result.model';
import { FaultModel } from '../models/fault.model';
import { EngModeModel } from '../models/g6/g6doc/eng-mode.model';
import { VehModeModel } from '../models/g6/g6doc/veh-mode.model';
import { ChipModeModel } from '../models/g6/g6doc/chip-mode.model';
import { DtuModeModel } from '../models/g6/g6doc/dtu-mode.model';
import { VehDocModel } from '../models/g6/g6doc/veh-doc.model';
import { ChipPrefixModel } from '../models/g6/g6doc/chip-prefix.model';
import { DtuAuthorityModel } from '../models/g6/g6doc/dtu-authority.model';
import { UtilService } from './util.service';
import { VehModifyModel } from '../models/g6/g6doc/veh-modify.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
    private util: UtilService,
    private configService: ConfigService) { }

  //#region 登录，获取access_url
  login(account: string, password: string) {
    return this.http.post('/sec/authc/login', { acc: account, pwd: password });
  }
  getPages() {
    return of(new Result2());
  }
  getUser() {
    return this.http.get('/sec/authc/loadUser');
  }
  //#endregion

  //#region 平台首页
  getDashBoardByMonth() {
    return this.http.get(`/report/report/homeCtrl/queryHomeData`);
  }
  getDashBoardByPlatform() {
    return this.http.get(`/report/report/homeCtrl/statPlatVehNum`);
  }
  getDashBoardOnline() {
    return this.http.get(`/report/report/homeCtrl/statOnlineVehNum`);
  }
  getDashBoardMap() {
    return this.http.get(`/report/report/homeCtrl/statVehByXzqh`);
  }
  getDashBoardOnline7Day() {
    return this.http.get(`/report/report/homeCtrl/queryOnlineVeh`);
  }
  //#endregion

  //#region ----------g6----------
  //#region g6车辆管理
  getG6Veh(pageNum: number, pageSize: number, vid: number, vehNo: string, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, engCode: string, dateStart: number, dateEnd: number) {
    return this.http.get(`/basic/g6/basic/veh/getVeh/${pageNum}/${pageSize}/${vid}/${vehNo}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${engCode}/${dateStart}/${dateEnd}`);
  }
  addG6Veh(vin: string, vehNo: string, vehNoColor: number, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, engCode: string, remark: string) {
    return this.http.get(`/basic/g6/basic/veh/addVeh/${vin}/${vehNo}/${vehNoColor}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${engCode}/${remark}`);
  }
  editG6Veh(vid: number, vehNo: string, vehNoColor: number, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, engCode: string, remark: string) {
    return this.http.get(`/basic/g6/basic/veh/editVeh/${vid}/${vehNo}/${vehNoColor}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${engCode}/${remark}`);
  }
  deleteG6Veh(vid: number) {
    return this.http.get(`/basic/g6/basic/veh/deleteVeh/${vid}`);
  }
  exportG6Veh(): string {
    return '/basic/g6/basic/veh/exportVeh';
  }
  importG6VehTemplateDownload(): string {
    return '/basic/g6/basic/veh/importVehTemplateDownload';
  }
  importG6VehSimpleTemplateDownload(): string {
    return '/basic/g6/basic/veh/importVehSimpleTemplateDownload';
  }
  importG6File(): string {
    return '/basic/g6/basic/veh/importFile';
  }
  importG6Veh(formData: FormData) {
    return this.http.post('/basic/g6/basic/veh/importVeh', formData);
  }
  //#endregion

  //#region g6数据查询
  getG6EngData(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/bgdata/bigDataDetailCtrl/queryEngineDataDetail/${vid}/${dateStart}/${dateEnd}`);
  }
  getG6ObdData(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/bgdata/bigDataDetailCtrl/queryObdDataDetail/${vid}/${dateStart}/${dateEnd}`);
  }
  getG6OdoMileSum(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get('/bgdata/bigDataDetailCtrl/queryEngineDataDetail/10002460/1572796800000/1572883199999');
  }
  getG6OdoMile(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get('/bgdata/bigDataDetailCtrl/queryEngineDataDetail/10002460/1572796800000/1572883199999');
  }
  getG6OnlineLogSum(vid: number) {
    return this.http.get('/bgdata/bigDataDetailCtrl/queryEngineDataDetail/10002460/1572796800000/1572883199999');
  }
  getG6Online(vid: number) {
    return this.http.get('/bgdata/bigDataDetailCtrl/queryEngineDataDetail/10002460/1572796800000/1572883199999');
  }
  //#endregion

  //#region g6任务下载
  getG6Task(vid: number, beginDt: number, endDt: number, state: number) {
    return this.http.get('/report/report/task/loadG6Task/' + vid + '/' + beginDt + '/' + endDt + '/' + state);
  }
  addG6Task(options: any) {
    return this.http.post('/report/report/task/saveG6Task', options);
  }
  //#endregion

  //#region g6故障码查询 在obd数据查询页面点击故障码数量时进行的查询
  getG6FaultCodeByObdFaultArray(faults: string) {
    let f1 = new FaultModel();
    f1.code = '11111';
    f1.name = '故障1';
    let f2 = new FaultModel();
    f2.code = '22222';
    f2.name = '故障2';
    let r = new Result2();
    r.data = [f1, f2, f1, f2, f1, f2, f1, f2];
    return of(r);
  }
  //#endregion

  //#region g6备案
  g6DocLogin(username: string, password: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/login', { username: username, password: password });
  }
  uploadG6DocApiTest(url: string, data: any) {
    return this.http.post(this.util.startWith(url, 'http') ? url : (this.configService.config.g6_doc_api_host + url), data);
  }
  getG6DocVehState(token: string, vin: string, type: number) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, vin: vin, type: type });
  }
  editG6DocVehState(vid: number, type: number, state: number) {
    return this.http.get(`/g6doc/g6doc/editVehState/${vid}/${type}/${state}`);
  }
  sendG6DocCmd(msgid: number) {
    return this.http.get(`/g6doc/g6doc/cmd/${msgid}`);
  }
  //#region g6备案-发动机型号
  addG6DocEngMode(model: EngModeModel) {
    return this.http.post('/g6doc/g6doc/addEngMode', model);
  }
  getG6DocEngMode() {
    return this.http.get('/g6doc/g6doc/getEngMode');
  }
  uploadG6DocEngMode(token: string, model: EngModeModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, strEngine: model });
  }
  //#endregion
  //#region g6备案-车辆型号
  addG6DocVehMode(model: VehModeModel) {
    return this.http.post('/g6doc/g6doc/addVehMode', model);
  }
  getG6DocVehMode() {
    return this.http.get('/g6doc/g6doc/getVehMode');
  }
  uploadG6DocVehMode(token: string, model: VehModeModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, strVehicleModel: model });
  }
  //#endregion
  //#region g6备案-芯片型号
  addG6DocChipMode(model: ChipModeModel) {
    return this.http.post('/g6doc/g6doc/addChipMode', model);
  }
  getG6DocChipMode() {
    return this.http.get('/g6doc/g6doc/getChipMode');
  }
  uploadG6DocChipMode(token: string, model: ChipModeModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, strChip: model });
  }
  getG6DocChipModeResult(token: string, requestID: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, requestID: requestID });
  }
  //#endregion
  //#region g6备案-芯片标识符
  addG6DocChipPrefix(model: ChipPrefixModel) {
    return this.http.post('/g6doc/g6doc/addChipPrefix', model);
  }
  getG6DocChipPrefix() {
    return this.http.get('/g6doc/g6doc/getChipPrefix');
  }
  uploadG6DocChipPrefix(token: string, model: ChipPrefixModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', Object.assign(model, { token: token }));
  }
  getG6DocChipPrefixResult(token: string, requestID: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, requestID: requestID });
  }
  //#endregion
  //#region g6备案-终端型号
  addG6DocDtuMode(model: DtuModeModel) {
    return this.http.post('/g6doc/g6doc/addDtuMode', model);
  }
  getG6DocDtuMode() {
    return this.http.get('/g6doc/g6doc/getDtuMode');
  }
  uploadG6DocDtuMode(token: string, model: DtuModeModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, strTbox: model });
  }
  getG6DocDtuModeResult(token: string, requestID: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, requestID: requestID });
  }
  //#endregion
  //#region g6备案-终端授权
  addG6DocDtuAuthority(model: DtuAuthorityModel) {
    return this.http.post('/g6doc/g6doc/addDtuAuthority', model);
  }
  getG6DocDtuAuthority() {
    return this.http.get('/g6doc/g6doc/getDtuAuthority');
  }
  uploadG6DocDtuAuthority(token: string, model: DtuAuthorityModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', Object.assign(model, { token: token }));
  }
  getG6DocDtuAuthorityResult(token: string, requestID: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, requestID: requestID });
  }
  //#endregion
  //#region g6备案-车辆备案
  addG6DocVeh(vid: number, model: VehDocModel) {
    return this.http.post(`/g6doc/g6doc/addVeh/${vid}`, model);
  }
  getG6DocVeh() {
    return this.http.get('/g6doc/g6doc/getVeh');
  }
  uploadG6DocVeh(token: string, model: VehDocModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, strVehicle: model });
  }
  //#region g6备案-更换终端
  editG6DocVeh(model: VehModifyModel) {
    return this.http.post(`/g6doc/g6doc/editVeh`, model);
  }
  uploadG6DocVehEdit(token: string, model: VehModifyModel) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, changeData: model });
  }
  getG6DocVehEditResult(token: string, requestID: string) {
    return this.http.post(this.configService.config.g6_doc_api_host + '/api/v10/handle', { token: token, requestID: requestID });
  }
  //#endregion
  //#endregion
  //#endregion  
  //#endregion ----------g6----------

  //#region ----------tbox----------
  //#region tbox车辆管理
  getTBoxVeh(pageNum: number, pageSize: number, vid: number, vehNo: string, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, dtuType: string, manu: string, dateStart: number, dateEnd: number) {
    return this.http.get(`/basic/tbox/basic/veh/getVeh/${pageNum}/${pageSize}/${vid}/${vehNo}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${dtuType}/${manu}/${dateStart}/${dateEnd}`);
  }
  addTBoxVeh(vin: string, vehNo: string, vehNoColor: number, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, dtuType: string, manu: string, key: string, iv: string, remark: string) {
    return this.http.get(`/basic/tbox/basic/veh/addVeh/${vin}/${vehNo}/${vehNoColor}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${dtuType}/${manu}/${key}/${iv}/${remark}`);
  }
  editTBoxVeh(vid: number, vehNo: string, vehNoColor: number, xzqh: string, power: number, vehMode: string, simCode: string, dtuCode: string, dtuType: string, manu: string, key: string, iv: string, remark: string) {
    return this.http.get(`/basic/tbox/basic/veh/editVeh/${vid}/${vehNo}/${vehNoColor}/${xzqh}/${power}/${vehMode}/${simCode}/${dtuCode}/${dtuType}/${manu}/${key}/${iv}/${remark}`);
  }
  deleteTBoxVeh(vid: number) {
    return this.http.get(`/basic/tbox/basic/veh/deleteVeh/${vid}`);
  }
  exportTBoxVeh(): string {
    return '/basic/tbox/basic/veh/exportVeh';
  }
  importTBoxVehTemplateDownload(): string {
    return '/basic/tbox/basic/veh/importVehTemplateDownload';
  }
  importTBoxVehSimpleTemplateDownload(): string {
    return '/basic/tbox/basic/veh/importVehSimpleTemplateDownload';
  }
  importTBoxFile(): string {
    return '/basic/tbox/basic/veh/importFile';
  }
  importTBoxVeh(formData: FormData) {
    return this.http.post('/basic/tbox/basic/veh/importVeh', formData);
  }
  //#endregion
  //#endregion ----------tbox----------

  //#region 设备检测g6
  startG6Testing(clientId: string, vid: number) {
    return this.http.get(`/g6testing/beat/${clientId}/${vid}`);
  }
  //#endregion


  /////////////////////////////////
  //车辆型号管理
  queryVehm(model: String, oemid: number) {
    return this.http.get('/iov/iov/vehmCtrl/queryVehm/' + model + '/' + oemid);
  }
  addVehm(options: any) {
    return this.http.post('/iov/iov/vehmCtrl/addVehm', options);
  }
  updateVehm(options: any) {
    return this.http.post('/iov/iov/vehmCtrl/updateVehm', options);
  }
  deleteVehm(model: String) {
    return this.http.get('/iov/iov/vehmCtrl/deleteVehm/' + model);
  }

  //制造商管理
  queryDtumanu(name: String) {
    return this.http.get('/iov/iov/dtuManuCtrl/queryDtumanu/' + name);
  }
  addDtumanu(options: any) {
    return this.http.post('/iov/iov/dtuManuCtrl/addDtumanu', options);
  }
  updateDtumanu(options: any) {
    return this.http.post('/iov/iov/dtuManuCtrl/updateDtumanu', options);
  }
  deleteDtumanu(id: String) {
    return this.http.get('/iov/iov/dtuManuCtrl/deleteDtumanu/' + id);
  }

  //用户管理
  queryUsers(name: String) {
    return this.http.get('/sec/sec/user/loadUsers/' + name);
  }
  addUser(options: any) {
    return this.http.post('/sec/sec/user/saveUser', options);
  }
  updateUser(options: any) {
    return this.http.post('/sec/sec/user/updateUser', options);
  }
  updateUserStatus(id: number, status: number) {
    return this.http.get('/sec/sec/user/updateUserStatus/' + id + '/' + status);
  }
  loadAllRoles() {
    return this.http.get('/sec/sec/user/loadAllRoles');
  }
  findUserRoles(uid: number) {
    return this.http.get('/sec/sec/user/findUserRoles/' + uid);
  }

  //角色管理
  loadRoles() {
    return this.http.get('/sec/sec/role/loadRoles');
  }
  saveRole(options: any) {
    return this.http.post('/sec/sec/role/saveRole', options);
  }
  delRole(id: number) {
    return this.http.get('/sec/sec/role/delRole/' + id);
  }

  //档案
  queryNowDocVeh(vid: number) {
    return this.http.get('/iov/iov/doc/queryNowDocVeh/' + vid);
  }
  queryVehException(vid: number, yyyy: number) {
    return this.http.get('/iov/iov/doc/queryVehException/' + vid + '/' + yyyy);
  }



  //tbox任务下载
  loadTboxTask(vin: String, beginDt: number, endDt: number, state: number) {
    return this.http.get('/report/report/task/loadTboxTask/' + vin + '/' + beginDt + '/' + endDt + '/' + state);
  }
  saveTboxTask(options: any) {
    return this.http.post('/report/report/task/saveTboxTask', options);
  }
}
