import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { ChartService } from 'src/app/services/chart.service';
import { HttpService } from 'src/app/services/http.service';
import { Result2 } from 'src/app/models/result.model';
import { CommonService } from 'src/app/services/common.service';
import { PlatformModel } from 'src/app/models/common.model';
import { Platform } from 'src/app/enums/platform.enum';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  activeMapOptions = this.commonService.platformOptions;
  activeMap: PlatformModel = this.commonService.platformOptions[0];

  chart0: any;
  chart0Option: any;
  chart1Option: any;
  chart2Option: any;
  chart3Option: any;
  chart4Option: any;
  chart5Option: any;
  chart6Option: any;
  chart7Option: any;
  chart8Option: any;
  chart9Option: any;
  chart10Option: any;
  chart11Option: any;

  map_g6_bar_x = [];
  map_tbox_bar_x = [];
  map_ne_bar_x = [];
  map_g6_bar_y = [];
  map_tbox_bar_y = [];
  map_ne_bar_y = [];
  map_g6_map = [];
  map_tbox_map = [];
  map_ne_map = [];

  constructor(private http0: HttpClient,
    private chartService: ChartService,
    private http: HttpService,
    private commonService: CommonService,
    private util: UtilService) { }

  ngOnInit() {
    this.http.getDashBoardByMonth().subscribe((data: Result2) => {
      let org_g6 = data.data.data.filter(e => { return e.C_PLAT == Platform.g6 });
      let org_tbox = data.data.data.filter(e => { return e.C_PLAT == Platform.tbox });
      let org_ne = data.data.data.filter(e => { return e.C_PLAT == Platform.ne });
      let chart1_g6_y = [];
      let chart1_tbox_y = [];
      let chart1_ne_y = [];
      let chart2_g6_y = [];
      let chart2_tbox_y = [];
      let chart2_ne_y = [];
      let chart3_g6_y = [];
      let chart3_tbox_y = [];
      let chart3_ne_y = [];
      let chart4_g6_y = [];
      let chart4_tbox_y = [];
      let chart4_ne_y = [];
      let chart10_g6_line_y = [];
      let chart10_g6_bar_y = [];
      let chart10_g6_bar_y_sum = [];
      let chart10_tbox_line_y = [];
      let chart10_tbox_bar_y = [];
      let chart10_tbox_bar_y_sum = [];
      let chart10_ne_line_y = [];
      let chart10_ne_bar_y = [];
      let chart10_ne_bar_y_sum = [];
      for (let i = 0; i < 12; i++) {
        if (org_g6.length > i) {
          chart1_g6_y.push(org_g6[i].C_VEHNUM);
          chart2_g6_y.push(org_g6[i].C_MIL);
          chart3_g6_y.push(org_g6[i].C_FC);
          chart4_g6_y.push(org_g6[i].C_RECNUM);
          chart10_g6_bar_y.push(org_g6[i].C_FAULTNUM);
          chart10_g6_bar_y_sum.push(org_g6[i].C_TNUM - org_g6[i].C_FAULTNUM);
          chart10_g6_line_y.push((org_g6[i].C_FAULTNUM / org_g6[i].C_TNUM * 100).toFixed(2));
        } else {
          chart1_g6_y.push(0);
          chart2_g6_y.push(0);
          chart3_g6_y.push(0);
          chart4_g6_y.push(0);
          chart10_g6_bar_y.push(0);
          chart10_g6_bar_y_sum.push(0);
          chart10_g6_line_y.push(0);
        }
        if (org_tbox.length > i) {
          chart1_tbox_y.push(org_tbox[i].C_VEHNUM);
          chart2_tbox_y.push(org_tbox[i].C_MIL);
          chart3_tbox_y.push(org_tbox[i].C_FC);
          chart4_tbox_y.push(org_tbox[i].C_RECNUM);
          chart10_tbox_bar_y.push(org_tbox[i].C_FAULTNUM);
          chart10_tbox_bar_y_sum.push(org_tbox[i].C_TNUM - org_tbox[i].C_FAULTNUM);
          chart10_tbox_line_y.push((org_tbox[i].C_FAULTNUM / org_tbox[i].C_TNUM * 100).toFixed(2));
        } else {
          chart1_tbox_y.push(0);
          chart2_tbox_y.push(0);
          chart3_tbox_y.push(0);
          chart4_tbox_y.push(0);
          chart10_tbox_bar_y.push(0);
          chart10_tbox_bar_y_sum.push(0);
          chart10_tbox_line_y.push(0);
        }
        if (org_ne.length > i) {
          chart1_ne_y.push(org_ne[i].C_VEHNUM);
          chart2_ne_y.push(org_ne[i].C_MIL);
          chart3_ne_y.push(org_ne[i].C_FC);
          chart4_ne_y.push(org_ne[i].C_RECNUM);
          chart10_ne_bar_y.push(org_ne[i].C_FAULTNUM);
          chart10_ne_bar_y_sum.push(org_ne[i].C_TNUM - org_ne[i].C_FAULTNUM);
          chart10_ne_line_y.push((org_ne[i].C_FAULTNUM / org_ne[i].C_TNUM * 100).toFixed(2));
        } else {
          chart1_ne_y.push(0);
          chart2_ne_y.push(0);
          chart3_ne_y.push(0);
          chart4_ne_y.push(0);
          chart10_ne_bar_y.push(0);
          chart10_ne_bar_y_sum.push(0);
          chart10_ne_line_y.push(0);
        }
      }
      this.chart1Option = this.chartService.makeDashBoard1(chart1_g6_y, chart1_tbox_y, chart1_ne_y);
      this.chart2Option = this.chartService.makeDashBoard2(chart2_g6_y, chart2_tbox_y, chart2_ne_y);
      this.chart3Option = this.chartService.makeDashBoard3(chart3_g6_y, chart3_tbox_y, chart3_ne_y);
      this.chart4Option = this.chartService.makeDashBoard4(chart3_g6_y, chart3_tbox_y, chart3_ne_y);
      this.chart10Option = this.chartService.makeDashBoard10(chart10_g6_line_y, chart10_g6_bar_y_sum, chart10_g6_bar_y, chart10_tbox_line_y, chart10_tbox_bar_y_sum, chart10_tbox_bar_y, chart10_ne_line_y, chart10_ne_bar_y_sum, chart10_ne_bar_y);
    });
    this.http.getDashBoardByPlatform().subscribe((d1: Result2) => {
      this.chart5Option = this.chartService.makeDashBoard5(d1.data.dataVeh[0].TOTALNUM, d1.data.dataVeh[0].G6NUM, d1.data.dataVeh[0].TBOXNUM, d1.data.dataVeh[0].NEVNUM);
      this.chart6Option = this.chartService.makeDashBoard6(d1.data.dataMil[0].TOTALMIL, d1.data.dataMil[0].G6MIL, d1.data.dataMil[0].TBOXMIL, d1.data.dataMil[0].NEVMIL);
      this.chart7Option = this.chartService.makeDashBoard7(d1.data.dataFc[0].TOTALFC, d1.data.dataFc[0].G6FC, d1.data.dataFc[0].TBOXFC, d1.data.dataFc[0].NEVFC);
      this.chart8Option = this.chartService.makeDashBoard8(d1.data.dataRec[0].TOTALREC, d1.data.dataRec[0].G6REC, d1.data.dataRec[0].TBOXREC, d1.data.dataRec[0].NEVREC);
      this.http.getDashBoardOnline().subscribe((d2: Result2) => {
        this.chart9Option = this.chartService.makeDashBoard9(d2.data.datag6, d2.data.datatbox, d2.data.datanev, d1.data.dataVeh[0].G6NUM, d1.data.dataVeh[0].TBOXNUM, d1.data.dataVeh[0].NEVNUM);
      })
    });
    this.http.getDashBoardMap().subscribe((data: Result2) => {
      let provinces = this.commonService.xzqhOptions.filter(e => { return e.pcode == null });
      data.data.g6Data.forEach(e => {
        let tempProvince = provinces.filter(f => { return f.code == e.C_CODE })[0];
        this.map_g6_map.push({ name: tempProvince.shortname, value: e.NUM });
      });
      data.data.tboxData.forEach(e => {
        let tempProvince = provinces.filter(f => { return f.code == e.C_CODE })[0];
        this.map_tbox_map.push({ name: tempProvince.shortname, value: e.NUM });
      });
      data.data.nevData.forEach(e => {
        let tempProvince = provinces.filter(f => { return f.code == e.C_CODE })[0];
        this.map_ne_map.push({ name: tempProvince.shortname, value: e.NUM });
      });
      this.map_g6_map.sort((a, b) => { return b.value - a.value });
      this.map_tbox_map.sort((a, b) => { return b.value - a.value });
      this.map_ne_map.sort((a, b) => { return b.value - a.value });
      for (let i = 0; i < 10; i++) {
        if (i < 10) {
          this.map_g6_bar_x.push('0' + i + this.map_g6_map[i].name);
          this.map_tbox_bar_x.push('0' + i + this.map_tbox_map[i].name);
          this.map_ne_bar_x.push('0' + i + this.map_ne_map[i].name);
        } else {
          this.map_g6_bar_x.push(i + this.map_g6_map[i].name);
          this.map_tbox_bar_x.push(i + this.map_tbox_map[i].name);
          this.map_ne_bar_x.push(i + this.map_ne_map[i].name);
        }
        this.map_g6_bar_y.push(this.map_g6_map[i].value);
        this.map_tbox_bar_y.push(this.map_tbox_map[i].value);
        this.map_ne_bar_y.push(this.map_ne_map[i].value);
      }
      let mapType = 'CHINA';
      this.http0.get('../../assets/china.json').subscribe(geoJson => {
        echarts.registerMap(mapType, geoJson);
        this.chart0Option = this.chartService.makeDashBoard0(mapType, this.map_g6_bar_x, this.map_g6_bar_y, this.map_g6_map);
      });
    })
    this.http.getDashBoardOnline7Day().subscribe((data: Result2) => {
      let org_g6 = data.data.g6Data;
      let org_tbox = data.data.tboxData;
      let org_ne = data.data.nevData;
      let chart11_x = [];
      let chart11_g6_line_y = [];
      let chart11_g6_bar_y = [];
      let chart11_g6_bar_y_sum = [];
      let chart11_tbox_line_y = [];
      let chart11_tbox_bar_y = [];
      let chart11_tbox_bar_y_sum = [];
      let chart11_ne_line_y = [];
      let chart11_ne_bar_y = [];
      let chart11_ne_bar_y_sum = [];
      for (let i = 0; i < 7; i++) {
        chart11_x.push(this.util.dateToMMDD(new Date(org_g6[i].C_ATTIME)));
        chart11_g6_bar_y.push(org_g6[i].C_ONUM);
        chart11_g6_bar_y_sum.push(org_g6[i].C_TNUM - org_g6[i].C_ONUM);
        chart11_g6_line_y.push((org_g6[i].C_ONUM / org_g6[i].C_TNUM * 100).toFixed(2));
        chart11_tbox_bar_y.push(org_tbox[i].C_ONUM);
        chart11_tbox_bar_y_sum.push(org_tbox[i].C_TNUM - org_tbox[i].C_ONUM);
        chart11_tbox_line_y.push((org_tbox[i].C_ONUM / org_tbox[i].C_TNUM * 100).toFixed(2));
        chart11_ne_bar_y.push(org_ne[i].C_ONUM);
        chart11_ne_bar_y_sum.push(org_ne[i].C_TNUM - org_ne[i].C_ONUM);
        chart11_ne_line_y.push((org_ne[i].C_ONUM / org_ne[i].C_TNUM * 100).toFixed(2));
      }
      this.chart11Option = this.chartService.makeDashBoard11(chart11_x, chart11_g6_line_y, chart11_g6_bar_y_sum, chart11_g6_bar_y, chart11_tbox_line_y, chart11_tbox_bar_y_sum, chart11_tbox_bar_y, chart11_ne_line_y, chart11_ne_bar_y_sum, chart11_ne_bar_y);
    });
  }
  onChartInit(e) {
    this.chart0 = e;
  }
  mapChange(e) {
    this.activeMap = e;
    switch (e.value) {
      case Platform.g6:
        this.chart0Option.yAxis.data = this.map_g6_bar_x;
        this.chart0Option.series[0].data = this.map_g6_map;
        this.chart0Option.series[1].data = this.map_g6_bar_y;
        break;
      case Platform.tbox:
        this.chart0Option.yAxis.data = this.map_tbox_bar_x;
        this.chart0Option.series[0].data = this.map_tbox_map;
        this.chart0Option.series[1].data = this.map_tbox_bar_y;
        break;
      case Platform.ne:
        this.chart0Option.yAxis.data = this.map_ne_bar_x;
        this.chart0Option.series[0].data = this.map_ne_map;
        this.chart0Option.series[1].data = this.map_ne_bar_y;
        break;
      default:
        break;
    }
    this.chart0.setOption(this.chart0Option);
  }


}
