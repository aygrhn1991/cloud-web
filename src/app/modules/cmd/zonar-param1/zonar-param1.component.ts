import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-zonar-param1",
  templateUrl: "./zonar-param1.component.html",
  styleUrls: ["./zonar-param1.component.css"]
})
export class ZonarParam1Component implements OnInit {
  @Input()
  id = "0x3001";
  @Input()
  title = "sjjsjsjsddd";
  @Input()
  checked = false;
  @Output()
  checkedChange = new EventEmitter();
  @Input()
  val = "";
  @Output()
  valChange = new EventEmitter();

  b0 = false;
  b1 = false;
  val0 = 1;
  val1_1 = 5;
  val1_2 = 1;
  val1_3 = 30;
  val1_4 = 30;

  constructor() {}

  fmtSec = (value: number) => `${value} s`;
  ParserSec = (value: string) => value.replace(" s", "");
  fmtMin = (value: number) => `${value} m`;
  ParserMin = (value: string) => value.replace(" m", "");

  ngOnInit() {}

  onCheckedChanged(event) {
    this.checkedChange.emit(event);
  }

  b0click() {
    if (this.b0) {
      this.b1 = false;
    }
    this.calcVal();
  }
  b1click() {
    if (this.b1) {
      this.b0 = false;
    }
    this.calcVal();
  }

  calcVal() {
    // 计算 数据上传方式   第 0 个字节
    let v0 = 0;
    v0 = this.b0 ? v0 | 1 : v0;
    v0 = this.b1 ? v0 | 2 : v0;

    const v_arr = [v0, 0, 0, 0, 0, 0];
    v_arr[1] = this.b0 ? this.val0 : 0;
    if (this.b1) {
      v_arr[2] = this.val1_1;
      v_arr[3] = this.val1_2;
      v_arr[4] = this.val1_3;
      v_arr[5] = this.val1_4;
    }

    const val = v_arr.toString();
    console.log(val);
    this.valChange.emit(val);
  }
}
