import { Component, OnInit } from "@angular/core";
import { MonService } from "src/app/services/mon.service";
import { HtmapService } from "./htmap.service";
import { HtwsComponent } from "./htws/htws.component";
import { mergeMap } from "rxjs/operators";

// tslint:disable-next-line: one-variable-per-declaration
declare var IoVLib, BMapLib, BMap, BMAP_NORMAL_MAP, BMAP_HYBRID_MAP;

@Component({
  selector: "app-sctl",
  templateUrl: "./sctl.component.html",
  styleUrls: ["./sctl.component.css"]
})

/**
 * supervisory control  监控
 */
export class SctlComponent implements OnInit {
  vid = "";
  vehInfoHide = true;
  // 车辆详情
  vehInfo: any;
  // 车辆概况
  vehSurvey: any;
  dtcInfo: any;
  htws: HtwsComponent;

  constructor(private monSvc: MonService, private mapSvc: HtmapService) {
    this.vehInfo = {
      vid: "",
      lnglat: null,
      survey: {},
      obd: { protocol: 1 },
      engine: {}
    };
  }

  ngOnInit() {
    this.mapSvc.initMap((veh: any) => {
      this.onMapVehClick(veh);
    });
  }
  /**
   * 车辆查询框 中 点击监控 多车/单车 的事件
   *
   */
  public onVehsLoaded(mvehs: any[]) {
    const m = this;
    const coors = mvehs.map(m => {
      return { x: m.lng, y: m.lat };
    });
    this.monSvc.toMars(coors).subscribe((data: any) => {
      const ps = data.data;
      for (let i = 0; i < mvehs.length; i++) {
        const v = mvehs[i];
        v.lng = ps[i].x;
        v.lat = ps[i].y;
      }
      // 地图上加车
      mvehs.forEach(v => {
        v.vehNo = v.vehNo == "" ? v.vin : v.vehNo;
      });
      this.mapSvc.addVehs(mvehs);
      // websocket上加车
      // m.htws.sendAppendVehs(mvehs);
    });
  }

  // ************************************** web socket ************************************
  onHtwsLoaded(data) {
    this.htws = data;
  }
  /**
   * 实时接收 htws 组件的 车辆坐标信息 事件
   * @param ll
   */
  public acceptLnglat(ll: any) {
    this.monSvc.toMar(ll.lng, ll.lat).subscribe((data: any) => {
      const p = data.data;
      ll.lng = p.x;
      ll.lat = p.y;
      this.mapSvc.updateVeh(ll);
    });
  }

  public acceptObd(obd: any) {
    const vid = obd.vid;
    if (this.vehInfo.vid && this.vehInfo.vid == vid) {
      if (
        !this.vehInfo.obd ||
        !this.vehInfo.obd.attm ||
        this.vehInfo.obd.attm < obd.attm
      ) {
        this.vehInfo.obd = obd;
      }
    } else {
      this.vehInfo.obd = {};
    }
  }

  public acceptEngine(eng: any) {
    const vid = eng.vid;
    const m = this;
    if (this.vehInfo.vid && this.vehInfo.vid == vid) {
      if (
        !this.vehInfo.engine ||
        !this.vehInfo.engine.attm ||
        this.vehInfo.engine.attm < eng.attm
      ) {
        this.monSvc
          .toAddr(eng.longitude, eng.latitude)
          .subscribe((data: any) => {
            eng.addr = data.data;
            m.vehInfo.engine = eng;
            if (m.vehInfo.survey) {
              const su = m.vehInfo.survey;
              su.spd = eng.vehicleSpeed;
              su.dtuDt = eng.attm;
              su.vst = eng.positioningState;
              su.mil = eng.mileage;
              su.addr = data.data;
            }
          });
      }
    } else {
      this.vehInfo.engine = {};
    }
  }

  // ******************************************  header *************************************************** */
  /**
   * header组件中 车辆详情按钮 的显示/隐藏事件
   * @param {boolean} b
   */
  public onVehInfoHide(b: boolean) {
    this.vehInfoHide = b;
  }

  /**
   * header组件中 选中的要监控的车辆列表
   * @param event
   */
  public onselvehs_header(event) {
    this.mapSvc.removeAll();
    const vehs = event;
    this.mapSvc.addVehs(vehs);
    this.htws.sendAppendVehs(vehs);
  }

  public onappendvehs_header(event) {
    const veh = event;
    this.mapSvc.addVehs([veh]);
    this.htws.sendAppendVehs([veh]);
  }

  public onclear_header() {
    this.mapSvc.removeAll();
  }

  //********************************************  其他  ***************************************** */
  public onDtcClick(event: any) {
    console.log(event);
    const _self = this;
    // 查询dtc描述
    this.monSvc.searchDtcInfo(event.dtc).subscribe((data: any) => {
      const info = data.data;
      console.log(data);
      _self.dtcInfo = {
        dtc: event.dtc,
        fc: event.fc,
        dtcName: info.a,
        ybName: info.b,
        obdc: info.c,
        attm: event.attm
      };
    });
  }
  public onMapVehClick(veh: any) {
    console.log(veh);
    const m = this;
    // 设置当前车辆
    const vid = (this.vehInfo.vid = veh.vid);
    // 查询车辆概况
    this.monSvc
      .loadVehSnapshot(vid)
      .pipe(
        mergeMap((data: any) => {
          const sur = (this.vehInfo.survey = data.data);
          return this.monSvc.toAddr(sur.lng, sur.lat);
        })
      )
      .subscribe((data: any) => {
        this.vehInfo.survey.addr = data.data;
      });

    // 查询车辆最后一次信息
    this.vehInfoHide = false;
    // 高频全量监控本车
    this.htws.fullMonVeh(vid);
  }
}
