import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: ConfigModel = new ConfigModel();

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get('/assets/config.json');
  }

}
