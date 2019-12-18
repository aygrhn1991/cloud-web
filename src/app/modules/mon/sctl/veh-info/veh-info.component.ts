import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var IoVLib;
@Component({
  selector: 'app-veh-info',
  templateUrl: './veh-info.component.html',
  styleUrls: ['./veh-info.component.css']
})
export class VehInfoComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  hidden = false;
  @Output()
  hiddenChange = new EventEmitter();
  @Output()
  dtcClick = new EventEmitter();
  plat = 1;

  constructor() {
    this.plat = IoVLib.plat;
  }

  ngOnInit() {
  }

  onclose() {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

  ondtcclick(event) {
    this.dtcClick.emit(event);
  }

}
