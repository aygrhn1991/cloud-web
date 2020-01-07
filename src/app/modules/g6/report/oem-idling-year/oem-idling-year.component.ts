import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';

@Component({
  selector: 'app-oem-idling-year',
  templateUrl: './oem-idling-year.component.html',
  styleUrls: ['./oem-idling-year.component.css']
})
export class OemIdlingYearComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.searchModel = Object.assign(this.searchModel, { vehm: null, xzqh: null });
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: any = new SearchModel();
  getData(): void {
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report18(this.util.parameterTransfer(this.searchModel.vehm, -1), this.util.parameterTransfer(this.searchModel.xzqh, -1),
      this.util.getDayStart(this.util.getYearStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getYearEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
        this.loading = false;
        this.dataList = data.data.data;
      })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.dateStart = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.dataList = [];
    this.getData();
  }
  //#endregion
  isVisibleFault: boolean = false;
  falutPageNum: number = 1;
  faultList: Array<any> = [];
  faultDecode(e): void {
    this.http.g6Report19(this.util.parameterTransfer(this.searchModel.vehm, -1), this.util.parameterTransfer(this.searchModel.xzqh, -1),
    this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
      this.faultList = data.data.data;
    });
    this.falutPageNum = 1;
    this.isVisibleFault = true;
  }
}
