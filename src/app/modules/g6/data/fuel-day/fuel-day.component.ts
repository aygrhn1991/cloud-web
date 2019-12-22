import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { G6Service } from 'src/app/services/g6.service';
import { SearchModel, Result2 } from 'src/app/models/result.model';

@Component({
  selector: 'app-fuel-day',
  templateUrl: './fuel-day.component.html',
  styleUrls: ['./fuel-day.component.css']
})
export class FuelDayComponent implements OnInit {

  constructor(private http: HttpService,
    private util: UtilService,
    public g6Service: G6Service) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: SearchModel = new SearchModel();
  getData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.searchModel.pageNum = 1;
    }
    this.http.getG6FuelDay(this.util.parameterTransfer(this.searchModel.vid, -1),
      this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
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
    this.getData(true);
  }
  //#endregion

  //#region 单车odo里程明细
  isVisibleModal1: boolean = false;
  pageNumModal1: number = 1;
  dataListModal1: Array<any> = [];
  getDataModal1(e): void {
    this.http.getG6OdoMile(this.util.parameterTransfer(e.vid, -1),
      this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
        this.dataListModal1 = data.data;
      });
    this.pageNumModal1 = 1;
    this.isVisibleModal1 = true;
  }
  //#endregion
  export(){
    window.open(this.http.exportG6FuelDay(this.util.parameterTransfer(this.searchModel.vid, -1),
    this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()), '_blank');
  }
}
