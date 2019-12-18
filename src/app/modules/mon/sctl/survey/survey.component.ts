import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {

  mstyle = {'width': '100%'};
  @Input()
  data: any;

  constructor() {
  }

  ngOnInit() {
  }


}
