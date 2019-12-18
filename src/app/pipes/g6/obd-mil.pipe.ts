import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obdMil'
})
export class ObdMilPipe implements PipeTransform {

  transform(value: any): any {
    let result = '--';
    switch (value) {
      case 0:
        result = '未点亮';
        break;
      case 1:
        result = '点亮';
        break;
      case 0xFE:
        result = '无效';
      default:
        break;
    }
    return result;
  }

}
