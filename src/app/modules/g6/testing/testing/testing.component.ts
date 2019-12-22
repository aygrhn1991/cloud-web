import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehG6 } from 'src/app/models/veh.model';
import { SearchModel, Result1 } from 'src/app/models/result.model';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { G6Service } from 'src/app/services/g6.service';
import { ChartService } from 'src/app/services/chart.service';
import { UtilService } from 'src/app/services/util.service';
import { UUID } from 'angular2-uuid';
import { G6DataType } from 'src/app/enums/g6.data.type.enum';
declare var BMap: any;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  clientId: string = null;
  beat: any = null;

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;
  chart: any;
  chartOption: any;

  vehInfo: VehG6 = new VehG6();
  vehObd: any = {};
  vehEng: any = {};
  vehLog: Array<any> = [];

  searchModel: SearchModel = new SearchModel();
  key: string = '';

  @ViewChild('logWrapper', null) logwrapper: ElementRef;
  autoLogScroll: boolean = true;
  total: number = 0;
  hz: number = 0;

  constructor(private http: HttpService,
    private notification: NzNotificationService,
    public g6Service: G6Service,
    private chartService: ChartService,
    private util: UtilService) { }

  ngOnInit() {
    this.clientId = UUID.UUID();
    this.map = new BMap.Map(this.mapContainer.nativeElement);
    let point = new BMap.Point(116.39, 39.90);
    this.map.centerAndZoom(point, 15);
    this.map.enableScrollWheelZoom(true);
    this.map.setMapStyle({ style: 'midnight' });
    this.chartOption = this.chartService.makeG6TestingEng();
  }
  ngOnDestroy() {
    clearInterval(this.beat);
  }

  onChartInit(e) {
    this.chart = e;
  }

  startG6Testing() {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('请输入要检测的VIN', null);
      return;
    }
    if (!this.util.isNull(this.beat)) {
      this.notification.error('检测进行中，请先停止检测', null);
      return;
    }
    this.notification.success('检测已开始', null);
    this.searchModel.dateStart = new Date();
    this.vehLog = [];
    this.total = 0;
    this.hz = 0;
    this.drawVehInfo();
    this.beat = setInterval(() => {
      this.http.startG6Testing(this.clientId, this.searchModel.vid).subscribe((data: Result1) => {
        if (!this.util.isNull(data.data)) {
          data.data.data.forEach(e => {
            let dataObj = JSON.parse(e);
            console.log(dataObj);
            dataObj.msgval = JSON.parse(dataObj.msgval);
            dataObj.org2 = dataObj.org;
            switch (dataObj.commandId) {
              case G6DataType.realTimeData:
                this.vehObd = dataObj.msgval.OBD;
                this.vehEng = dataObj.msgval.engineData;
                this.g6Service.obdStateDecode(this.vehObd.supportState, this.vehObd.readyState);
                this.g6Service.iuprDecode(this.vehObd.iupr);
                this.drawChart();
                this.drawMap();
                break;
              default:
                break;
            }
            this.vehLog.push(dataObj);
            this.vehLog.splice(0, this.vehLog.length - 200);
            this.total++;
            this.hz = parseFloat((this.total / ((new Date().getTime() - this.searchModel.dateStart.getTime()) / 1000 / 60)).toFixed(1));
            if (this.autoLogScroll) {
              this.logwrapper.nativeElement.scrollTop = this.logwrapper.nativeElement.scrollHeight;
            }
            this.drawSearch();
          });
        }
      });
    }, 1000);
  }

  stopG6Testing() {
    this.notification.success('停止检测', null);
    clearInterval(this.beat);
    this.beat = null;
  }

  drawVehInfo() {
    this.http.getG6VehInfo(this.searchModel.vid).subscribe((data: Result1) => {
      this.vehInfo.vid = data.data.C_ID;
      this.vehInfo.vin = data.data.C_VIN;
      this.vehInfo.vehNo = data.data.C_VEHNO;
      this.vehInfo.vehNoColor = data.data.C_COLOR;
      this.vehInfo.xzqh = data.data.C_XZQH;
      this.vehInfo.power = data.data.C_ET;
      this.vehInfo.vehMode = data.data.C_VEHM;
      this.vehInfo.simCode = data.data.C_IMSI;
      this.vehInfo.dtuCode = data.data.C_DTUCODE;
      this.vehInfo.engCode = data.data.C_ENGCODE;
      this.vehInfo.createTime = data.data.C_FTM;
    });
  }

  drawChart() {
    this.chartOption.series[2].data[0].value = this.vehEng.engineSpeed * 0.125;
    this.chartOption.series[5].data[0].value = this.vehEng.vehicleSpeed / 256;
    this.chartOption.series[8].data[0].value = this.vehEng.tankLevel * 100 * 0.4;
    this.chart.setOption(this.chartOption);
  }

  drawMap() {
    this.map.clearOverlays();
    let point = new BMap.Point(this.vehEng.longitude, this.vehEng.latitude);
    let convertor = new BMap.Convertor();
    convertor.translate([point], 1, 5, (data) => {
      if (data.status === 0) {
        let marker = new BMap.Marker(data.points[0]);
        this.map.addOverlay(marker);
        this.map.setCenter(data.points[0]);
      }
    })
  }

  drawSearch() {
    this.vehLog.forEach((e) => {
      let reg = new RegExp(this.key, 'g');
      e.org2 = e.org.replace(reg, '<span class="active">' + this.key + '</span>');
    });
  }

}
