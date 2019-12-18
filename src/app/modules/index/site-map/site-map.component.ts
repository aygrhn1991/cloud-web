import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavService } from 'src/app/services/nav.service';
import { NavModel } from 'src/app/models/nav.model';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {

  keyword: string;
  navList: Array<NavModel> = [];

  constructor(private util: UtilService,
    public navService: NavService) { }

  ngOnInit() {
    this.navService.navList.forEach((e) => {
      if (e.subnavs.length == 0) {
        this.navList.push(e);
      } else {
        e.subnavs.forEach((f) => {
          this.navList.push(f);
        });
      }
    })
  }

  onChange(value): void {
    this.navList.forEach((e) => {
      e.menus.forEach((f) => {
        if (f.pages.length == 0) {
          if (!this.util.isNull(value) && f.title.indexOf(value) >= 0) {
            f.active = true;
          } else {
            f.active = false;
          }
        } else {
          f.pages.forEach((g) => {
            if (!this.util.isNull(value) && g.title.indexOf(value) >= 0) {
              g.active = true;
            } else {
              g.active = false;
            }
          });
        }
      });
    });
  }
}
