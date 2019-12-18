import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-label-icon',
  templateUrl: './label-icon.component.html',
  styleUrls: ['./label-icon.component.css']
})
export class LabelIconComponent implements OnInit {

  @Input()
  lbSize = 80;
  @Input()
  label = '';
  @Input()
  value = '';

  constructor() {
  }

  ngOnInit() {
  }

}
