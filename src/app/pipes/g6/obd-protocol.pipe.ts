import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obdProtocol'
})
export class ObdProtocolPipe implements PipeTransform {

  transform(value: any): any {
    let result = '--';
    switch (value) {
      case 0:
        result = 'IOS15765';
        break;
      case 1:
        result = 'IOS27145';
        break;
      case 2:
        result = 'SAEJ1939';
        break;
      case 0xFE:
        result = '无效';
      default:
        break;
    }
    return result;
  }

}
