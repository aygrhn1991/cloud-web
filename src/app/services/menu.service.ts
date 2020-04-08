import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { PageModel, MenuModel } from '../models/sec.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: Array<MenuModel> = [];
  page: PageModel = new PageModel();
  path: Array<string> = [];

  constructor(private util: UtilService) {
    let access_url = localStorage.getItem('access_url');
    if (!this.util.isNull(access_url)) {
      this.menu = JSON.parse(access_url);
    }
  }

  makeMenu(pages: Array<PageModel>): void {
    this.menu = [];
    let set = new Set();
    pages.forEach((x) => {
      set.add(x.groupName);
    });
    let array = Array.from(set);
    array.forEach((x) => {
      let menuModel = new MenuModel();
      menuModel.name = x.toString();
      menuModel.pages = [];
      pages.forEach((y) => {
        if (y.groupName == menuModel.name) {
          menuModel.pages.push(y);
        }
      });
      this.menu.push(menuModel);
    });
    localStorage.setItem('access_url', JSON.stringify(this.menu));
  }

  matchMenu(endUrl: string): void {
    //匹配侧边栏菜单展开
    this.menu.forEach((x) => {
      x._select = false;
      x.pages.forEach((y) => {
        y._select = false;
        if (endUrl == y.path) {
          x._select = true;
          y._select = true;
          this.page = y;
        }
      });
    });
    //匹配导航条路径
    this.path = [this.page.groupName, this.page.name];
  }

}