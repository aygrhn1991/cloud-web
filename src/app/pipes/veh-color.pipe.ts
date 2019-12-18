import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'vehColor'
})
export class VehColorPipe implements PipeTransform {

  constructor(private commonService: CommonService) { }

  transform(value: number): any {
    let result = '--';
    for (let i = 0; i < this.commonService.vehColorOptions.length; i++) {
      if (this.commonService.vehColorOptions[i].value == value) {
        result = this.commonService.vehColorOptions[i].label;
        break;
      }
    }
    return result;
  }

}
