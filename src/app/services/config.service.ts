import { Injectable, Inject } from '@angular/core';
import { Config } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: Config = new Config();

  constructor(private http: HttpClient,
    private title: Title,
    @Inject(DOCUMENT) private document: HTMLDocument) {
    this.http.get('/assets/config.json').subscribe((data: Config) => {
      this.config = data;
      this.title.setTitle(this.config.web_title);
      this.document.getElementById('favicon').setAttribute('href', this.config.web_favicon);
    })
  }

}
