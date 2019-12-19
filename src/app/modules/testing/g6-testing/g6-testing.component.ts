import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchModel, Result2, Result1 } from 'src/app/models/result.model';
import { VehG6 } from 'src/app/models/veh.model';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { G6Service } from 'src/app/services/g6.service';
import { ChartService } from 'src/app/services/chart.service';
import { UUID } from 'angular2-uuid';
declare var BMap: any;

@Component({
  selector: 'app-g6-testing',
  templateUrl: './g6-testing.component.html',
  styleUrls: ['./g6-testing.component.css']
})
export class G6TestingComponent implements OnInit {

  clientId: string = null;
  beat: any = null;

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;
  chart: any;
  chartOption: any;

  vehInfo: VehG6 = new VehG6();
  vehObd: Array<any>;
  vehEng: any;
  vehLog: Array<any>;

  searchModel: SearchModel = new SearchModel();
  key: string;

  log_auto_scroll;
  autoScroll() { };

  constructor(private http: HttpService,
    private notification: NzNotificationService,
    public g6Service: G6Service,
    private chartService: ChartService) { }

  ngOnInit() {
    this.clientId = UUID.UUID();
    this.map = new BMap.Map(this.mapContainer.nativeElement);
    let point = new BMap.Point(126.6323205181, 45.7492244111);
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    this.map.centerAndZoom(point, 15);
    this.map.enableScrollWheelZoom(true);
    this.map.setMapStyle({ style: 'midnight' });

    this.chartOption = this.chartService.makeG6TestingEng();
  }

  startG6Testing() {
    this.beat = setInterval(() => {
      this.http.startG6Testing(this.clientId, this.searchModel.vid).subscribe((data: Result1) => {
        console.log(data.data);
        // this.vehInfo = data.data.data.map((x) => {
        //   let veh = new VehG6();
        //   veh.vid = x.C_ID;
        //   veh.vin = x.C_VIN;
        //   veh.vehNo = x.C_VEHNO;
        //   veh.vehNoColor = x.C_COLOR;
        //   veh.xzqh = x.C_XZQH;
        //   veh.power = x.C_ET;
        //   veh.vehMode = x.C_VEHM;
        //   veh.simCode = x.C_IMSI;
        //   veh.dtuCode = x.C_DTUCODE;
        //   veh.engCode = x.C_ENGCODE;
        //   veh.createTime = x.C_FTM;
        //   veh.remark = x.C_DESC;
        //   return veh;
        // })[0];
        // this.g6Service.obdStateDecode(123, 456);
        // this.g6Service.iuprDecode('002800EB0005000000000028000000000002000700000028000900280014002800000000');
        // this.notification.success('开始检测', null);
      });
    }, 1000);

  }

  stopG6Testing() {
    this.notification.success('停止检测', null);
    clearInterval(this.beat);
  }
  onChartInit(e) {
    this.chart = e;
  }
  c1() {
    this.chartOption.series[2].data[0].value = 150;
    this.chartOption.series[5].data[0].value = 3210;
    this.chartOption.series[8].data[0].value = 80;
    this.chart.setOption(this.chartOption);
  }
  c2() {
    this.chartOption.series[2].data[0].value = 50;
    this.chartOption.series[5].data[0].value = 2210;
    this.chartOption.series[8].data[0].value = 40;
    this.chart.setOption(this.chartOption);
  }
}
