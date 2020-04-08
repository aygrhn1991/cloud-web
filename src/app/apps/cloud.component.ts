import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { ConfigService } from '../services/config.service';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Config } from '../models/config.model';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  contentStyle = {
    height: window.innerHeight - 64 - 26 + 'px',
    overflow: 'auto',
  };
  siderStyle = {
    height: window.innerHeight - 64 + 'px',
    overflow: 'auto',
  };

  constructor(private router: Router,
    public menuService: MenuService,
    public userService: UserService,
    public configService: ConfigService,
    public dictionary: DictionaryService) { }

  ngOnInit() {
    fromEvent(window, 'resize').subscribe(() => {
      this.siderStyle.height = window.innerHeight - 64 + 'px';
      this.contentStyle.height = window.innerHeight - 64 - 26 + 'px';
    })
  }

  //#region 解决侧边栏菜单展开的bug
  flushMenu(e) {
    this.menuService.menu.forEach((x) => {
      x._select = false;
    })
    e._select = true;
  }
  //#endregion

  //#region 注销
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_url');
    localStorage.removeItem('access_user');
    this.router.navigate(['/cloud/login']);
  }
  //#endregion

}
