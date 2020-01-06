import { Component, OnInit } from '@angular/core';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-oem-speed-mile',
  templateUrl: './oem-speed-mile.component.html',
  styleUrls: ['./oem-speed-mile.component.css']
})
export class OemSpeedMileComponent implements OnInit {

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
  searchModel: any = new SearchModel();
  getData(): void {
    this.loading = true;
    this.searchModel.pageNum = 1;
    this.http.g6Report13(this.util.parameterTransfer(this.searchModel.vehm, -1), this.util.parameterTransfer(this.searchModel.xzqh, -1),
    this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateStart)).getTime(),
    this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateStart)).getTime()).subscribe((data: Result2) => {
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
    // for(let i=0;i<12;i++){
    //   x.push((i+1)+'月');
    //   let base=this.util.getIntRandom(0,50);
    //   y1.push(base);
    // }
    data.forEach(e => {
      x.push(e.C_SPD1);
      y1.push(e.MIL);
    });
    this.chartOption = this.chartService.makeReportChart2('车速-里程', y1, x);
  }
}
