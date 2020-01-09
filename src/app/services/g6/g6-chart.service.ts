import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class G6ChartService {
  months: Array<string> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  colorText: string = '#29e2f7';
  colorBg: string = '#031f3e';
  colorLine: string = '#063374';
  colorList1: Array<string> = ['#008cff', '#00da9c', '#c4e300'];
  colorList2: Array<string> = ['#29e2f7', '#008cff', '#00da9c', '#c4e300'];
  constructor() { }
  makeG6TestingEng() {
    let option = {
      title: [
        { left: '15%', bottom: '10%', text: '发动机转速', textStyle: { fontSize: 10, color: this.colorText } },
        { left: '47.5%', bottom: '10%', text: '车速', textStyle: { fontSize: 10, color: this.colorText } },
        { left: '75%', bottom: '10%', text: '油箱液位', textStyle: { fontSize: 10, color: this.colorText } }
      ],
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '65%',
          splitNumber: 10,
          min: 0,
          max: 250,
          startAngle: 200,
          endAngle: -20,
          clockwise: true,
          axisLabel: { distance: -12, textStyle: { color: this.colorText, fontSize: 8 } },
          axisLine: { lineStyle: { width: 1, color: [[1, this.colorText]] } },
          axisTick: { length: -5, splitNumber: 10, lineStyle: { width: .5, color: this.colorText } },
          splitLine: { length: -10, lineStyle: { width: 1, color: this.colorText } },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '60%',
          splitNumber: 0,
          min: 0,
          max: 250,
          startAngle: 200,
          endAngle: -20,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 2, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          name: '车速',
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '55%',
          splitNumber: 0,
          min: 0,
          max: 250,
          startAngle: 200,
          endAngle: -20,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 8, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { width: 3 },
          detail: { show: false },
          data: [{ value: 0 }]
        },
        {
          type: 'gauge',
          center: ['20%', '60%'],
          radius: '45%',
          splitNumber: 10,
          min: 0,
          max: 8000,
          startAngle: 225,
          endAngle: 45,
          clockwise: true,
          axisLabel: { distance: -18, textStyle: { color: this.colorText, fontSize: 8 } },
          axisLine: { lineStyle: { width: 1, color: [[1, this.colorText]] } },
          axisTick: { length: -5, splitNumber: 10, lineStyle: { width: .5, color: this.colorText } },
          splitLine: { length: -10, lineStyle: { width: 1, color: this.colorText } },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          type: 'gauge',
          center: ['20%', '60%'],
          radius: '40%',
          splitNumber: 0,
          min: 0,
          max: 8000,
          startAngle: 225,
          endAngle: 45,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 2, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          name: '发动机转速',
          type: 'gauge',
          center: ['20%', '60%'],
          radius: '35%',
          splitNumber: 0,
          min: 0,
          max: 8000,
          startAngle: 225,
          endAngle: 45,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 6, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { width: 2 },
          detail: { show: false },
          data: [{ value: 0 }]
        },
        {
          type: 'gauge',
          center: ['80%', '60%'],
          radius: '45%',
          splitNumber: 10,
          min: 0,
          max: 100,
          startAngle: 135,
          endAngle: -45,
          clockwise: true,
          axisLabel: { distance: -12, textStyle: { color: this.colorText, fontSize: 8 } },
          axisLine: { lineStyle: { width: 1, color: [[1, this.colorText]] } },
          axisTick: { length: -5, splitNumber: 10, lineStyle: { width: .5, color: this.colorText } },
          splitLine: { length: -10, lineStyle: { width: 1, color: this.colorText } },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          type: 'gauge',
          center: ['80%', '60%'],
          radius: '40%',
          splitNumber: 0,
          min: 0,
          max: 100,
          startAngle: 135,
          endAngle: -45,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 2, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { show: false },
          detail: { show: false },
          data: [{ name: '', value: 0 }]
        },
        {
          name: '油箱液位',
          type: 'gauge',
          center: ['80%', '60%'],
          radius: '35%',
          splitNumber: 0,
          min: 0,
          max: 100,
          startAngle: 135,
          endAngle: -45,
          clockwise: true,
          axisLabel: { show: false },
          axisLine: { lineStyle: { width: 6, color: [[1, this.colorText]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { width: 2 },
          detail: { show: false },
          data: [{ value: 0 }]
        }]
    };
    return option;
  }
  
}
