import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';
import { ConfigService } from '../config.service';
import { EngModeModel } from 'src/app/models/g6/g6doc/eng-mode.model';
import { VehModeModel } from 'src/app/models/g6/g6doc/veh-mode.model';
import { ChipModeModel } from 'src/app/models/g6/g6doc/chip-mode.model';
import { ChipPrefixModel } from 'src/app/models/g6/g6doc/chip-prefix.model';
import { DtuModeModel } from 'src/app/models/g6/g6doc/dtu-mode.model';
import { DtuAuthorityModel } from 'src/app/models/g6/g6doc/dtu-authority.model';
import { VehDocModel } from 'src/app/models/g6/g6doc/veh-doc.model';
import { VehModifyModel } from 'src/app/models/g6/g6doc/veh-modify.model';

@Injectable({
  providedIn: 'root'
})
export class G6DocHttpService {

  constructor(private http: HttpClient,
    private util: UtilService,
    private configService: ConfigService) {
  }

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
  //#endregion

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


}
