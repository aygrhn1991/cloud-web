import {Component, OnInit, Input} from '@angular/core';
import {CmdService} from './../cmd.service';

@Component({
  selector: 'app-tbox-remote-ctrl',
  templateUrl: './tbox-remote-ctrl.component.html',
  styleUrls: ['./tbox-remote-ctrl.component.css']
})
export class TboxRemoteCtrlComponent implements OnInit {
  @Input()
  vids = [];
  config = [
    {
      id: 0xB001,
      title: '双闪寻车',
      default: '-',
      val: ''
    },
    {
      id: 0xB002,
      title: '车门锁控制，0:未激活，1：开锁，2：闭锁，其它保留',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A1,
      title: '发动机限扭,格式为：限制类型(0，限制类型；1，控制类型)|限扭百分率0~100%',
      default: '1|60',
      val: ''
    },
    {
      id: 0xB0A2,
      title: '解除发动机限扭 ',
      default: '-',
      val: ''
    },
    {
      id: 0xB0A3,
      title: '发动机 限转速,格式为：限制类型(0，限制类型；1，控制类型)|限制发动机转速(100rpm)',
      default: '0|30',
      val: ''
    },
    {
      id: 0xB0A4,
      title: '解除发动机限转速 ',
      default: '-',
      val: ''
    },
    {
      id: 0xB003,
      title: '1:远程启动 0:远程熄火',
      default: '1',
      val: ''
    },
    {
      id: 0xB004,
      title: '1:远程上电 0:远程下电',
      default: '1',
      val: ''
    },
    {
      id: 0xB005,
      title: '车门锁控制，0:未激活，1：开锁，2：闭锁',
      default: '1',
      val: ''
    },
    {
      id: 0xB006,
      title: '1:开启原车空调 0:关闭远程空调',
      default: '1',
      val: ''
    },
    {
      id: 0xB007,
      title: '空调出风模式：0:吹面 1:吹面+吹脚 2:吹脚 3:吹脚+除霜',
      default: '1',
      val: ''
    },
    {
      id: 0xB008,
      title: '远程设置原车空调出风风量：n：n档(n:1、2…8)',
      default: '1',
      val: ''
    },
    {
      id: 0xB009,
      title: '远程设置原车空调出风温度：温度最大：35℃，最小：18℃。实际温度计算方式为（0.5*n+18），n为输入值',
      default: '10',
      val: ''
    },
    {
      id: 0xB0A0,
      title: '远程设置原车空调循环模式：0：内循环:1：外循环',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A5,
      title: '1：开启压缩机:0：关闭压缩机',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A6,
      title: '远程开启/关闭原车空调AUTO ，1：开启AUTO:0：关闭AUTO',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A7,
      title: '远程开启/关闭原车空调强制除霜，1：开启强制除霜:0：关闭强制除霜',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A8,
      title: '远程开启/关闭独立暖风，1：开启独立暖风、0：关闭独立暖风',
      default: '1',
      val: ''
    },
    {
      id: 0xB0A9,
      title: '远程设置独立暖风温度，1：1档: 2：2档 3:3档 4：4档',
      default: '1',
      val: ''
    },
    {
      id: 0xB0AA,
      title: '远程开启/关闭驻车空调，1：开启驻车空调 0：关闭驻车空调',
      default: '1',
      val: ''
    },
    {
      id: 0xB0AB,
      title: '远程设置驻车空调温度，18℃-35℃，步长0.5℃,实际温度为：（0.5*n+18），n为输入值',
      default: '4',
      val: ''
    },
    {
      id: 0xB0AC,
      title: '远程设置驻车空调风量，n：n档(n:1、2…8)',
      default: '1',
      val: ''
    },
    {
      id: 0xB0AD,
      title: '远程开启/关闭驻车空调AUTO，1：开启AUTO:0：关闭AUTO',
      default: '1',
      val: ''
    },
    {
      id: 0xB0AE,
      title: '远程开启/关闭原车空调一键通风，1：开启一键通风:0：关闭一键通风',
      default: '1',
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

    this.cmdSvc.sendTboxRemoteCtrl({
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
