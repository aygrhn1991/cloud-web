import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-xzqh',
  templateUrl: './xzqh.component.html',
  styleUrls: ['./xzqh.component.css']
})
export class XzqhComponent implements OnInit, OnChanges {

  @Input() value: number;
  @Output() valueChange = new EventEmitter();

  name: Array<any>;
  nzOptions = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.nzOptions = this.commonService.xzqhTree;
  }

  onChanges(values: Array<number>): void {
    if (values.length == 0) {
      this.value = null;
    } else {
      this.value = values[values.length - 1];
    }
    this.valueChange.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.name = this.commonService.getXzqhArray(this.value);
  }

}
