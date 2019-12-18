import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmdview-jt808',
  templateUrl: './cmdview-jt808.component.html',
  styleUrls: ['./cmdview-jt808.component.css']
})
export class CmdviewJt808Component implements OnInit {
  vids = [];
  cmdType = 11;
  constructor() {}

  ngOnInit() {}

  onVidsChanged(vids) {
    this.vids = vids;
  }
}
