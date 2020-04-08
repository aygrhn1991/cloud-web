import { Component, OnInit } from '@angular/core';
import { Search, Result } from 'src/app/models/result.model';
import { ChartService } from 'src/app/services/chart.service';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-veh-report',
  templateUrl: './veh-report.component.html',
  styleUrls: ['./veh-report.component.css']
})
export class VehReportComponent implements OnInit {

  dateStart: number = null;
  dateEnd: number = null;
  searchModel: Search = new Search();
  time: string = 'month';
  chart1Option: any;
  chart2Option: any;
  chart3Option: any;
  chart4Option: any;
  chart5Option: any;
  chart6Option: any;
  chart7Option: any;
  chart8Option: any;
  constructor(private chartService: ChartService,
    private http: G6HttpService,
    private notification: NzNotificationService,
    private util: UtilService) { }

  ngOnInit() {
    this.reset();
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.dateStart = new Date();
    this.searchModel.dateEnd = new Date();
    this.dateChange(this.time);
  }
  getData() {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    if (this.time == 'month') {
      this.http.g6Report4(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
        let x = [];
        let y1 = [];
        let y2 = [];
        let y3 = [];
        let y4 = [];
        data.data.data.forEach(e => {
          x.push(e.DAY);
          y1.push(e.MIL);
          y2.push(e.OIL);
          y3.push(e.DUR * 60);
          y4.push(e.SCRDOWN);
        });
        this.chart1Option = this.chartService.makeReportChart4('车辆运行分析', y1, y2, y3, y4, x);
      })
      this.http.g6Report6(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
        let x = [];
        let y1 = [];
        let y2 = [];
        let y3 = [];
        let y4 = [];
        data.data.data.forEach(e => {
          x.push(e.DAY);
          y1.push(e.DUR);
          y2.push(e.OIL);
          y3.push(e.SCRDOWN == null ? 0 : e.SCRDOWN);
          y4.push(0);
        });
        this.chart2Option = this.chartService.makeReportChart4('怠速停车', y1, y2, y3, y4, x);
      })
    }else{
      this.http.g6Report5(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
        let x = [];
        let y1 = [];
        let y2 = [];
        let y3 = [];
        let y4 = [];
        data.data.data.forEach(e => {
          x.push(e.DAY);
          y1.push(e.MIL);
          y2.push(e.OIL);
          y3.push(e.DUR * 60);
          y4.push(e.SCRDOWN);
        });
        this.chart1Option = this.chartService.makeReportChart4('车辆运行分析', y1, y2, y3, y4, x);
      })
      this.http.g6Report7(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
        let x = [];
        let y1 = [];
        let y2 = [];
        let y3 = [];
        let y4 = [];
        data.data.data.forEach(e => {
          x.push(e.DAY);
          y1.push(e.DUR);
          y2.push(e.OIL);
          y3.push(e.SCRDOWN == null ? 0 : e.SCRDOWN);
          y4.push(0);
        });
        this.chart2Option = this.chartService.makeReportChart4('怠速停车', y1, y2, y3, y4, x);
      })
    }
    this.http.g6Report8(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD);
        y1.push(e.OIL);
      });
      this.chart3Option = this.chartService.makeReportChart1('车速-油耗', y1, x);
    })
    this.http.g6Report10(this.util.parameterTransfer(this.searchModel.vid, -1), this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD);
        y1.push(e.NOX);
      });
      this.chart4Option = this.chartService.makeReportChart1('车速-排放', y1, x);
    })
  }
  dateChange(e) {
    if (e == 'year') {
      this.dateStart = this.util.getDayStart(this.util.getYearStartDay(this.searchModel.dateStart)).getTime();
      this.dateEnd = this.util.getDayEnd(this.util.getYearEndDay(this.searchModel.dateStart)).getTime();
    } else {
      this.dateStart = this.util.getDayStart(this.util.getMonthStartDay(this.searchModel.dateEnd)).getTime();
      this.dateEnd = this.util.getDayEnd(this.util.getMonthEndDay(this.searchModel.dateEnd)).getTime();
    }
  }
  dc(e) {
    this.dateChange(this.time)
  }
}
