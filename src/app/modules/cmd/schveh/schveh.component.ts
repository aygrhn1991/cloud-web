import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CmdService } from "../cmd.service";

@Component({
  selector: "app-schveh",
  templateUrl: "./schveh.component.html",
  styleUrls: ["./schveh.component.css"]
})
export class SchvehComponent implements OnInit {
  vin = "";
  vids = [];
  vehs = [];
  isAllChecked = false;
  isIndeterminate = false;
  @Output()
  vidsChanged = new EventEmitter<any>();

  constructor(
    private cmdSvc: CmdService
  ) {}

  ngOnInit() {}
  checkAll(b: boolean) {
    this.vehs.forEach(v => (v.checked = b));
    this.refreshStatus();
  }
  refreshStatus() {
    this.vids = [];
    if (this.vehs == null || this.vehs.length === 0) {
      this.isAllChecked = false;
      this.isIndeterminate = false;
      return;
    }
    this.isAllChecked = this.vehs.every(v => v.checked);
    const allUnChecked = this.vehs.every(v => !v.checked);
    this.isIndeterminate = !this.isAllChecked && !allUnChecked;

    // 计算 选中的车辆
    this.vids = this.vehs.filter(v => v.checked).map((v: any) => v.id);
    this.vidsChanged.emit(this.vids);
  }

  vidChanged(event) {
    this.cmdSvc.searchSimpVehs(this.vin, data => {
      console.log(data);
      if (!data.sucessed) {
        this.cmdSvc.showMessage(data.msg);
      }
      this.vehs = data.data;
      this.refreshStatus();
    });
  }

}
