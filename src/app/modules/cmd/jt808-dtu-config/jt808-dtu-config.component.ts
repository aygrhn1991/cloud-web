import {Component, OnInit, Input} from '@angular/core';
import {CmdService} from './../cmd.service';

@Component({
  selector: 'app-jt808-dtu-config',
  templateUrl: './jt808-dtu-config.component.html',
  styleUrls: ['./jt808-dtu-config.component.css']
})
export class Jt808DtuConfigComponent implements OnInit {
  @Input()
  vids = [];
  config = [
    {
      id: 0x0001,
      title: '终端心跳发送间隔，单位为秒（s）',
      default: '60',
      val: ''
    },
    {
      id: 0x0002,
      title: 'TCP消息应答超时时间，单位为秒（s）',
      default: '60',
      val: ''
    },
    {
      id: 0x0003,
      title: 'TCP消息重传次数',
      default: '3',
      val: ''
    },
    {
      id: 0x0010,
      title: '主服务器APN，无线通信拨号访问点。若网络制式为CDMA，则该处为PPP拨号号码',
      default: '1.62.191.173',
      val: ''
    },
    {
      id: 0x0011,
      title: '主服务器无线通信拨号用户名',
      default: 'htkj',
      val: ''
    },
    {
      id: 0x0012,
      title: '主服务器无线通信拨号密码',
      default: '12345',
      val: ''
    },
    {
      id: 0x0013,
      title: '主服务器地址,IP或域名，默认125.32.98.105',
      default: '125.32.98.105',
      val: ''
    },
    {
      id: 0x0014,
      title: '备份服务器APN，无线通信拨号访问点',
      default: '1.62.191.173',
      val: ''
    },
    {
      id: 0x0015,
      title: '备份服务器无线通信拨号用户名',
      default: 'user',
      val: ''
    },
    {
      id: 0x0016,
      title: '备份服务器无线通信拨号密码',
      default: '123456',
      val: ''
    },
    {
      id: 0x0017,
      title: '备份服务器地址,IP或域名',
      default: '1.62.191.173',
      val: ''
    },
    {
      id: 0x0018,
      title: '服务器TCP端口，默认6601',
      default: '6601',
      val: ''
    },
    {
      id: 0x0020,
      title: '位置汇报策略，0：定时汇报；1：定距汇报；2：定时和定距汇报',
      default: '0',
      val: ''
    },
    {
      id: 0x0029,
      title: '缺省时间汇报间隔，单位为秒（s），>0，默认30秒',
      default: '30',
      val: ''
    }
  ];

  constructor(private cmdSvc: CmdService) {
  }

  ngOnInit() {
  }
  sendCmd() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    const cmds = [];
    this.config.filter(p => p.val !== '')
      .forEach(p => {
        cmds.push(p);
      });

    this.cmdSvc.sendjt808DtuConfig({
      items: cmds,
      vids: this.vids
    }, (data) => {
      console.log(data);
      this.cmdSvc.showMessage(data.msg);
    });
    console.log(cmds);
  }

  selectAll() {
    this.config.forEach(o => {
      o.val = o.default;
    });
  }

  cancelAll() {
    this.config.forEach(o => {
      o.val = '';
    });
  }
}
