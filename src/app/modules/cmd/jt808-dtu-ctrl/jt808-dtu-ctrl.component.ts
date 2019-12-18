import {Component, OnInit, Input} from '@angular/core';
import {CmdService} from './../cmd.service';

@Component({
  selector: 'app-jt808-dtu-ctrl',
  templateUrl: './jt808-dtu-ctrl.component.html',
  styleUrls: ['./jt808-dtu-ctrl.component.css']
})
export class Jt808DtuCtrlComponent implements OnInit {
  @Input()
  vids = [];

  updata = [
    {title: 'URL地址', val: ''},
    {title: '拨号点名称', val: ''},
    {title: '拨号用户名', val: ''},
    {title: '拨号密码', val: ''},
    {title: '地址', val: ''},
    {title: 'TCP端口', val: ''},
    {title: 'UDP端口', val: ''},
    {title: '制造商ID', val: ''},
    {title: '硬件版本', val: ''},
    {title: '固件版本', val: ''},
    {title: '连接时限', val: ''}
  ];
  linkdata = [
    {title: '连接控制', val: ''},
    {title: '监管平台鉴权码', val: ''},
    {title: '拨号点名称', val: ''},
    {title: '拨号用户名', val: ''},
    {title: '拨号密码', val: ''},
    {title: '地址', val: ''},
    {title: 'TCP端口', val: ''},
    {title: 'UDP端口', val: ''},
    {title: '连接时限', val: ''},
  ];

  constructor(private cmdSvc: CmdService) {
  }

  ngOnInit() {
  }

  sendNormalCtrlCmd(i: number) {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    this.cmdSvc.sendjt808CtrlDtu({
      param: {
        id: i
      },
      vids: this.vids
    }, (data) => {
      console.log(data);
      this.cmdSvc.showMessage(data.msg);
    });
  }

  sendUpCtrlCmd() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
   let val = '';
    this.updata.forEach(d => {
      val = val + d.val + ';';
    });

    this.cmdSvc.sendjt808CtrlDtu({
      param: {
        id: 1,
        val: val
      },
      vids: this.vids
    }, (data) => {
      console.log(data);
      this.cmdSvc.showMessage(data.msg);
    });
  }

  sendLinkCtrlCmd() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    let val = '';
    this.linkdata.forEach(d => {
      val = val + d.val + ';';
    });

    this.cmdSvc.sendjt808CtrlDtu({
      param: {
        id: 2,
        val: val
      },
      vids: this.vids
    }, (data) => {
      console.log(data);
      this.cmdSvc.showMessage(data.msg);
    });
  }
}
