import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { G6Service } from 'src/app/services/g6/g6.service';
import { Search, Result } from 'src/app/models/result.model';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';

@Component({
  selector: 'app-online-log',
  templateUrl: './online-log.component.html',
  styleUrls: ['./online-log.component.css']
})
export class OnlineLogComponent implements OnInit {

  form_flag='1';

  constructor(private http: G6HttpService,
    private util: UtilService,
    public g6Service: G6Service) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: Search = new Search();
  getData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.searchModel.pageNum = 1;
    }
    this.http.getG6OnlineLogSum(this.form_flag).subscribe((data: Result) => {
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

  //#region 单车上线明细
  isVisibleModal1: boolean = false;
  pageNumModal1: number = 1;
  dataListModal1: Array<any> = [];
  getDataModal1(e): void {
    this.http.getG6OdoMile(this.util.parameterTransfer(e.vin, -1),
      this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result) => {
        this.dataListModal1 = data.data;
      });
    this.pageNumModal1 = 1;
    this.isVisibleModal1 = true;
  }
  //#endregion

}
