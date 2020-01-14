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
  makeMap(mapType, map) {
    let option = {
      title: {
        top: '5%',
        left: 'center',
        text: '全国装车量分布',
        textStyle: { color: '#fff', fontSize: 26 },
        subtext: '单位：辆',
        subtextStyle: { color: '#fff' },
      },
      tooltip: { formatter: '{b}：{c}辆' },
      visualMap: {
        min: 0,
        max: 100,
        left: '5%',
        bottom: '10%',
        itemHeight: 100,
        text: ['数量'],
        textStyle: { color: '#fff' },
        inRange: { color: ['transparent', this.colorText] },
      },
      series: [{
        type: 'map',
        mapType: mapType,
        layoutCenter: ['50%', '50%'],
        layoutSize: '90%',
        itemStyle: { normal: { label: { show: true, color: '#fff' }, borderColor: this.colorText, borderWidth: 1, shadowColor: this.colorText, shadowBlur: 10 }, emphasis: { label: { show: true, color: '#fff' }, areaColor: this.colorText } },
        data: map
      }]
    };
    return option;
  }

}
