import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehG6 } from 'src/app/models/veh.model';
import { Search, Result } from 'src/app/models/result.model';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { G6Service } from 'src/app/services/g6/g6.service';
import { ChartService } from 'src/app/services/chart.service';
declare var BMap: any;
@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})
export class PlaybackComponent implements OnInit {

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;
  chart: any;
  chartOption: any;

  vehInfo: VehG6 = new VehG6();
  vehObd: Array<any>;
  vehEng: any;
  vehLog: Array<any>;

  searchModel: Search = new Search();
  key: string;

  constructor(private http: HttpService,
    private notification: NzNotificationService,
    public g6Service: G6Service,
    private chartService: ChartService) { }

  ngOnInit() {
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
    this.http.startG6Testing('',this.searchModel.vid).subscribe((data: Result) => {
      this.vehInfo = data.data.data.map((x) => {
        let veh = new VehG6();
        veh.vid = x.C_ID;
        veh.vin = x.C_VIN;
        veh.vehNo = x.C_VEHNO;
        veh.vehNoColor = x.C_COLOR;
        veh.xzqh = x.C_XZQH;
        veh.power = x.C_ET;
        veh.vehMode = x.C_VEHM;
        veh.simCode = x.C_IMSI;
        veh.dtuCode = x.C_DTUCODE;
        veh.engCode = x.C_ENGCODE;
        veh.createTime = x.C_FTM;
        veh.remark = x.C_DESC;
        return veh;
      })[0];
      this.g6Service.obdStateDecode(123, 456);
      this.g6Service.iuprDecode('002800EB0005000000000028000000000002000700000028000900280014002800000000');
      this.notification.success('开始检测', null);
    });
  }

  stopG6Testing() {
    this.notification.success('停止检测', null);
  }
  onChartInit(e) {
    this.chart = e;
  }

}
