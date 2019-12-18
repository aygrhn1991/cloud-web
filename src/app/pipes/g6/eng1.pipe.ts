import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eng1'
})
export class Eng1Pipe implements PipeTransform {

  transform(value: any, arg1: any, arg2: any): any {
    if (value == 255) {
      return '--';
    } else {
      return value * arg1 + arg2;
    }
  }

}
