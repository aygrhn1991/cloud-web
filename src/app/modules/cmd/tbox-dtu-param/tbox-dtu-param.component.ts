import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tbox-dtu-param',
  templateUrl: './tbox-dtu-param.component.html',
  styleUrls: ['./tbox-dtu-param.component.css']
})
export class TboxDtuParamComponent implements OnInit {

  @Input()
  code = '0x0010';
  @Input()
  title = 'sjjsjsjsddd';
  @Input()
  default = '00000000000000000000000000000000,00000000000000000000000000000000';
  @Input()
  val = '';
  @Output()
  valChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  defaultClick() {
    this.val = this.default;
    this.valChange.emit(this.val);
  }

  removeClick() {
    this.val = '';
    this.valChange.emit(this.val);
  }

  inputChange(event) {
    this.valChange.emit(this.val);
  }

}
