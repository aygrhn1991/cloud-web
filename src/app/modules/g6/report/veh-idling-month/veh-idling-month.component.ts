import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';

@Component({
  selector: 'app-veh-idling-month',
  templateUrl: './veh-idling-month.component.html',
  styleUrls: ['./veh-idling-month.component.css']
})
export class VehIdlingMonthComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: SearchModel = new SearchModel();
  getData(): void {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report6(this.util.parameterTransfer(this.searchModel.vid, -1),
    this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
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
  }
  //#endregion

}
