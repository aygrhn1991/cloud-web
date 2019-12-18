import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-rt-obd-dtc',
  templateUrl: './rt-obd-dtc.component.html',
  styleUrls: ['./rt-obd-dtc.component.css']
})
export class RtObdDtcComponent implements OnInit {
  mstyle = {'width': '100%'};
  iuprLbsize = 300;
  @Input()
  data: any;

  constructor() {
    this.data = [];
  }

  ngOnInit() {
  }

  onclose() {
    this.data = null;
  }
}
