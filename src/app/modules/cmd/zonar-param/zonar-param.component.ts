import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-zonar-param",
  templateUrl: "./zonar-param.component.html",
  styleUrls: ["./zonar-param.component.css"]
})
export class ZonarParamComponent implements OnInit {
  @Input()
  id = "0x3002";
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
  b2 = false;
  b3 = false;
  b4 = false;
  val2 = 1;
  val3_1 = 5;
  val3_2 = 1;
  val3_3 = 30;
  val3_4 = 30;
  val4_1 = 5;
  val4_2 = 60;

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
      this.b1 = this.b2 = this.b3 = this.b4 = false;
    }
    this.calcVal();
  }
  b2click() {
    if (this.b2) {
      this.b3 = false;
      this.b0 = false;
    }
    this.calcVal();
  }
  b3click() {
    if (this.b3) {
      this.b2 = false;
      this.b0 = false;
    }
    this.calcVal();
  }
  b1_4click(event: boolean) {
    if (event) {
      this.b0 = false;
    }
    this.calcVal();
  }
  calcVal() {
    // 计算 数据上传方式   第 0 个字节
    let v0 = 0;
    v0 = this.b0 ? v0 | 1 : v0;
    v0 = this.b1 ? v0 | 2 : v0;
    v0 = this.b2 ? v0 | 4 : v0;
    v0 = this.b3 ? v0 | 8 : v0;
    v0 = this.b4 ? v0 | 16 : v0;

    const v_arr = [v0, 0, 0, 0, 0, 0, 0, 0];
    v_arr[1] = this.b2 ? this.val2 : 0;
    if (this.b3) {
      v_arr[2] = this.val3_1;
      v_arr[3] = this.val3_2;
      v_arr[4] = this.val3_3;
      v_arr[5] = this.val3_4;
    }
    if (this.b4) {
      v_arr[6] = this.val4_1;
      v_arr[7] = this.val4_2;
    }
    const val = v_arr.toString();
    console.log(val);
    this.valChange.emit(val);
  }
}
