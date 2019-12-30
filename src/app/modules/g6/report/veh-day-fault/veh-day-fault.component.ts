import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veh-day-fault',
  templateUrl: './veh-day-fault.component.html',
  styleUrls: ['./veh-day-fault.component.css']
})
export class VehDayFaultComponent implements OnInit {

  dataList = [];
  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.dataList.push({ id: i, name: 'aaa' + i, value: 'aaaaaa' + i });
    }
  }
  get20(){
    let temp=[]
    for (let i = 1; i <= 20; i++) {
      temp.push({ id: i, name: 'bbb' + i, value: 'bbbbbb' + i });
    }
    this.dataList=temp;
  }
  get100(){
    let temp=[]
    for (let i = 1; i <= 100; i++) {
      temp.push({ id: i, name: 'ccc' + i, value: 'cccccc' + i });
    }
    this.dataList=temp;
  }
  get200(){
    let temp=[]
    for (let i = 1; i <= 200; i++) {
      temp.push({ id: i, name: 'ddd' + i, value: 'dddddd' + i });
    }
    this.dataList=temp;
  }

}
