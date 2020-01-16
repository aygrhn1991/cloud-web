import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

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
  makeDashBoard0(mapType, bar_x, bar_y, map) {
    let option = {
      title: {
        top: '5%',
        left: '71%',
        text: '全国装车量排行榜',
        textStyle: { color: '#fff', fontSize: 18 },
        subtext: '单位：辆',
        subtextStyle: { color: '#fff' },
      },
      tooltip: { formatter: '{b}：{c}辆' },
      grid: {
        right: '0%',
        top: '18%',
        bottom: '10%',
        width: '20%',
      },
      xAxis: { show: false },
      yAxis: {
        type: 'category',
        interval: 0,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { margin: 70, textStyle: { color: '#fff', align: 'left' }, rich: { a: { color: '#fff', backgroundColor: '#f0515e', width: 16, height: 16, align: 'center', borderRadius: 2 }, b: { color: '#fff', backgroundColor: '#24a5cd', width: 16, height: 16, align: 'center', borderRadius: 2 }, }, formatter: function (params) { if (parseInt(params.slice(0, 2)) < 3) { return ['{a|' + (parseInt(params.slice(0, 2)) + 1) + '}' + ' ' + params.slice(2)].join('\n') } else { return ['{b|' + (parseInt(params.slice(0, 2)) + 1) + '}' + ' ' + params.slice(2)].join('\n') } } },
        data: bar_x
      },
      visualMap: {
        seriesIndex: [0],
        min: 0,
        max: 100,
        left: '5%',
        bottom: '10%',
        itemHeight: 100,
        text: ['数量'],
        textStyle: { color: '#fff' },
        inRange: { color: ['transparent', this.colorText] },
      },
      series: [
        {
          type: 'map',
          mapType: mapType,
          layoutCenter: ['40%', '50%'],
          layoutSize: '80%',
          itemStyle: { normal: { label: { show: true, color: '#fff' }, borderColor: this.colorText, borderWidth: 1, shadowColor: this.colorText, shadowBlur: 10 }, emphasis: { label: { show: true, color: '#fff' }, areaColor: this.colorText } },
          data: map
        },
        {
          type: 'bar',
          barWidth: 16,
          label: { normal: { show: true } },
          itemStyle: { normal: { barBorderRadius: [0, 15, 15, 0], color: function (params) { if (params.dataIndex < 3) { return { colorStops: [{ offset: 0, color: '#f0515e' }, { offset: 1, color: '#ef8554' }] } } else { return { colorStops: [{ offset: 0, color: '#3c38e4' }, { offset: 1, color: '#24a5cd' }] } } } } },
          tooltip: { show: false },
          data: bar_y
        }]
    };
    return option;
  }
  makeDashBoard1(g6_y, tbox_y, ne_y) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台装车量统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        right: '10%',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        data: this.months,
      }],
      yAxis: [{
        type: 'value',
        name: '辆',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorLine } }
      }],
      series: [
        {
          name: '国六',
          type: 'bar',
          barWidth: 3,
          barGap: 1,
          data: g6_y,
        },
        {
          name: 'TBOX',
          type: 'bar',
          barWidth: 3,
          barGap: 1,
          data: tbox_y,
        },
        {
          name: '新能源',
          type: 'bar',
          barWidth: 3,
          barGap: 1,
          data: ne_y,
        }]
    };
    return option;
  }
  makeDashBoard2(g6_y, tbox_y, ne_y) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台行驶里程统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        right: '10%',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        data: this.months,
      }],
      yAxis: [{
        type: 'value',
        name: 'km',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorLine } }
      }],
      series: [
        {
          name: '国六',
          type: 'line',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          data: g6_y
        },
        {
          name: 'TBOX',
          type: 'line',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          data: tbox_y
        },
        {
          name: '新能源',
          type: 'line',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          data: ne_y
        }]
    };
    return option;
  }
  makeDashBoard3(g6_y, tbox_y, ne_y) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台故障数统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        right: '10%',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        data: this.months,
      }],
      yAxis: [{
        type: 'value',
        name: '次',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorLine } }
      }],
      series: [
        {
          name: '国六',
          type: 'bar',
          barGap: 1,
          stack: 'sum',
          data: g6_y,
        },
        {
          name: 'TBOX',
          type: 'bar',
          barGap: 1,
          stack: 'sum',
          data: tbox_y,
        },
        {
          name: '新能源',
          type: 'bar',
          barGap: 1,
          stack: 'sum',
          data: ne_y,
        }]
    };
    return option;
  }
  makeDashBoard4(g6_y, tbox_y, ne_y) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台接收数据统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        right: '10%',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        data: this.months,
      }],
      yAxis: [{
        type: 'value',
        name: '条',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorLine } }
      }],
      series: [
        {
          name: '国六',
          type: 'line',
          stack: 'sum',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          itemStyle: { normal: { areaStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ offset: 0, color: 'rgba(7,44,90,0.3)' }, { offset: 1, color: 'rgba(0,146,246,0.9)' }]), opacity: 1 } } },
          data: g6_y
        },
        {
          name: 'TBOX',
          type: 'line',
          stack: 'sum',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          itemStyle: { normal: { areaStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ offset: 0, color: 'rgba(7,44,90,0.3)' }, { offset: 1, color: 'rgba(0,212,199,0.9)' }]), opacity: 1 } } },
          data: tbox_y
        },
        {
          name: '新能源',
          type: 'line',
          stack: 'sum',
          smooth: true,
          symbolSize: 3,
          hoverAnimation: false,
          itemStyle: { normal: { areaStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ offset: 0, color: 'rgba(7,44,90,0.3)' }, { offset: 1, color: 'rgba(114,144,89,0.9)' }]), opacity: 1 } } },
          data: ne_y
        }]
    };
    return option;
  }
  makeDashBoard5(sum, g6, tbox, ne) {
    let d1 = [sum, g6, tbox, ne];
    let d2 = [{ value: sum, itemStyle: { normal: { borderColor: this.colorList2[0] } } },
    { value: g6, itemStyle: { normal: { borderColor: this.colorList2[1] } } },
    { value: tbox, itemStyle: { normal: { borderColor: this.colorList2[2] } } },
    { value: ne, itemStyle: { normal: { borderColor: this.colorList2[3] } } }];
    let colors = this.colorList2;
    let option = {
      title: {
        left: '5%',
        top: '5%',
        text: '平台装车量统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        axisLabel: { margin: 30, textStyle: { color: '#fff' } },
        axisLine: { show: false },
        axisTick: { show: false },
        data: ['总装车量', '国六', 'TBOX', '新能源'],
      },
      yAxis: {
        axisLabel: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '顶部圆',
          type: 'pictorialBar',
          symbolSize: [30, 15],
          symbolOffset: [0, -10],
          symbolPosition: 'end',
          itemStyle: { normal: { color: function (params) { return colors[params.dataIndex] } } },
          data: d1
        },
        {
          name: '底部圆',
          type: 'pictorialBar',
          symbolSize: [30, 15],
          symbolOffset: [0, 10],
          itemStyle: { normal: { color: function (params) { return colors[params.dataIndex] } } },
          data: d1
        },
        {
          name: '底部实线环',
          type: 'pictorialBar',
          symbolSize: [40, 20],
          symbolOffset: [0, 15],
          itemStyle: { normal: { color: 'transparent', borderWidth: 4 } },
          data: d2
        },
        {
          name: '底部虚线环',
          type: 'pictorialBar',
          symbolSize: [60, 30],
          symbolOffset: [0, 22],
          itemStyle: { normal: { color: 'transparent', borderType: 'dashed', borderWidth: 5 } },
          data: d2
        },
        {
          type: 'bar',
          itemStyle: { normal: { label: { show: true, position: 'top', distance: 15, color: '#fff' }, color: function (params) { return colors[params.dataIndex] }, opacity: .5 } },
          barWidth: 30,
          data: d1
        }]
    };
    return option;
  }
  makeDashBoard6(sum, g6, tbox, ne) {
    let d1 = [sum, g6, tbox, ne];
    let d2 = [sum, sum, sum, sum];
    let d3 = [sum * 1.01, sum * 1.01, sum * 1.01, sum * 1.01];
    let colors = this.colorList2;
    let option = {
      title: {
        left: '5%',
        top: '5%',
        text: '平台行驶里程统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      grid: {
        top: '30%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{ show: false }],
      yAxis: [
        {
          offset: 15,
          interval: 0,
          inverse: true,
          axisLabel: { textStyle: { color: '#fff' } },
          axisLine: { show: false },
          axisTick: { show: false },
          data: ['总里程', '国六', 'TBOX', '新能源']
        },
        { show: false, inverse: true, data: [] },
        { show: false, inverse: true, data: [] }
      ],
      series: [{
        name: '数据条',
        type: 'bar',
        yAxisIndex: 0,
        barWidth: '50%',
        label: { normal: { show: true, position: 'right', textStyle: { color: '#fff' } } },
        itemStyle: { normal: { color: function (params) { return colors[params.dataIndex] }, barBorderRadius: 20 } },
        data: d1,
      },
      {
        name: '内底',
        type: 'bar',
        yAxisIndex: 1,
        barWidth: '60%',
        barGap: '-100%',
        z: 1,
        itemStyle: { normal: { color: this.colorBg, barBorderRadius: 20 } },
        data: d2,
      },
      {
        name: '外框',
        type: 'bar',
        yAxisIndex: 2,
        barWidth: '70%',
        barGap: '-100%',
        z: 0,
        itemStyle: { normal: { color: function (params) { return colors[params.dataIndex] }, barBorderRadius: 20 } },
        data: d3,
      },
      {
        name: '外圆',
        type: 'scatter',
        yAxisIndex: 2,
        hoverAnimation: false,
        symbolSize: 24,
        z: 2,
        itemStyle: { normal: { color: function (params) { return colors[params.dataIndex] }, opacity: 1 } },
        data: [0, 0, 0, 0],
      }]
    };
    return option;
  }
  makeDashBoard7(sum, g6, tbox, ne) {
    let d1 = [{ value: g6, name: '国六' }, { value: tbox, name: 'TBOX' }, { value: ne, name: '新能源' }];
    let colors1 = this.colorList2.slice(1, 4);
    let colors2 = this.colorList2.slice(0, 1);
    let option = {
      title: {
        left: '5%',
        top: '5%',
        text: '平台故障数统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      series: [
        {
          name: '平台故障数',
          type: 'pie',
          color: colors1,
          hoverAnimation: false,
          radius: ['70%', '50%'],
          center: ['50%', '60%'],
          label: { color: '#fff', align: 'right', formatter: '{b}\n{c}' },
          labelLine: { length: 30, length2: 10 },
          data: d1
        },
        {
          name: '总故障数',
          type: 'pie',
          color: colors2,
          hoverAnimation: false,
          radius: ['48%', '28%'],
          center: ['50%', '60%'],
          label: { show: false },
          data: [{ value: sum, name: '总故障数', label: { normal: { show: true, color: '#fff', position: 'center', formatter: function (params) { return "总故障数\n" + params.value; } } } }]
        }]
    }
    return option;
  }
  makeDashBoard8(sum, g6, tbox, ne) {
    let d1 = [sum, g6, tbox, ne];
    let d2 = [{ value: g6, name: '国六' }, { value: sum + g6 + tbox + ne, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }];
    let d3 = [{ value: tbox, name: 'TBOX' }, { value: sum + g6 + tbox + ne, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }];
    let d4 = [{ value: ne, name: '新能源' }, { value: sum + g6 + tbox + ne, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }];
    let option = {
      color: this.colorList2,
      title: {
        left: '5%',
        top: '5%',
        text: '平台接收数据统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: 'center',
        left: '60%',
        orient: 'vertical',
        textStyle: { color: '#fff' },
        data: ['总数据数', '国六', 'TBOX', '新能源'],
      },
      grid: {
        top: '22%',
        bottom: '47%',
        left: '35%'
      },
      yAxis: [{
        type: 'category',
        inverse: true,
        axisLabel: { inside: true, interval: 0, textStyle: { color: '#fff' } },
        axisLine: { show: false },
        axisTick: { show: false },
        data: d1
      }],
      xAxis: [{ show: false }],
      series: [
        {
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: ['70%', '65%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: [{ value: 3, name: '总数据数' }, { value: 1, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }]
        },
        {
          name: '',
          type: 'pie',
          z: 1,
          clockWise: false,
          hoverAnimation: false,
          radius: ['70%', '65%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: [{ value: 3, itemStyle: { color: this.colorBg } }, { value: 1, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }]
        },
        {
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: ['55%', '50%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: d2
        },
        {
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false,
          hoverAnimation: false,
          radius: ['55%', '50%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: [{ value: 3, itemStyle: { color: this.colorBg } }, { value: 1, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }]
        },
        {
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: ['40%', '35%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: d3
        },
        {
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false,
          hoverAnimation: false,
          radius: ['40%', '35%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: [{ value: 3, itemStyle: { color: this.colorBg } }, { value: 1, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }]
        },
        {
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: ['25%', '20%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: d4
        },
        {
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false,
          hoverAnimation: false,
          radius: ['25%', '20%'],
          center: ['35%', '60%'],
          label: { show: false },
          data: [{ value: 3, itemStyle: { color: this.colorBg } }, { value: 1, name: '', itemStyle: { color: 'rgba(0,0,0,0)' } }]
        }]
    };
    return option;
  }
  makeDashBoard9(g6, tbox, ne, g6_sum, tbox_sum, ne_sum) {
    let d1 = g6 + tbox + ne;
    let d2 = g6_sum + tbox_sum + ne_sum;
    let option = {
      color: this.colorList2,
      series: [{
        name: '第一个圆环',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['80%', '60%'],
        center: ['20%', '50%'],
        data: [
          { value: d1, label: { normal: { show: true, position: 'center', color: '#fff', formatter: function (params) { return "总在线数\n" + params.value; } } }, itemStyle: { normal: { color: this.colorList2[0] } } },
          { value: d2 - d1, name: 'invisible', label: { show: false }, labelLine: { show: false }, itemStyle: { normal: { color: this.colorBg } } }]
      },
      {
        name: '第二个圆环',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['80%', '60%'],
        center: ['40%', '50%'],
        data: [
          { value: g6, label: { normal: { show: true, position: 'center', color: '#fff', formatter: function (params) { return "国六在线\n" + params.value; } } }, itemStyle: { normal: { color: this.colorList2[1] } } },
          { value: g6_sum - g6, name: 'invisible', label: { show: false }, labelLine: { show: false }, itemStyle: { normal: { color: this.colorBg } } }]
      },
      {
        name: '第三个圆环',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['80%', '60%'],
        center: ['60%', '50%'],
        data: [
          { value: tbox, label: { normal: { show: true, position: 'center', color: '#fff', formatter: function (params) { return "TBOX在线\n" + params.value; } } }, itemStyle: { normal: { color: this.colorList2[2] } } },
          { value: tbox_sum - tbox, name: 'invisible', label: { show: false }, labelLine: { show: false }, itemStyle: { normal: { color: this.colorBg } } }]
      },
      {
        name: '第4个圆环',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['80%', '60%'],
        center: ['80%', '50%'],
        data: [
          { value: ne, label: { normal: { show: true, position: 'center', color: '#fff', formatter: function (params) { return "新能源在线\n" + params.value; } } }, itemStyle: { normal: { color: this.colorList2[3] } } },
          { value: ne_sum - ne, name: 'invisible', label: { show: false }, labelLine: { show: false }, itemStyle: { normal: { color: this.colorBg } } }]
      }]
    };
    return option;
  }
  makeDashBoard10(g6_line, g6_sum, g6, tbox_line, tbox_sum, tbox, ne_line, ne_sum, ne) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台故障率统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        left: 'center',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: '{b}<br/>{a0} 故障车数:{c3} 故障率:{c0}%<br/>{a1} 故障车数:{c5} 故障率:{c1}%<br/>{a2} 故障车数:{c7} 故障率:{c2}%<br/>'
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
        data: this.months,
      }],
      yAxis: [{
        type: 'value',
        name: '辆',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '国六',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: g6_line
        },
        {
          name: 'TBOX',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: tbox_line
        },
        {
          name: '新能源',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: ne_line
        },
        {
          name: '国六故障车辆',
          type: 'bar',
          stack: 'sum1',
          barGap: 1,
          barWidth: 3,
          data: g6
        },
        {
          name: '国六车辆总数',
          type: 'bar',
          stack: 'sum1',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: g6_sum
        },
        {
          name: 'TBOX故障车辆',
          type: 'bar',
          stack: 'sum2',
          barGap: 1,
          barWidth: 3,
          data: tbox
        },

        {
          name: 'TBOX车辆总数',
          type: 'bar',
          stack: 'sum2',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: tbox_sum
        },
        {
          name: '新能源故障车辆',
          type: 'bar',
          stack: 'sum3',
          barGap: 1,
          barWidth: 3,
          data: ne
        },
        {
          name: '新能源车辆总数',
          type: 'bar',
          stack: 'sum3',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: ne_sum
        }]
    };
    return option;
  }
  makeDashBoard11(x, g6_line, g6_sum, g6, tbox_line, tbox_sum, tbox, ne_line, ne_sum, ne) {
    let option = {
      color: this.colorList1,
      title: {
        left: '5%',
        top: '5%',
        text: '各平台上线率统计',
        textStyle: { fontSize: 16, color: this.colorText }
      },
      legend: {
        top: '15%',
        left: 'center',
        textStyle: { color: '#fff' },
        data: ['国六', 'TBOX', '新能源'],
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
        name: '辆',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '国六',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: g6_line
        },
        {
          name: 'TBOX',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: tbox_line
        },
        {
          name: '新能源',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: ne_line
        },
        {
          name: '国六上线车辆',
          type: 'bar',
          stack: 'sum1',
          barGap: 1,
          barWidth: 3,
          data: g6
        },
        {
          name: '国六车辆总数',
          type: 'bar',
          stack: 'sum1',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: g6_sum
        },
        {
          name: 'TBOX上线车辆',
          type: 'bar',
          stack: 'sum2',
          barGap: 1,
          barWidth: 3,
          data: tbox
        },

        {
          name: 'TBOX车辆总数',
          type: 'bar',
          stack: 'sum2',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: tbox_sum
        },
        {
          name: '新能源上线车辆',
          type: 'bar',
          stack: 'sum3',
          barGap: 1,
          barWidth: 3,
          data: ne
        },
        {
          name: '新能源车辆总数',
          type: 'bar',
          stack: 'sum3',
          barWidth: 3,
          itemStyle: { normal: { color: this.colorBg } },
          data: ne_sum
        }]
    };
    return option;
  }
  makeReportChart4(title, y1, y2, y3, y4, x) {
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
        data: ['里程', '油耗', '行驶时长', '排放'],
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
        name: '辆',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '里程',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y1
        },
        {
          name: '油耗',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y2
        },
        {
          name: '行驶时长',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y3
        },
        {
          name: '排放',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y4
        }]
    };
    return option;
  }
  makeReportChart1(title, y1, x) {
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
        data: ['里程', '油耗', '行驶时长', '排放'],
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
  makeReportChart2(title, y1, y2, x) {
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
        data: ['里程', '百公里油耗'],
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
        name: '油耗',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      {
        type: 'value',
        name: '百公里油耗',
        max: 200,
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '油耗',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y1
        },
        {
          name: '百公里油耗',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: y2
        },]
    };
    return option;
  }
  makeReportChart3(title, y1, y2, y3, x) {
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
        data: ['时长', '油耗','排放'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        // formatter: '{b}<br/>{a0} 上线车数:{c3} 上线率:{c0}%<br/>{a1} 上线车数:{c5} 上线率:{c1}%<br/>{a2} 上线车数:{c7} 上线率:{c2}%<br/>'
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
        name: '油耗',
        nameTextStyle: { color: '#fff' },
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { lineStyle: { color: this.colorLine } },
        axisTick: { show: false },
        splitLine: { show: false }
      }],
      series: [
        {
          name: '时长',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          lineStyle: { width: 1 },
          data: y1
        },
        {
          name: '油耗',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: y2
        }, ,
        {
          name: '排放',
          type: 'line',
          smooth: true,
          symbolSize: 2,
          hoverAnimation: false,
          yAxisIndex: 1,
          lineStyle: { width: 1 },
          data: y3
        }]
    };
    return option;
  }
}
