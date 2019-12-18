import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rt-obd',
  templateUrl: './rt-obd.component.html',
  styleUrls: ['./rt-obd.component.css']
})
export class RtObdComponent implements OnInit {

  mstyle = {'width': '100%'};
  lbsize = 120;
  iuprLbsize = 300;
  @Input()
  data: any;
  @Output()
  dtcClick = new EventEmitter();

  constructor() {
    this.data = [];
  }

  ngOnInit() {
  }

  /**
   * 计算各监控器状态
   * @param {number} suportVal
   * @param {number} readyVal
   * @param {number} bit
   * @returns {number} 监控器状态，0不支持，1测试未完成，2 测试完成
   */
  calcMonitorStatus(suportVal: number, readyVal: number, bit: number): number {
    // 计算 位 值
    const bitVal = Math.pow(2, bit);
    // 计算 是否 支持,1支持，0不支持
    const isSuport = (suportVal & bitVal) === bitVal;
    // 计算 是否 准备就绪，1测试未完成，0测试完成
    const isReady = (readyVal & bitVal) === bitVal;
    return (!isSuport) ? 0 : (isReady ? 1 : 2);
  }

  calcIupr(value: string, idx: number): any {
    const titles = ['OBD Monitoring Conditions Encountered Counts',
      'gnition Counter',
      'Catalyst Monitor Completion Counts Bank 1',
      'Catalyst Monitor Conditions Encountered Counts Bank 1',
      'Catalyst Monitor Completion Counts Bank 2',
      'Catalyst Monitor Conditions Encountered Counts Bank 2',
      'Oxygen Sensor Monitor Completion Counts Bank 1',
      'Oxygen Sensor Monitor Conditions Encountered Counts Bank 1',
      'Oxygen Sensor Monitor Completion Counts Bank 2',
      'Oxygen Sensor Monitor Conditions Encountered Counts Bank 2',
      'EGR and/or VVT Monitor Completion Condition Counts',
      'EGR and/or VVT Monitor Conditions Encountered Counts',
      'AIR Monitor Completion Condition Counts (Secondary Air)',
      'AIR Monitor Conditions Encountered Counts (Secondary Air)',
      'EVAP Monitor Completion Condition Counts',
      'EVAP Monitor Conditions Encountered Counts',
      'Secondary Oxygen Sensor Monitor Completion Counts Bank 1',
      'Secondary Oxygen Sensor Monitor Conditions Encountered Counts Bank 1'
    ];

    let iv = '--';
    if (value) {
      const ss = value.split('');
      iv = '0x' + ss[idx * 4] + ss[idx * 4 + 1] + ss[idx * 4 + 2] + ss[idx * 4 + 3];
    }

    return {title: titles[idx], val: iv};
  }

  ondtcclikc(idx: number) {
    const d = this.data;
    if (d) {
      console.log(d.dtcs[idx], d.faultCodes[idx])
      this.dtcClick.emit({
        dtc: d.dtcs[idx],
        fc: d.faultCodes[idx],
        attm: d.attm
      });
    }

  }
}
