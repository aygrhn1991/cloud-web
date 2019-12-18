import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'xzqh2'
})
export class Xzqh2Pipe implements PipeTransform {

  constructor(private commonService: CommonService) { }

  transform(value: any): any {
    return this.commonService.getXzqhString(value);
  }

}
