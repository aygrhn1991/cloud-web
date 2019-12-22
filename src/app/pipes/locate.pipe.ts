import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../services/util.service';

@Pipe({
  name: 'locate'
})
export class LocatePipe implements PipeTransform {

  constructor(private util: UtilService) { }

  transform(value: any, type: number): any {
    if (this.util.isNull(value)) {
      return null;
    }
    return value / Math.pow(10, value.toString().length - type);
  }

}
