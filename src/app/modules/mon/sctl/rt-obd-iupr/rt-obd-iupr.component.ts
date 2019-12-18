import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-rt-obd-iupr',
  templateUrl: './rt-obd-iupr.component.html',
  styleUrls: ['./rt-obd-iupr.component.css']
})
export class RtObdIuprComponent implements OnInit {
  mstyle = {'width': '100%'};
  iuprLbsize = 320;
  @Input()
  data: any;

  constructor() {
    this.data = [];
  }

  ngOnInit() {
  }

  calcIupr(value: string, idx: number): any {
    const titles = [
      'OBD Monitoring Conditions Encountered Counts',
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
      'AIR Monitor Completion Condition Counts',
      'AIR Monitor Conditions Encountered Counts',
      'EVAP Monitor Completion Condition Counts',
      'EVAP Monitor Conditions Encountered Counts',
      '2nd Oxygen Sensor Monitor Completion Counts Bank 1',
      '2nd Oxygen Sensor Monitor Conditions Encountered Counts Bank 1'
    ];

    let iv = '空';
    if (value) {
      const ss = value.split('');
      iv = '0x' + ss[idx * 4] + ss[idx * 4 + 1] + ss[idx * 4 + 2] + ss[idx * 4 + 3];
    }

    return {title: titles[idx], val: iv};
  }
}
