import { Injectable } from '@angular/core';
import { Dictionary } from '../models/dictionary.model';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() { }

  platform: Array<any> = [
    { value: 1, label: '国六', path: '/cloud/g6/index/index' },
    { value: 2, label: 'TBOX', path: '/cloud/tbox/index/index' },
    { value: 3, label: '新能源', path: '/cloud/ne/index/index' },
  ];

}
