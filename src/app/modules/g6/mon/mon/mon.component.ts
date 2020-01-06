import { Component, OnInit } from "@angular/core";
import { MonService } from "src/app/services/mon.service";
import { HtmapService } from "src/app/modules/mon/sctl/htmap.service";
import { mergeMap, take } from "rxjs/operators";
import { interval } from "rxjs";

@Component({
  selector: "app-mon",
  templateUrl: "./mon.component.html",
  styleUrls: ["./mon.component.css"]
})
export class MonComponent implements OnInit {
  vid = "10000590";
  vehInfoHide = true;
  // 车辆详情
  vehInfo: any;
  mapVehs = [];

  constructor(private monSvc: MonService, private mapSvc: HtmapService) {
    this.vehInfo = {
      vid: -1,
      lnglat: null,
      survey: {},
      status:{}
    };
  }

  ngOnInit() {
    this.mapSvc.initMap((veh: any) => {
      this.onMapVehClick(veh);
    });
    this.go();
  }

  /**
   * 车辆查询框 中 点击监控 多车/单车 的事件
   *
   */
  public onVehsLoaded(mvehs: any[]) {
    // 加入获取实时数据队列
    this.addVehs2Q(mvehs);

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
    });
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
    this.clearVehQ();
    this.addVehs2Q(vehs);
  }

  public onappendvehs_header(event) {
    const veh = event;
    this.mapSvc.addVehs([veh]);
    this.addVehs2Q([veh]);
  }

  public onclear_header() {
    this.mapSvc.removeAll();
    this.clearVehQ();
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
  }

  // *******************************  实时获取车辆坐标数据  ********************************

  private go() {
    const timer = interval(2000);
    timer.subscribe(() => {
      this.loadLnglats();
      this.findVehStatus();
    });
  }

  private addVehs2Q(vehs) {
    if (vehs) {
      vehs.forEach(v => {
        this.mapVehs.push({ vid: v.vid, tm: v.sysDt });
      });
    }
    console.log(this.mapVehs);
  }

  private clearVehQ() {
    this.mapVehs = [];
  }

  private loadLnglats() {
    // 20秒 刷新一次数据
    const tm = this.monSvc.getTm();
    const vts = this.mapVehs
      .filter(f => tm - f.tm > 20000)
      .map((m: any) => {
        return { a: m.vid, b: m.tm };
      });
    this.monSvc.loadLnglats(vts).subscribe((data: any) => {
      const lls = data.data;
      console.log("lls===", lls);
      // 更新 地图车辆队列
      this.updateVehQ_tm(vts, lls, tm);
      this.updateMap(lls);
    });
  }

  // 更新车辆队列的时间
  private updateVehQ_tm(vts: any[], lls: any[], tm: number) {
    const mvt = {};
    vts.forEach(v => {
      mvt[v.vid] = tm;
    });

    lls.forEach(ll => {
      mvt[ll.vid] = new Date(ll.attm).getTime();
    });

    this.mapVehs.forEach((veh: any) => {
      const tm = mvt[veh.vid];
      if (tm) {
        veh.tm = tm;
      }
    });
  }

  private updateMap(lls: any[]) {
    lls.forEach(ll => {
      this.monSvc.toMar(ll.lng, ll.lat).subscribe((data: any) => {
        const p = data.data;
        ll.lng = p.x;
        ll.lat = p.y;
        this.mapSvc.updateVeh(ll);
      });
    });
  }

  private findVehStatus() {
    if (this.vehInfo.vid) {
      this.monSvc.findVehState(this.vehInfo.vid).subscribe((data: any) => {
        this.vehInfo.status = data.data;
        console.log(" veh status ", this.vehInfo.status);
      });
    }
  }
}
