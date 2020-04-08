import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { MenuService } from 'src/app/services/menu.service';
import { MenuModel } from 'src/app/models/sec.model';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {

  keyword: string;
  navList: Array<MenuModel> = [];

  constructor(private util: UtilService,
    public menuService: MenuService) { }

  ngOnInit() {
    // this.menuService.menuList.forEach((e) => {
    //   if (e.pages.length == 0) {
    //     this.navList.push(e);
    //   } else {
    //     e.pages.forEach((f) => {
    //       this.navList.push(f);
    //     });
    //   }
    // })
  }

  onChange(value): void {
    // this.navList.forEach((e) => {
    //   e.pages.forEach((f) => {
    //     if (f.pages.length == 0) {
    //       if (!this.util.isNull(value) && f.title.indexOf(value) >= 0) {
    //         f.active = true;
    //       } else {
    //         f.active = false;
    //       }
    //     } else {
    //       f.pages.forEach((g) => {
    //         if (!this.util.isNull(value) && g.title.indexOf(value) >= 0) {
    //           g.active = true;
    //         } else {
    //           g.active = false;
    //         }
    //       });
    //     }
    //   });
    // });
  }
}
