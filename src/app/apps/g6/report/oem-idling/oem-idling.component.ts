import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Search, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-oem-idling',
  templateUrl: './oem-idling.component.html',
  styleUrls: ['./oem-idling.component.css']
})
export class OemIdlingComponent implements OnInit {
  dateStart: number = null;
  dateEnd: number = null;
  time: string = 'month';
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
  searchModel: any = new Search();
  getData(): void {
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report18('-1', -1, this.dateStart, this.dateEnd).subscribe((data: Result) => {
      this.loading = false;
      this.dataList = data.data.data;
    })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.dateStart = new Date();
    this.searchModel.dateEnd = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.dataList = [];
    this.dateChange(this.time);
  }
  //#endregion

  isVisibleFault: boolean = false;
  falutPageNum: number = 1;
  faultList: Array<any> = [];
  faultDecode(e): void {
    this.http.g6Report19(this.util.parameterTransfer(this.searchModel.vehm, -1), this.util.parameterTransfer(this.searchModel.xzqh, -1),
      this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result) => {
        this.faultList = data.data.data;
      });
    this.falutPageNum = 1;
    this.isVisibleFault = true;
  }
  dateChange(e) {
    if (e == 'year') {
      this.dateStart = this.util.getDayStart(this.util.getYearStartDay(this.searchModel.dateStart)).getTime();
      this.dateEnd = this.util.getDayEnd(this.util.getYearEndDay(this.searchModel.dateStart)).getTime();
    } else {
      this.dateStart = this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateEnd)).getTime();
      this.dateEnd = this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateEnd)).getTime();
    }
    this.getData();
  }
  dc(e) {
    this.dateChange(this.time)
  }

}
