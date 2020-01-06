import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  hidden = false;
  @Output()
  hiddenChange = new EventEmitter();

  lbsize = 160;
  constructor() { }

  ngOnInit() {
  }
  onclose() {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

}
