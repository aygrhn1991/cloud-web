import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Pipe({
  name: 'engLocate'
})
export class EngLocatePipe implements PipeTransform {

  constructor(private util: UtilService) { }

  transform(value: any): any {
    let result = '';
    if (!this.util.isNull(value)) {
      result += this.util.binaryDecode(value, 1) == 0 ? '已定位' : '未定位';
      if (this.util.binaryDecode(value, 1) == 0) {
        result += '-' + (this.util.binaryDecode(value, 2) == 0 ? '北纬' : '南纬');
        result += '-' + (this.util.binaryDecode(value, 3) == 0 ? '东经' : '西经');
      }
    } else {
      result = '--';
    }
    return result;
  }

}
