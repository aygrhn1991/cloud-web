import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';
import { G6Service } from 'src/app/services/g6.service';

@Component({
  selector: 'app-data-obd',
  templateUrl: './data-obd.component.html',
  styleUrls: ['./data-obd.component.css']
})
export class DataObdComponent implements OnInit {

  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    public g6Service: G6Service) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: SearchModel = new SearchModel();
  getData(reset: boolean = false): void {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    this.loading = true;
    if (reset) {
      this.searchModel.pageNum = 1;
    }
    this.http.getG6ObdData(this.util.parameterTransfer(this.searchModel.vid, -1),
      this.util.getDayStart(this.searchModel.dateStart).getTime(),
      this.util.getDayEnd(this.searchModel.dateStart).getTime()).subscribe((data: Result2) => {
        this.loading = false;
        this.dataList = data.data;
      })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.dateStart = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.dataList = [];
  }
  //#endregion

  //#region obd状态解析
  isVisibleObdState: boolean = false;
  obdStateDecode(e): void {
    this.g6Service.obdStateDecode(e.supportState, e.readyState);
    this.isVisibleObdState = true;
  }
  //#endregion

  //#region iupr解析
  isVisibleIupr: boolean = false;
  iuprDecode(e): void {
    this.g6Service.iuprDecode(e.iupr);
    this.isVisibleIupr = true;
  }
  //#endregion

  //#region 故障解析
  isVisibleFault: boolean = false;
  falutPageNum: number = 1;
  faultList: Array<any> = [];
  faultDecode(e): void {
    this.http.getG6FaultCodeByObdFaultArray(e.faultCodes.join(',')).subscribe((data: Result2) => {
      this.faultList = data.data;
    });
    this.falutPageNum = 1;
    this.isVisibleFault = true;
  }
  //#endregion


}
