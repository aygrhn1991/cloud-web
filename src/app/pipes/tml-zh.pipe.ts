import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tmlZh'
})
/**
 * 时长转换，把秒转换成 ？天？小时？分？秒 的格式
 */
export class TmlZhPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const arr1 = [60, 60, 24];
    const arr2 = ['秒', '分', '小时', '天'];
    const arr3 = [];
    let v = value;
    for (let i = 0; i < arr1.length; i++) {
      const n = Math.floor(v / arr1[i]);
      const m = v - n * arr1[i];
      arr3.push(m);
      v = n;
    }
    arr3.push(v);
    for (let i = arr3.length - 1; i >= 0; i--) {
      if (arr3[i] > 0) {
        let s1 = arr3[i] + arr2[i];
        if (i - 1 >= 0 && arr3[i - 1] > 0) {
          s1 += arr3[i - 1] + arr2[i - 1];
        }
        return s1;
      }
    }
    return '0秒';
  }

}
