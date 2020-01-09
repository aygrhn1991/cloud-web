import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Result2 } from '../models/result.model';
import { UtilService } from './util.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //#region 登录，获取access_url
  login(platform: number, account: string, password: string) {
    return this.http.post('/sec/authc/login', { plat: platform, acc: account, pwd: password });
  }
  getPages() {
    return of(new Result2());
  }
  getUser() {
    return this.http.get('/sec/authc/loadUser');
  }
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post('/sec/authc/changePassword', { oldPassword: oldPassword, newPassword: newPassword });
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
    return this.http.get(`/g6testing/g6testing/beat/${clientId}/${vid}`);
  }
  getG6VehInfo(vid: number) {
    return this.http.get(`/g6testing/g6testing/getVehInfo/${vid}`);
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
