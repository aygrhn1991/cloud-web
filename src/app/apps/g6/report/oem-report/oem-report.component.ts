import { Component, OnInit } from '@angular/core';
import { G6ChartService } from 'src/app/services/g6/g6-chart.service';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { Result, Search } from 'src/app/models/result.model';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-oem-report',
  templateUrl: './oem-report.component.html',
  styleUrls: ['./oem-report.component.css']
})
export class OemReportComponent implements OnInit {
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
    this.http.g6Report12('-1', -1, this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD1);
        y1.push(e.DUR);
      });
      this.chart1Option = this.chartService.makeReportChart1('车速-时长', y1, x);
    })
    this.http.g6Report14('-1', -1, this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      let y2 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD1);
        y1.push(e.TOIL);
        y2.push(e.PER == -1 ? 3000 : e.PER);
      });
      this.chart2Option = this.chartService.makeReportChart2('车速-油耗', y1, y2, x);
    })
    this.http.g6Report13('-1', -1, this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      let y2 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD1);
        y1.push(e.MIL);
      });
      this.chart3Option = this.chartService.makeReportChart2('车速-里程', y1, y2, x);
    })
    this.http.g6Report15('-1', -1, this.dateStart, this.dateEnd).subscribe((data: Result) => {
      let x = [];
      let y1 = [];
      data.data.data.forEach(e => {
        x.push(e.C_SPD1);
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
    this.getData();
  }
  dc(e) {
    this.dateChange(this.time)
  }
}
