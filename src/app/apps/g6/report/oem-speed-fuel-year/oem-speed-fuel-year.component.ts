import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { ChartService } from 'src/app/services/chart.service';
import { Search, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-oem-speed-fuel-year',
  templateUrl: './oem-speed-fuel-year.component.html',
  styleUrls: ['./oem-speed-fuel-year.component.css']
})
export class OemSpeedFuelYearComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private chartService: ChartService) { }

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
    this.http.g6Report14(this.util.parameterTransfer(this.searchModel.vehm, -1), this.util.parameterTransfer(this.searchModel.xzqh, -1),
      this.util.getDayStart(this.util.getYearStartDay(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(this.util.getYearEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result) => {
        this.loading = false;
        this.dataList = data.data.data;
        this.makeChartData(data.data.data);
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
  chartOption: any;
  makeChartData(data) {
    let x = [];
    let y1 = [];
    let y2 = [];
    // for(let i=0;i<12;i++){
    //   x.push((i+1)+'月');
    //   let base=this.util.getIntRandom(0,50);
    //   y1.push(base);
    // }
    data.forEach(e => {
      x.push(e.C_SPD1);
      y1.push(e.TOIL);
      y2.push(e.PER==-1?3000:e.PER);
    });
    this.chartOption = this.chartService.makeReportChart2('车速-油耗', y1, y2, x);
  }

}
