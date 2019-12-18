import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { ObdStateModel, IuprModel, DataDownloadModel } from '../models/g6/g6.model';

@Injectable({
  providedIn: 'root'
})
export class G6Service {

  obdStateOptions: Array<ObdStateModel> = [
    { label: '催化转化器监控', value: null },
    { label: '加热催化转化器监控', value: null },
    { label: '蒸发系统监控', value: null },
    { label: '二次空气系统监控', value: null },
    { label: 'A/C系统致冷剂监控', value: null },
    { label: '排气传感器监控', value: null },
    { label: '排气传感器加热器监控', value: null },
    { label: 'EGR系统和VVT监控', value: null },
    { label: '冷启动辅助系统监控', value: null },
    { label: '增压压力控制系统监控', value: null },
    { label: 'DPF监控', value: null },
    { label: 'SCR或NOx吸附器', value: null },//选择性催化还原系统(SCR)或NOx吸附器
    { label: 'NMHC氧化催化器监控', value: null },
    { label: '失火监控', value: null },
    { label: '燃油系统监控', value: null },
    { label: '综合成分监控', value: null },
  ];

  iuprOptions: Array<IuprModel> = [
    { label: 'OBD Monitoring Conditions Encountered Counts', value: null },
    { label: 'Ignition Counter', value: null },
    { label: 'Catalyst Monitor Completion Counts Bank 1', value: null },
    { label: 'Catalyst Monitor Conditions Encountered Counts Bank 1', value: null },
    { label: 'Catalyst Monitor Completion Counts Bank 2', value: null },
    { label: 'Catalyst Monitor Conditions Encountered Counts Bank 2', value: null },
    { label: 'Oxygen Sensor Monitor Completion Counts Bank 1', value: null },
    { label: 'Oxygen Sensor Monitor Conditions Encountered Counts Bank 1', value: null },
    { label: 'Oxygen Sensor Monitor Completion Counts Bank 2', value: null },
    { label: 'Oxygen Sensor Monitor Conditions Encountered Counts Bank 2', value: null },
    { label: 'EGR and/or VVT Monitor Completion Condition Counts', value: null },
    { label: 'EGR and/or VVT Monitor Conditions Encountered Counts', value: null },
    { label: 'AIR Monitor Completion Condition Counts', value: null },
    { label: 'AIR Monitor Conditions Encountered Counts', value: null },
    { label: 'EVAP Monitor Completion Condition Counts', value: null },
    { label: 'EVAP Monitor Conditions Encountered Counts', value: null },
    { label: 'Secondary Oxygen Sensor Monitor Completion Counts Bank 1', value: null },
    { label: 'Secondary Oxygen Sensor Monitor Conditions Encountered Counts Bank 1', value: null },
  ];

  dataDownloadOptions: Array<DataDownloadModel> = [
    { value: 1, label: 'OBD数据' },
    { value: 2, label: '发动机数据' },
    { value: 3, label: '发动机数据(偏移)' },
  ];

  constructor(private util: UtilService) { }

  obdStateDecode(support: number, ready: number): void {
    for (let i = 0; i < this.obdStateOptions.length; i++) {
      let s = this.util.binaryDecode(support, i);
      let r = this.util.binaryDecode(ready, i);
      if (s == 0)
        this.obdStateOptions[i].value = '不支持';
      if (s != 0 && r == 0)
        this.obdStateOptions[i].value = '完成';
      if (s != 0 && r == 1)
        this.obdStateOptions[i].value = '未完成';
    }
  }

  iuprDecode(iupr: string): void {
    for (let i = 0; i < this.iuprOptions.length; i++) {
      this.iuprOptions[i].value = '0x' + iupr.substr(i * 4, 4);
    }
  }

}
