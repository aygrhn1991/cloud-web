import { Component, OnInit, Input } from "@angular/core";
import { CmdService } from "./../cmd.service";
@Component({
  selector: "app-cruise-licence",
  templateUrl: "./cruise-licence.component.html",
  styleUrls: ["./cruise-licence.component.css"]
})
export class CruiseLicenceComponent implements OnInit {
  @Input()
  vids = [];
  size = 0;
  licence = "";
  constructor(
    private cmdSvc: CmdService
  ) {}

  ngOnInit() {}
  licenceChanged = event => {
    this.size = event.length;
  };
  sendCmd = () => {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    this.cmdSvc.sendTboxCruiseLicence(
      { licence: this.licence, vids: this.vids },
      data => {
        this.cmdSvc.showMessage(data.msg);
      }
    );
  }; 
}
