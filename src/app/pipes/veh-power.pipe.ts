import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'vehPower'
})
export class VehPowerPipe implements PipeTransform {

  constructor(private commonService: CommonService) { }

  transform(value: number): any {
    let result = '--';
    for (let i = 0; i < this.commonService.vehPowerOptions.length; i++) {
      if (this.commonService.vehPowerOptions[i].value == value) {
        result = this.commonService.vehPowerOptions[i].label;
        break;
      }
    }
    return result;
  }

}
