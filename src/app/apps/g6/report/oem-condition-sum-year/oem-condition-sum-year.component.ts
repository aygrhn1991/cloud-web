import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Search, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-oem-condition-sum-year',
  templateUrl: './oem-condition-sum-year.component.html',
  styleUrls: ['./oem-condition-sum-year.component.css']
})
export class OemConditionSumYearComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.searchModel = Object.assign(this.searchModel, { vehm: null });
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: any = new Search();
  getData(): void {
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report17( this.util.parameterTransfer(this.searchModel.vehm, -1), 
    this.util.getDayStart(this.util.getYearStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getYearEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result) => {
        this.loading = false;
        this.dataList = data.data.data;
      })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.vehm=null;
    this.searchModel.dateStart = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.dataList = [];
    this.getData();
  }
  //#endregion

}
