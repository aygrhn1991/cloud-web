import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from './util.service';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
    private util: UtilService,
    private navService: NavService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    let accessToken = localStorage.getItem('access_token');
    let accessUrl = localStorage.getItem('access_url');
    let accessUser = localStorage.getItem('access_user');
    if (this.util.isNull(accessToken) || this.util.isNull(accessUrl) || this.util.isNull(accessUser)) {
      this.router.navigate(['/login']);
      return false;
    }
    let endUrl = state.url;
    for (let i = 0; i < this.navService.navList.length; i++) {
      let tempNav = this.navService.navList[i];
      if (tempNav.subnavs.length == 0) {
        if (this.util.startWith(endUrl, tempNav.path)) {
          for (let k = 0; k < tempNav.menus.length; k++) {
            let tempMenu = tempNav.menus[k];
            if (tempMenu.pages.length == 0) {
              if (this.util.startWith(endUrl, tempMenu.path)) {
                return true;
              }
            } else {
              for (let l = 0; l < tempMenu.pages.length; l++) {
                let tempPage = tempMenu.pages[l];
                if (this.util.startWith(endUrl, tempPage.path)) {
                  return true;
                }
              }
            }
          }
        }
      }
      if (tempNav.subnavs.length > 0) {
        for (let j = 0; j < tempNav.subnavs.length; j++) {
          let tempSubNav = tempNav.subnavs[j];
          if (this.util.startWith(endUrl, tempSubNav.path)) {
            for (let k = 0; k < tempSubNav.menus.length; k++) {
              let tempMenu = tempSubNav.menus[k];
              if (tempMenu.pages.length == 0) {
                if (this.util.startWith(endUrl, tempMenu.path)) {
                  return true;
                }
              } else {
                for (let l = 0; l < tempMenu.pages.length; l++) {
                  let tempPage = tempMenu.pages[l];
                  if (this.util.startWith(endUrl, tempPage.path)) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
    this.router.navigate(['/system/security/error', '没有访问权限']);
    return false;
  }

}
