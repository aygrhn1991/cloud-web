import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehState'
})
export class VehStatePipe implements PipeTransform {

  transform(value: number, type: number): any {
    let result = '--';
    if (type == 0) {
      switch (value) {
        case 0:
          result = '成功';
          break;
        case 1:
          result = '芯片已备案';
          break;
        case 2:
          result = 'VIN错误';
          break;
        case 3:
          result = '密钥错误（长度不符）';
          break;
        case 4:
          result = '获取芯片型号缓存失败';
          break;
        case 5:
          result = '获取车辆缓存失败';
          break;
        case 6:
          result = '车辆未备案，车辆审核状态3之外的状态';
          break;
        case 7:
          result = '报文结构错误';
          break;
        case 8:
          result = '芯片前缀校验失败';
          break;
        case 9:
          result = '车辆已激活';
          break;
        default:
          break;
      }
    } else if (type == 1) {
      switch (value) {
        case 1:
          result = '在线';
          break;
        case 2:
          result = '不在线';
          break;
        default:
          break;
      }
    } else if (type == 2) {
      switch (value) {
        case 1:
          result = '待审核';
          break;
        case 3:
          result = '审核通过';
          break;
        case 4:
          result = '审核未通过';
          break;
        default:
          break;
      }
    } else if (type == 3) {
      switch (value) {
        case 0:
          result = '未接入';
          break;
        case 1:
          result = '已接入';
          break;
        default:
          break;
      }
    } else {
      result = '--';
    }
    return result;
  }

}
