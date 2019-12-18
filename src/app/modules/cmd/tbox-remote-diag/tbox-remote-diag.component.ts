import { Component, OnInit, Input } from "@angular/core";
import { CmdService } from "../cmd.service";

@Component({
  selector: "app-tbox-remote-diag",
  templateUrl: "./tbox-remote-diag.component.html",
  styleUrls: ["./tbox-remote-diag.component.css"]
})
export class TboxRemoteDiagComponent implements OnInit {
  @Input()
  vids = [];
  size = 0;
  data = "";
  constructor(
    private cmdSvc: CmdService
  ) {}

  ngOnInit() {}

  sendCmd = () => {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    this.cmdSvc.sendTboxRemoteDiag(
      { type: 0, data: this.data, vids: this.vids },
      data => {
        this.cmdSvc.showMessage(data.msg);
      }
    );
  };
}
