import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { ChartService } from 'src/app/services/chart.service';
import { Search, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-veh-speed-fuel-year',
  templateUrl: './veh-speed-fuel-year.component.html',
  styleUrls: ['./veh-speed-fuel-year.component.css']
})
export class VehSpeedFuelYearComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private chartService: ChartService) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: Search = new Search();
  getData(): void {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report8(this.util.parameterTransfer(this.searchModel.vid, -1),
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
  }
  //#endregion

  chartOption: any;
  makeChartData(data) {
    let x = [];
    let y1 = [];
    // for(let i=0;i<12;i++){
    //   x.push((i+1)+'月');
    //   let base=this.util.getIntRandom(0,50);
    //   y1.push(base);
    // }
    data.forEach(e => {
      x.push(e.C_SPD);
      y1.push(e.OIL);
    });
    this.chartOption = this.chartService.makeReportChart1('车速-油耗', y1, x);
  }

}
