import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';
import { ConfigService } from '../config.service';
import { HttpService } from '../http.service';
import { FaultModel } from 'src/app/models/fault.model';
import { Result2 } from 'src/app/models/result.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class G6HttpService {

  constructor(private http: HttpClient) {  }

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
    return this.http.get(`/report/odoCtrl/statVehMonthOdo/${vid}/${dateStart}/${dateEnd}`);
  }
  getG6OdoMile(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/odoCtrl/queryVehMonthOdo/${vid}/${dateStart}/${dateEnd}`);
  }
  getG6OnlineLogSum(flag: any) {
    return this.http.get('/report/dtuOnlineCtrl/statDtuOnline/' + flag);
  }
  getG6Online() {
    return this.http.get('/bgdata/bigDataDetailCtrl/queryEngineDataDetail/10002460/1572796800000/1572883199999');
  }
  getG6FuelMonth(dateStart: number, dateEnd: number) {
    return this.http.get(`/report/statCtrl/statVehMonthDataArea/${dateStart}/${dateEnd}`);
  }
  getG6FuelDay(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/statCtrl/queryVehDayOil/${vid}/${dateStart}/${dateEnd}`);
  }
  exportG6FuelMonth(dateStart: number, dateEnd: number) {
    return `/report/statCtrl/exportMonthOil/${dateStart}/${dateEnd}`;
  }
  exportG6FuelDay(vid: number, dateStart: number, dateEnd: number) {
    return `/report/statCtrl/exportDayOil/${vid}/${dateStart}/${dateEnd}`;
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
  getG6FaultCodeByObdFaultArray(fault: string) {
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

  //#region 车辆报告
  g6Report1(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryVehDayData/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report2(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryVehSpdData/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report3(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryFcDay/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report4(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryRunDataByMonth/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report5(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryRunDataByYear/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report6(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryIdlingByMonth/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report7(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryIdlingByYear/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report8(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/querySpdOil/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report9(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/querySpdOil100/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report10(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/querySpdNox/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report11(vid: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/querySpdNox100/${vid}/${dateStart}/${dateEnd}`);
  }
  g6Report12(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statSpdRunTime/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report13(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statSpdMil/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report14(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statSpdOil/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report15(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statSpdNox/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report16(vid: number, vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryWorkDetail/${vid}/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report17(vehm: string, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statWork/${vehm}/${dateStart}/${dateEnd}`);
  }
  g6Report18(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statIdlingData/${vehm}/${xzqh}/${dateStart}/${dateEnd}`);
  }
  g6Report19(vehm: string, xzqh: number, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/queryIdlingVehsByVehm/${vehm}/${dateStart}/${dateEnd}`);
  }
  g6Report20(vehm: string, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statFc/${vehm}/${dateStart}/${dateEnd}`);
  }
  g6Report21(vehm: string, dateStart: number, dateEnd: number) {
    return this.http.get(`/report/report/reportCtrl/statAvg100/${vehm}/${dateStart}/${dateEnd}`);
  }
  ///
  
  //#endregion
}
