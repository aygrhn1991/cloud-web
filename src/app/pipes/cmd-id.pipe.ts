import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cmdId'
})
export class CmdIdPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const fmt = '0x0000';
    const str = value.toString(16);
    const l = str.length;
    return fmt.slice(0, 0 - l) + str;
  }

}
