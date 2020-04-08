import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from './util.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
    private util: UtilService,
    private menuService: MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // let accessToken = localStorage.getItem('access_token');
    // let accessUrl = localStorage.getItem('access_url');
    // let accessUser = localStorage.getItem('access_user');
    // if (this.util.isNull(accessToken) || this.util.isNull(accessUrl) || this.util.isNull(accessUser)) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // let endUrl = state.url;
    // for (let i = 0; i < this.menuService.menuList.length; i++) {
    //   let tempMenu = this.menuService.menuList[i];
    //   for (let j = 0; j < tempMenu.pages.length; j++) {
    //     let tempPage = tempMenu.pages[j];
    //     if (this.util.startWith(endUrl, tempPage.path)) {
    //       return true;
    //     }
    //   }
    // }
    // this.router.navigate(['/system/security/error', '没有访问权限']);
    // return false;
  }

}
