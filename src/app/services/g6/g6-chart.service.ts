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
  makeReportChart2(title, y1, x) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: title,
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        left: 'center',
        textStyle: { color: '#fff' },
        data: ['里程', '油耗', '行驶时长','排放'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: '{b}<br/>{a0} 上线车数:{c3} 上线率:{c0}%<br/>{a1} 上线车数:{c5} 上线率:{c1}%<br/>{a2} 上线车数:{c7} 上线率:{c2}%<br/>'
      },
      grid: {
        top: '30%',
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        data: x
      }],
      yAxis: [{
        type: 'value',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '油耗差值',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y1
        }]
    };
    return option;
  }
  
}
