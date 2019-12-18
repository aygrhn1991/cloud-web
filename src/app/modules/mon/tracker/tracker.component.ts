import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd";
import { MonService } from "src/app/services/mon.service";

// tslint:disable-next-line: one-variable-per-declaration
declare var IoVLib, BMapLib;

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.component.html",
  styleUrls: ["./tracker.component.css"]
})
export class TrackerComponent implements OnInit {
  v_dtb: Date;
  v_dte: Date;
  playSpd = 1;
  playFlag = false;
  vid = "";
  vin = "";
  vno = "";
  trackerData = [];
  curVeh: any;
  totalCount = 0;
  index = 0;
  isLoading = false;
  // 车辆行驶信息
  drvInfo = { mil: 0, tm: 0, avgspd: 0, avgDrvSpd: 0 };

  constructor(
    private monSvc: MonService,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.vid = this.route.snapshot.queryParams["vid"] || "无";
    this.vin = this.route.snapshot.queryParams["vin"] || "无";
    this.vno = this.route.snapshot.queryParams["vno"] || "无";
    this.v_dte = new Date();
    this.v_dtb = new Date(this.v_dte.getTime() - 3600000);
    const m = this;
    IoVLib.Tracker.initMap(function(i) {
      m.curVeh = m.trackerData[i];
      m.index = i;
    });
  }
  dtbOk(result: Date): void {
    this.v_dtb = result;
  }

  dteOk(result: Date): void {
    this.v_dte = result;
  }

  searchTracker(): void {
    this.isLoading = true;
    const m = this;

    this.monSvc
      .loadTrackerData(this.vid, this.v_dtb.getTime(), this.v_dte.getTime())
      .subscribe((data: any) => {
        m.isLoading = false;
        if (!data) {
          m.showMessage(2);
          return;
        }
        const arr: any[] = data.data;
        const vehs = arr
          .filter(v => {
            return v.lng < 200000000 && v.lat < 200000000;
          })
          .map(v => {
            return BMapLib.Veh(
              v.vid,
              m.vno,
              1,
              v.vst,
              v.spd / 256,
              v.dir,
              v.lng / 1000000,
              v.lat / 1000000,
              v.attm,
              v.mil / 10
            );
          });

        // 偏移转换 并画出轨迹
        m.toMars(vehs);
        // m.drawTrack(vehs);
        // 计算驾驶信息
        m.calcDriveInfo(vehs);
      });
  }

  toMars(vehs: any[]): void {
    const coors = vehs.map(v => {
      return { x: v.lng, y: v.lat };
    });
    const m = this;
    this.monSvc.toMarsAddrs(coors).subscribe((data: any) => {
      if (!data) {
        m.showMessage(2);
        m.drawTrack(vehs);
        return;
      }
      const mars: any[] = data.data;
      if (vehs.length === mars.length) {
        for (let i = 0; i < vehs.length; i++) {
          const v = vehs[i];
          const mar = mars[i];
          v.lng = mar.x;
          v.lat = mar.y;
          v.addr = mar.addr;
        }
      }
      m.drawTrack(vehs);
    });
  }

  calcDriveInfo(vehs: any[]): void {
    const nvs = vehs.filter(v => {
      return v.spd > 0;
    });
    const l = nvs.length;
    if (nvs.length <= 1) {
      return;
    }
    this.drvInfo.mil = nvs[l - 1].mil - nvs[0].mil;
    this.drvInfo.tm =
      (new Date(nvs[l - 1].dtuDt).getTime() -
        new Date(nvs[0].dtuDt).getTime()) /
      1000;
    this.drvInfo.avgspd = (this.drvInfo.mil / this.drvInfo.tm) * 3600;
    nvs.forEach(v => {
      this.drvInfo.avgDrvSpd += v.spd;
    });
    this.drvInfo.avgDrvSpd /= nvs.length;
  }

  drawTrack(vehs: any[]): void {
    const m = this;
    m.totalCount = vehs.length;
    m.index = 0;
    m.playFlag = false;
    if (m.totalCount === 0) {
      m.showMessage(1);
    }
    m.trackerData = vehs;
    IoVLib.Tracker.drawTracker(vehs);
    IoVLib.Tracker.toView();
  }

  showMessage(flag: number): void {
    if (flag === 1) {
      this.notification.blank("通知", "该车此段时间内没有轨迹信息！");
    } else {
      this.notification.blank("错误", "网络故障，无法访问服务器！");
    }
  }

  togglePlay(): void {
    if (this.playFlag) {
      IoVLib.Tracker.pause();
    } else {
      IoVLib.Tracker.start();
    }
    this.playFlag = !this.playFlag;
  }

  setPlaySpeed(): void {
    IoVLib.Tracker.setSpeed(this.playSpd);
  }
}
