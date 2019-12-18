import { Component, OnInit, Input } from "@angular/core";
import { CmdService } from "./../cmd.service";

@Component({
  selector: "app-zonar-config",
  templateUrl: "./zonar-config.component.html",
  styleUrls: ["./zonar-config.component.css"]
})
export class ZonarConfigComponent implements OnInit {
  @Input()
  vids = [];
  param1 = {
    checked: false,
    id: 0x3001,
    title: " Zonar信息上报方式参数设置",
    val: ""
  };
  config = [
    {
      checked: false,
      id: 0x3002,
      title: "总里程信号上报参数",
      val: ""
    },
    {
      checked: false,
      id: 0x3003,
      title: "油箱液位信号上报参数",
      val: ""
    }
  ];
  constructor(
    private cmdSvc: CmdService
  ) {}

  ngOnInit() {
    this.config = [];
    this.addCfg(0x3002, "总里程信号上报参数");
    this.addCfg(0x3003, "油箱液位信号上报参数");
    this.addCfg(0x3004, "车速信号上报参数");
    this.addCfg(0x3005, "燃油消耗率信号上报参数");
    this.addCfg(0x3006, "瞬时燃油经济性信号上报参数");
    this.addCfg(0x3007, "发动机平均转速信号上报参数");
    this.addCfg(0x3008, "发动机最高转速信号上报参数");
    this.addCfg(0x3009, "发动机进气歧管温度信号上报参数");
    this.addCfg(0x300a, "室外温度信号上报参数");
    this.addCfg(0x300b, "信号上报参数");
    this.addCfg(0x300c, "信号上报参数");
    this.addCfg(0x300d, "信号上报参数");
    this.addCfg(0x300e, "信号上报参数");
    this.addCfg(0x300f, "信号上报参数");
    this.addCfg(0x3010, "信号上报参数");
    this.addCfg(0x3011, "信号上报参数");
    this.addCfg(0x3012, "信号上报参数");
    this.addCfg(0x3013, "信号上报参数");
    this.addCfg(0x3014, "信号上报参数");
    this.addCfg(0x3015, "信号上报参数");
    this.addCfg(0x3016, "信号上报参数");
    this.addCfg(0x3017, "信号上报参数");
    this.addCfg(0x3018, "信号上报参数");
    this.addCfg(0x3019, "信号上报参数");
    this.addCfg(0x301a, "信号上报参数");
    this.addCfg(0x301b, "信号上报参数");
    this.addCfg(0x301c, "信号上报参数");
    this.addCfg(0x301d, "信号上报参数");
    this.addCfg(0x301e, "信号上报参数");
    this.addCfg(0x301f, "信号上报参数");
    this.addCfg(0x3020, "信号上报参数");
    this.addCfg(0x3021, "信号上报参数");
    this.addCfg(0x3022, "信号上报参数");
    this.addCfg(0x3023, "信号上报参数");
    this.addCfg(0x3024, "信号上报参数");
    this.addCfg(0x3025, "信号上报参数");
    this.addCfg(0x3026, "信号上报参数");
    this.addCfg(0x3027, "信号上报参数");
    this.addCfg(0x3028, "信号上报参数");
    this.addCfg(0x3029, "信号上报参数");
    this.addCfg(0x302a, "信号上报参数");
    this.addCfg(0x302b, "信号上报参数");
    this.addCfg(0x302c, "信号上报参数");
    this.addCfg(0x302d, "信号上报参数");
    this.addCfg(0x302e, "信号上报参数");
    this.addCfg(0x302f, "信号上报参数");
    this.addCfg(0x3030, "信号上报参数");
    this.addCfg(0x3031, "信号上报参数");
    this.addCfg(0x3032, "信号上报参数");
    this.addCfg(0x3033, "信号上报参数");
    this.addCfg(0x3034, "信号上报参数");
    this.addCfg(0x3035, "信号上报参数");
    this.addCfg(0x3036, "信号上报参数");
    this.addCfg(0x3037, "信号上报参数");
    this.addCfg(0x3038, "信号上报参数");
    this.addCfg(0x3039, "信号上报参数");
    this.addCfg(0x303a, "信号上报参数");
    this.addCfg(0x303b, "信号上报参数");
    this.addCfg(0x303c, "信号上报参数");
    this.addCfg(0x303d, "信号上报参数");
    this.addCfg(0x303e, "信号上报参数");

    this.addCfg(0x4001, "信号上报参数");
    this.addCfg(0x4002, "信号上报参数");
    this.addCfg(0x4003, "信号上报参数");
    this.addCfg(0x4004, "信号上报参数");
    this.addCfg(0x4005, "信号上报参数");
    this.addCfg(0x4006, "信号上报参数");
    this.addCfg(0x4007, "信号上报参数");
    this.addCfg(0x4008, "信号上报参数");
    this.addCfg(0x4009, "信号上报参数");
    this.addCfg(0x400a, "信号上报参数");
    this.addCfg(0x400b, "信号上报参数");
    this.addCfg(0x400c, "信号上报参数");
    this.addCfg(0x400d, "信号上报参数");
    this.addCfg(0x400e, "信号上报参数");
    this.addCfg(0x400f, "信号上报参数");
    this.addCfg(0x4010, "信号上报参数");
    this.addCfg(0x4011, "信号上报参数");
    this.addCfg(0x4012, "信号上报参数");
    this.addCfg(0x4013, "信号上报参数");
    this.addCfg(0x4014, "信号上报参数");
    this.addCfg(0x4015, "信号上报参数");
    this.addCfg(0x4016, "信号上报参数");
    this.addCfg(0x4017, "信号上报参数");
    this.addCfg(0x4018, "信号上报参数");
    this.addCfg(0x4019, "信号上报参数");
    this.addCfg(0x401a, "信号上报参数");
    this.addCfg(0x401b, "信号上报参数");
    this.addCfg(0x401c, "信号上报参数");
    this.addCfg(0x401d, "信号上报参数");
    this.addCfg(0x401e, "信号上报参数");
    this.addCfg(0x401f, "信号上报参数");
  }

  addCfg(id: number, title: string) {
    this.config.push({
      checked: false,
      id: id,
      title: title,
      val: ""
    });
  }
  sendCmd = () => {
    if (!this.vids || this.vids.length == 0) {
      this.cmdSvc.showMessage("请至少选择一台待发送指令的车辆");
      return;
    }

    const cc = this.config
      .filter(c => c.checked)
      .map(c => {
        return { id: c.id, val: c.val };
      });
    if (this.param1.checked) {
      cc.push({ id: this.param1.id, val: this.param1.val });
    }

    this.cmdSvc.sendTboxDtuConfig(
      {
        items: cc,
        vids: this.vids
      },
      data => {
        console.log(data);

        this.cmdSvc.showMessage(data.msg);
      }
    );
    console.log(cc);
  };  
}
