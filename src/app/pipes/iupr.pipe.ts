import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'iupr'
})
export class IuprPipe implements PipeTransform {

  transform(value: string, idx: number): any {
    const titles = ['OBD Monitoring Conditions Encountered Counts',
      'gnition Counter',
      'Catalyst Monitor Completion Counts Bank 1',
      'Catalyst Monitor Conditions Encountered Counts Bank 1',
      'Catalyst Monitor Completion Counts Bank 2',
      'Catalyst Monitor Conditions Encountered Counts Bank 2',
      'Oxygen Sensor Monitor Completion Counts Bank 1',
      'Oxygen Sensor Monitor Conditions Encountered Counts Bank 1',
      'Oxygen Sensor Monitor Completion Counts Bank 2',
      'Oxygen Sensor Monitor Conditions Encountered Counts Bank 2',
      'EGR and/or VVT Monitor Completion Condition Counts',
      'EGR and/or VVT Monitor Conditions Encountered Counts',
      'AIR Monitor Completion Condition Counts (Secondary Air)',
      'AIR Monitor Conditions Encountered Counts (Secondary Air)',
      'EVAP Monitor Completion Condition Counts',
      'EVAP Monitor Conditions Encountered Counts',
      'Secondary Oxygen Sensor Monitor Completion Counts Bank 1',
      'Secondary Oxygen Sensor Monitor Conditions Encountered Counts Bank 1'
    ];

    let iv = '--';
    if (value) {
      const ss = value.split('');
      iv = ss[idx * 4] + ss[idx * 4 + 1] + ss[idx * 4 + 2] + ss[idx * 4 + 3];
    }

    return {title: titles[idx], val: iv};
  }

}
