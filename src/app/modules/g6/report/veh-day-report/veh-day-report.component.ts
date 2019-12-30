import { Component, OnInit } from '@angular/core';
import { SearchModel, Result2 } from 'src/app/models/result.model';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
interface ItemData {
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}
@Component({
  selector: 'app-veh-day-report',
  templateUrl: './veh-day-report.component.html',
  styleUrls: ['./veh-day-report.component.css']
})
export class VehDayReportComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.reset();
    for (let i = 0; i < 100; i++) {
      this.dataList.push({
        name: 'a' + i,
        age: i + 1,
        street: 'b' + i,
        building: 'C' + i,
        number: 2035,
        companyAddress: 'd' + i,
        companyName: 'e' + i,
        gender: 'M' + i
      });
    }
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
    this.http.getG6EngData(this.util.parameterTransfer(this.searchModel.vid, -1),
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




}
