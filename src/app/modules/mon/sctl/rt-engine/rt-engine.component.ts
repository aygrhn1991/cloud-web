import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-rt-engine',
  templateUrl: './rt-engine.component.html',
  styleUrls: ['./rt-engine.component.css']
})
export class RtEngineComponent implements OnInit {
  mstyle = {'width': '100%'};
  lbsize = 160;
  @Input()
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
