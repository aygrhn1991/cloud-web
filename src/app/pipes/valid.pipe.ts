import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'valid'
})
export class ValidPipe implements PipeTransform {

  /**
   * 有效值验证 ，如果值无效，用 -- 显示
   * @param {number} value
   * @param {number} dtType  数据类型 1,2,3,4
   * @param {number} bit  小数点后保留位数
   * @returns {any}
   */
  transform(value: number, dtType: number, bit: number): any {
    const Ms = [0xFF, 0xFFFF, 0xFFFFFF, 0xFFFFFFFF];
    const MStrs = ['0xFF', '0xFFFF', '0xFFFFFF', '0xFFFFFFFF'];
    const m = Ms[dtType - 1];
    const mstr = MStrs[dtType - 1];
    // 无效判定
    if ((!value && value !== 0)) {
      return '空';
    }
    if (value === m) {
      return mstr;
    }
    // 保留小数
    return value.toFixed(bit);
  }

}
