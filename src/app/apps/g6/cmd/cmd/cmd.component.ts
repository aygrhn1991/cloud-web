import { Component, OnInit, Input } from '@angular/core';
import { CmdService } from 'src/app/modules/cmd/cmd.service';

@Component({
  selector: 'app-cmd',
  templateUrl: './cmd.component.html',
  styleUrls: ['./cmd.component.css']
})
export class CmdComponent implements OnInit {

  @Input()
  vids = [];

  ip = "192.168.0.1";
  account: "";
  pwd: "";

  constructor(private cmdSvc: CmdService) {}

  ngOnInit() {}

  sendNormalCtrlCmd() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    this.cmdSvc.sendg6Normal(
      {
        key: 0x81,
        vids: this.vids
      },
      data => {
        console.log(data);
        this.cmdSvc.showMessage(data.msg);
      }
    );
  }

  sendUpgrade() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    const m = this;
    this.cmdSvc.sendg6Upgrade(
      {
        ip: m.ip,
        acc: m.account,
        pwd: m.pwd,
        vids: this.vids
      },
      data => {
        console.log(data);
        this.cmdSvc.showMessage(data.msg);
      }
    );
  }

}
