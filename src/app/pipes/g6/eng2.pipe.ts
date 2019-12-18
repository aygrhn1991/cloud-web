import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eng2'
})
export class Eng2Pipe implements PipeTransform {

  transform(value: any, arg1: any, arg2: any): any {
    if (value == 65535) {
      return '--';
    } else {
      return value * arg1 + arg2;
    }
  }

}
