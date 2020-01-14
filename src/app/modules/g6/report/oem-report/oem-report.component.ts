import { Component, OnInit } from '@angular/core';
import { G6ChartService } from 'src/app/services/g6/g6-chart.service';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';
import { UtilService } from 'src/app/services/util.service';
import { Result2 } from 'src/app/models/result.model';

@Component({
  selector: 'app-oem-report',
  templateUrl: './oem-report.component.html',
  styleUrls: ['./oem-report.component.css']
})
export class OemReportComponent implements OnInit {
  chart1Option: any;
  chart2Option: any;
  chart3Option: any;
  chart4Option: any;
  chart5Option: any;
  chart6Option: any;
  chart7Option: any;
  chart8Option: any;
  constructor(private chartService: G6ChartService,
    private http: G6HttpService,
    private util: UtilService) { }

  ngOnInit() {
    this.http.g6Report12('-1', -1,
      this.util.getDayStart(this.util.getMonthStartDay(new Date())).getTime(),
      this.util.getDayEnd(this.util.getMonthEndDay(new Date())).getTime()).subscribe((data: Result2) => {

        this.chartService.makeReportChart2(data, data, data);
      })
  }

}
