import { Component, OnInit, Input } from "@angular/core";
import { CmdService } from "./../cmd.service";

@Component({
  selector: "app-tbox-dtu-config",
  templateUrl: "./tbox-dtu-config.component.html",
  styleUrls: ["./tbox-dtu-config.component.css"]
})
export class TboxDtuConfigComponent implements OnInit {
  @Input()
  vids = [];
  config = [
    {
      id: 0x0010,
      title: "设置远程通信根密钥(ROOTKEY)",
      default:
        "00000000000000000000000000000000,00000000000000000000000000000000",
      val: ""
    },
    {
      id: 0x0011,
      title: "设置近程通信根密钥(ROOTKEY)",
      default:
        "00000000000000000000000000000000,00000000000000000000000000000000",
      val: ""
    },
    {
      id: 0x0101,
      title: "配置GPS模块定位信息的刷新间隔，单位为毫秒(ms)",
      default: "1000",
      val: ""
    },
    {
      id: 0x0102,
      title: "低功耗模式到超低功耗模式的时间间隔，单位为分钟（min）",
      default: "2880",
      val: ""
    },
    {
      id: 0x0103,
      title: "4G天线开路检测开关，取值,0：关闭（默认），1：开启。",
      default: "1",
      val: ""
    },
    {
      id: 0x0104,
      title: "发动机限扭反馈点火周期（默认0）",
      default: "0",
      val: ""
    },
    {
      id: 0x0105,
      title: "发动机限扭反馈限扭偏差阈值（默认10%）",
      default: "10",
      val: ""
    },
    {
      id: 0x0106,
      title: "发动机限扭反馈判定间隔周期（默认5分钟）",
      default: "5",
      val: ""
    },
    {
      id: 0x0107,
      title: "4G开路限扭阈值（默认30%）",
      default: "30",
      val: ""
    },
    {
      id: 0x0108,
      title:
        "从正常工作模式转入低功耗模式的时间间隔，单位为分钟（min），参数长度N=2，默认值20（min）。",
      default: "20",
      val: ""
    },
    {
      id: 0x0109,
      title:
        "预见性巡航功能开关，取值,0：关闭，1：开启（默认）。关闭时，预见性巡航报文发送无GPS信号状态下的无效值报文",
      default: "1",
      val: ""
    },
    {
      id: 0x0201,
      title:
        "平台当前时间,BCD[6],格式:YY-MM-DD-hh-mm-ss【此参数必须输入一个值，才能发送至终端，但是，无论输入的值是什么，时间都是服务器的当前时间】",
      default: "2019-01-01",
      val: ""
    },
    {
      id: 0x0202,
      title: "设置车队管理模块的登录密码,（WIFI密码）",
      default: "12345678",
      val: ""
    },
    {
      id: 0x0203,
      title:
        "TS1报文发送开关,参数值长度N=1,参数值(0: 关闭TS1报文的发送,1:开启TS1报文的发送)",
      default: "1",
      val: ""
    },
    {
      id: 0x1000,
      title:
        "停车/怠速/行使状态判定参数,格式为： 速度阈值(byte),发动机转速阈值(byte),停车持续时间(byte),发动机起动阈值(byte)",
      default: "10,5,10,10",
      val: ""
    },
    {
      id: 0x1001,
      title:
        "判定车辆超速事件的设置,格式为： 提示次数|是否语音提示|0,车速阈值,持续时间（单位5s,[0,120]为有效值）,提示文字(保留)",
      default: "0|0|0,100,12",
      val: ""
    },
    {
      id: 0x1002,
      title:
        "判定发动机超转速事件的设置,格式为： 提示次数|是否语音提示|0,转速阈值(单位为100转/分钟),持续时间(s),提示文字",
      default: "0|0|0,21,5",
      val: ""
    },
    {
      id: 0x1003,
      title:
        "判定急加速事件设置,格式为： 提示次数|是否语音提示|0,车速上限阈值（m/s，[0,40]为有效值）,加速度上限阈值（单位0.5m/s²，[1,10]为有效值）,车速下限阈值（[0,40]为有效值）,加速度下限阈值（[1,7]为有效值）,提示文字",
      default: "0|0|0,20,4,5,1",
      val: ""
    },
    {
      id: 0x1004,
      title:
        "判定急减速事件设置,格式为： 提示次数|是否语音提示|0,车速上限阈值（m/s，[0,40]为有效值）,加速度上限阈值（0.5m/s²，[8,10]为有效值）,车速下限阈值（[0,40]为有效值）,加速度下限阈值（[1,7]为有效值）,提示文字",
      default: "0|0|0,20,8,5,4",
      val: ""
    },
    {
      id: 0x1005,
      title:
        "判定空挡滑行事件设置,格式为： 提示次数|是否语音提示|0,空档开关闭合持续时长（s，[0,10]为有效值）,离合器开关开启持续时长（s，[0,10]为有效值）,提示文字",
      default: "0|0|0,3,5",
      val: ""
    },
    {
      id: 0x1006,
      title:
        "判定疲劳驾驶事件设置,格式为： 提示次数|是否语音提示|0,白天连续驾驶时长阈值(min,[60,240]为有效值),白天最小休息时长阈值(min，[20,60]为有效值),白天驾驶起始时刻(HHmmss)," +
        "夜晚连续驾驶时长阈值(min，[60,240]为有效值),夜晚最小休息时长阈值(min，[20,60]为有效值),夜晚驾驶起始时刻(HHmmss),提示文字",
      default: "0|0|0,240,20,060000,240,20,180000",
      val: ""
    },
    {
      id: 0x1007,
      title: "判定偷油、漏油事件设置,格式为： 提示次数|是否语音提示|0,提示文字",
      default: "0|0|0",
      val: ""
    },
    {
      id: 0x1008,
      title:
        "判定停车怠速时长过长事件设置,格式为： 提示次数|是否语音提示|0,停车怠速持续时长阈值（5s，[36,255]为有效值）,提示文字",
      default: "0|0|0,60",
      val: ""
    },
    {
      id: 0x1009,
      title:
        "判定停车轰油门事件设置,格式为： 提示次数|是否语音提示|0,停车轰油门持续时长阈值（0.5s，[0,60]为有效值）,提示文字",
      default: "0|0|0,1",
      val: ""
    },
    {
      id: 0x100a,
      title:
        "发动机冷却液温度报警/机油压力异常判定阈值,格式为： 发动机冷却液温度报警阈值(°C),发动机机油压力过高阈值(4kPa),发动机机油压力过低阈值(4kPa)",
      default: "80,10,1",
      val: ""
    },
    {
      id: 0x100b,
      title:
        "轮胎温度/压力异常判定阈值,格式为： 轮胎温度过高报警阈值(0.03125°C),轮胎压力过高报警阈值(1kPa),轮胎压力过低报警阈值(1kPa)",
      default: "5,10,5",
      val: ""
    },
    {
      id: 0x2001,
      title:
        "油门开度量化值、车速和发动机转速量化值的采样周期，单位为毫秒（ms），默认值50（J6）/100（J7）。",
      default: "100",
      val: ""
    },
    {
      id: 0x2002,
      title: "统计数据上传周期，单位为秒（s），默认值30",
      default: "30",
      val: ""
    },
    {
      id: 0x2003,
      title:
        "车速和发动机转速分段参数配置,格式为： 车速分段个数,车速分段间隔;发动机转速（100r/min）分段列表",
      default: "14,2;5,8,10,12,14,15,17,19,21,23,30",
      val: ""
    },
    {
      id: 0x2004,
      title: "油门开度分段参数配置,格式为： 油门开度分段间隔(%)",
      default: "10",
      val: ""
    },
    {
      id: 0x2005,
      title: "车辆数据上报周期，单位为秒（s）。默认为30秒。",
      default: "30",
      val: ""
    },
    {
      id: 0x2006,
      title: "油门开度量化值，油门开度采样周期，单位为毫秒（ms），默认值50（J6/J7/J71.5） 。",
      default: "50",
      val: ""
    }
];

  constructor(
    private cmdSvc: CmdService,
  ) {}

  ngOnInit() {}

  sendCmd() {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }
    const cmds = [];
    this.config
      .filter(p => p.val !== "")
      .forEach(p => {
        cmds.push(p);
      });

    this.cmdSvc.sendTboxDtuConfig(
      {
        items: cmds,
        vids: this.vids
      },
      data => {
        console.log(data);

        this.cmdSvc.showMessage(data.msg);
      }
    );
    console.log(cmds);
  }

  selectAll() {
    this.config.forEach(o => {
      o.val = o.default;
    });
  }

  cancelAll() {
    this.config.forEach(o => {
      o.val = "";
    });
  }  
}
