import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  NzTreeNode,
  NzFormatEmitEvent,
  NzTreeNodeOptions
} from "ng-zorro-antd";
import { MonService } from "src/app/services/mon.service";

@Component({
  selector: "app-schveh",
  templateUrl: "./schveh.component.html",
  styleUrls: ["./schveh.component.css"]
})
export class SchvehComponent implements OnInit {
  hiddenRst = true;
  hiddenTree = true;
  vin = "";
  vsnodes: NzTreeNode[] = [];
  schRstHint = "查询结果";
  disResultFlag = true; // 1 车牌号，2：vin

  @Input()
  hidden = false;

  @Output()
  vehsLoaded = new EventEmitter<any>();

  constructor(private monSvc: MonService) {}

  ngOnInit() {}

  public onInputChanged() {
    if (this.vin === "") {
      this.hiddenRst = true;
    }
  }

  public onSchBtnClick() {
    this.monSvc.statXzqh(this.vin).subscribe((data: any) => {
      console.log("xzqhStatInfo", data);
      const xzqhStatInfo = data.data;
      if (xzqhStatInfo == null) {
        return;
      }

      let _oc = 0;
      let _tc = 0;
      this.vsnodes = [];
      xzqhStatInfo.forEach((xzqhdata: any) => {
        _oc = _oc + xzqhdata.online;
        _tc = _tc + xzqhdata.total;
        this.vsnodes.push(new NzTreeNode(xzqhdata as NzTreeNodeOptions));
      });
      this.schRstHint = `查询结果(${_oc}/${_tc})`;
      this.hiddenTree = xzqhStatInfo.length === 0;
    });

    this.hiddenRst = false;
  }

  public onSchRstBtnClick(): void {
    this.hiddenTree = !this.hiddenTree;
  }

  public mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name === "expand") {
      const pnode: NzTreeNode = e.node;
      if (pnode.getChildren().length === 0 && pnode.isExpanded) {
        this.schVeh(e.node);
      }
    }
  }

  schVeh(pnode: NzTreeNode): void {
    const xzqh = Number.parseInt(pnode.key);
    this.monSvc.byVin(this.vin, xzqh).subscribe((data: any) => {
      console.log('byvin',data);
      const vehs = data.data;
      pnode.addChildren(vehs);
    });
  }

  // ---------------------------------  加载地图车辆相关  ---------------------------------------------
  public loadMVeh(vid: string) {
    this.monSvc.loadMVeh(vid).subscribe((data: any) => {
      console.log(data);
      if (data.successed) {
        const vehs = [];
        vehs.push(data.data);
        this.vehsLoaded.emit(vehs);
      }
    });
  }

  public loadMVehs(xzqh: number) {
    this.monSvc.loadMVehs(xzqh, this.vin).subscribe((data: any) => {
      if (data.successed && data.data !== null && data.data.length > 0) {
        this.vehsLoaded.emit(data.data);
      }
    });
  }
}
