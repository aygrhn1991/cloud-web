import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eng4'
})
export class Eng4Pipe implements PipeTransform {

  transform(value: any, arg1: any, arg2: any): any {
    if (value == 4294967295) {
      return '--';
    } else {
      return value * arg1 + arg2;
    }
  }

}
