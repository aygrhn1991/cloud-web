import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MonService } from "src/app/services/mon.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isFullScreen = false;
  totalc = 0; // 总入网车辆数
  onlinec = 0; // 当前在线车辆数
  todayc = 0; // 今日上线车辆数
  @Output()
  onclear: EventEmitter<any> = new EventEmitter(); // 清空地图车辆事件
  vehs = [];
  vehsHidden = true;
  vehStatIdx = 0;
  titles = ["总入网车辆列表", "今日上线车辆列表", "当前在线车辆列表"];
  iconColors = ["gray", "#54c8ff", "#52c41a"];
  @Output()
  onselvehs: EventEmitter<any> = new EventEmitter(); // 重新监控选中车辆列表事件
  @Output()
  onappendvehs: EventEmitter<any> = new EventEmitter(); // 追加监控选中车辆列表事件

  constructor(private monSvc: MonService) {}

  ngOnInit() {
    const m = this;
    this.monSvc.loadStatInfo().subscribe((data: any) => {
      console.log(data);
      const rst = data.data;
      if (rst) {
        m.totalc = rst.a;
        m.onlinec = rst.c;
        m.todayc = rst.b;
      }
    });
  }

  toggleFullScreen() {
    this.isFullScreen && this.exitScreen();
    !this.isFullScreen && this.fullScreen();
    this.isFullScreen = !this.isFullScreen;
  }

  fullScreen() {
    const el = document.documentElement as any;
    const rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
    }
    return;
  }

  // 退出全屏s
  exitScreen() {
    const cfs = document as any;
    if (cfs.exitFullscreen) {
      cfs.exitFullscreen();
    } else if (cfs.webkitCancelFullScreen) {
      cfs.webkitCancelFullScreen();
    } else {
      cfs.msExitFullscreen();
    }
  }

  vehStatClick(flag: number) {
    this.vehStatIdx = flag;
    if (this.vehsHidden) {
      this.vehsHidden = false;
    }

    const m = this;
    this.monSvc.schVehs(flag).subscribe((data: any) => {
      const rst = data.data;
      if (rst) {
        m.vehs = rst;
      }
    });
  }

  vehsPanelClose() {
    this.vehsHidden = true;
  }

  monAllClick() {
    this.onselvehs.emit(this.vehs);
  }

  monAppendClick(veh: any) {
    this.onappendvehs.emit(veh);
  }

  clearMap() {
    this.onclear.emit();
  }
}
