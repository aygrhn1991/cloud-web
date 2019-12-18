import { Injectable } from '@angular/core';
import { NavModel } from '../models/nav.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  navList: Array<NavModel> = [];
  currentNav: NavModel = new NavModel();
  currentPath: Array<string> = [];

  constructor(private util: UtilService) { }

  makeNav(navs: Array<NavModel>): Array<NavModel> {
    let indexMenuList: Array<NavModel> = [
      { title: '仪表盘', path: '/index/dash-board', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '网站地图', path: '/index/site-map', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '快捷查询', path: '/index/quick-search', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
    ];
    let systemMenuList: Array<NavModel> = [
      {
        title: '安全管理', path: '/system/security', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '用户管理', path: '/system/security/user', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '角色管理', path: '/system/security/role', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
      {
        title: '系统设置', path: '/system/setting', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '车辆型号管理', path: '/system/setting/veh-code', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '终端制造商管理', path: '/system/setting/dtu-manu', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      }
    ];
    let monMenuList: Array<NavModel> = [
      { title: '地图监控', path: '/mon/sctl', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '轨迹查询', path: '/mon/track', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
    ];
    let cmdMenuList: Array<NavModel> = [
      { title: '国六指令', path: '/cmd/g6', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: 'TBOX指令', path: '/cmd/tbox', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '新能源指令', path: '/cmd/ne', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
    ];
    let docMenuList: Array<NavModel> = [
      { title: '国六档案', path: '/doc/g6', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: 'TBOX档案', path: '/doc/tbox', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '新能源档案', path: '/doc/ne', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
    ];
    let testingMenuList: Array<NavModel> = [
      { title: '国六检测', path: '/testing/g6/testing', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: 'TBOX检测', path: '/testing/tbox/testing', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '新能源检测', path: '/testing/ne/testing', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
    ];
    let g6MenuList: Array<NavModel> = [
      {
        title: '基本信息', path: '/g6/basic', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '车辆管理', path: '/g6/basic/veh', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
      {
        title: '数据查询', path: '/g6/data', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '发动机数据查询', path: '/g6/data/data-eng', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: 'OBD数据查询', path: '/g6/data/data-obd', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: 'ODO里程查询', path: '/g6/data/odo-mile', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '在线日志查询', path: '/g6/data/online-log', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
      {
        title: '任务下载', path: '/g6/download', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '自定义任务下载', path: '/g6/download/custom', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
      {
        title: '备案管理', path: '/g6/doc', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '发动机型号备案', path: '/g6/doc/eng-mode', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '车辆型号备案', path: '/g6/doc/veh-mode', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '芯片型号备案', path: '/g6/doc/chip-mode', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '芯片型号标识符申请', path: '/g6/doc/chip-prefix', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '终端型号备案', path: '/g6/doc/dtu-mode', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '终端型号授权备案', path: '/g6/doc/dtu-authority', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '车辆备案', path: '/g6/doc/veh-doc', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '备案接口调试', path: '/g6/doc/api-test', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
          { title: '备案平台管理', path: '/g6/doc/doc-manage', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
    ];
    let tboxMenuList: Array<NavModel> = [
      {
        title: '基本信息', path: '/tbox/basic', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '车辆管理', path: '/tbox/basic/veh', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      },
      {
        title: '任务下载', path: '/tbox/download', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [
          { title: '自定义任务下载', path: '/tbox/download/custom', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
        ]
      }
    ];
    let navList: Array<NavModel> = [
      { title: '首页', path: '/index', selected: false, active: false, show: true, subnavs: [], menus: indexMenuList, pages: [] },
      { title: '系统', path: '/system', selected: false, active: false, show: true, subnavs: [], menus: systemMenuList, pages: [] },
      { title: '监控', path: '/mon', selected: false, active: false, show: true, subnavs: [], menus: monMenuList, pages: [] },
      { title: '指令', path: '/cmd', selected: false, active: false, show: true, subnavs: [], menus: cmdMenuList, pages: [] },
      { title: '围栏', path: '/enc', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '档案', path: '/doc', selected: false, active: false, show: true, subnavs: [], menus: docMenuList, pages: [] },
      { title: '行为', path: '/behavior', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] },
      { title: '检测', path: '/testing', selected: false, active: false, show: true, subnavs: [], menus: testingMenuList, pages: [] },
      {
        title: '平台', path: null, selected: false, active: false, show: true, subnavs: [
          { title: '国六', path: '/g6', selected: false, active: false, show: true, subnavs: [], menus: g6MenuList, pages: [] },
          { title: 'T-BOX', path: '/tbox', selected: false, active: false, show: true, subnavs: [], menus: tboxMenuList, pages: [] },
          { title: '新能源', path: '/ne', selected: false, active: false, show: true, subnavs: [], menus: [], pages: [] }
        ], menus: [], pages: []
      }
    ];
    return navList;
  }
  getNav() {
    return JSON.parse(localStorage.getItem('access_url'));
  }
  //处理菜单的选中属性
  handleNavSelected(endUrl: string) {
    this.navList.forEach(nav => {
      nav.selected = false;
      if (nav.subnavs.length == 0) {
        if (this.util.startWith(endUrl, nav.path)) {
          nav.selected = true;
          this.currentNav = nav;
          nav.menus.forEach(menu => {
            menu.selected = false;
            if (menu.pages.length == 0) {
              if (this.util.startWith(endUrl, menu.path)) {
                menu.selected = true;
              }
            } else {
              menu.pages.forEach(page => {
                page.selected = false;
                if (this.util.startWith(endUrl, page.path)) {
                  page.selected = true;
                  menu.selected = true;
                }
              });
            }
          });
        }
      }
      if (nav.subnavs.length > 0) {
        nav.subnavs.forEach(subnav => {
          if (this.util.startWith(endUrl, subnav.path)) {
            nav.selected = true;
            this.currentNav = subnav;
            subnav.menus.forEach(menu => {
              menu.selected = false;
              if (menu.pages.length == 0) {
                if (this.util.startWith(endUrl, menu.path)) {
                  menu.selected = true;
                }
              } else {
                menu.pages.forEach(page => {
                  page.selected = false;
                  if (this.util.startWith(endUrl, page.path)) {
                    page.selected = true;
                    menu.selected = true;
                  }
                });
              }
            });
          }
        });
      }

    });
  }
  //处理页面路径
  handleNavPath() {
    this.currentPath = [];
    this.currentPath.push(this.currentNav.title);
    this.currentNav.menus.forEach(menu => {
      if (menu.pages.length == 0) {
        if (menu.selected == true) {
          this.currentPath.push(menu.title);
        }
      } else {
        menu.pages.forEach(page => {
          if (page.selected == true) {
            this.currentPath.push(menu.title);
            this.currentPath.push(page.title);
          }
        });
      }
    });
  }

}
