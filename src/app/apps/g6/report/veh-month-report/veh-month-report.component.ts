import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Search, Result } from 'src/app/models/result.model';
import { ChartService } from 'src/app/services/chart.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-veh-month-report',
  templateUrl: './veh-month-report.component.html',
  styleUrls: ['./veh-month-report.component.css']
})
export class VehMonthReportComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private chartService: ChartService) { }

  ngOnInit() {
    this.reset();
    console.log(this.util.getYearStartDay(this.util.stringToDate('2020-2-1')))
    console.log(this.util.getYearEndDay(this.util.stringToDate('2020-2-1')))
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
    this.http.g6Report4(this.util.parameterTransfer(this.searchModel.vid, -1),
    this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result) => {
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
    let y2 = [];
    let y3 = [];
    let y4 = [];
    // for(let i=0;i<30;i++){
    //   x.push((i+1)+'号');
    //   let base=this.util.getIntRandom(0,50);
    //   y1.push(base);
    //   y2.push(base*this.util.getIntRandom(80,120)/100*1.5);
    //   y3.push(base*this.util.getIntRandom(60,140)/100*2.5);
    //   y4.push(base*this.util.getIntRandom(80,120)/100*3.5);
    // }
    data.forEach(e => {
      x.push(e.DAY);
      y1.push(e.MIL);
      y2.push(e.OIL);
      y3.push(e.DUR*60);
      y4.push(e.SCRDOWN);
    });
    this.chartOption = this.chartService.makeReportChart4('车辆运行分析', y1, y2, y3, y4, x);
  }
}
