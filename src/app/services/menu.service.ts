import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuList: Array<MenuModel> = [];
  currentMenu: MenuModel = new MenuModel();
  currentPath: Array<string> = [];

  constructor(private util: UtilService) { }

  makeMenu(menus: Array<MenuModel>): Array<MenuModel> {
    let g6MenuList: Array<MenuModel> = [
      {
        title: '快捷操作', path: null, selected: false, active: false, show: true, pages: [
          { title: '首页', path: '/g6/index/index', selected: false, active: false, show: true, pages: [] },
          { title: '网站地图', path: '/g6/index/site-map', selected: false, active: false, show: true, pages: [] },
          { title: '快捷查询', path: '/g6/index/quick-search', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '基本信息', path: null, selected: false, active: false, show: true, pages: [
          { title: '车辆管理', path: '/g6/basic/veh', selected: false, active: false, show: true, pages: [] },
          { title: '车辆型号管理', path: '/system/setting/veh-code', selected: false, active: false, show: true, pages: [] },
          { title: '终端制造商管理', path: '/system/setting/dtu-manu', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '数据查询', path: null, selected: false, active: false, show: true, pages: [
          { title: '发动机数据查询', path: '/g6/data/data-eng', selected: false, active: false, show: true, pages: [] },
          { title: 'OBD数据查询', path: '/g6/data/data-obd', selected: false, active: false, show: true, pages: [] },
          { title: 'ODO里程查询', path: '/g6/data/odo-mile', selected: false, active: false, show: true, pages: [] },
          { title: '在线日志查询', path: '/g6/data/online-log', selected: false, active: false, show: true, pages: [] },
          { title: '百公里油耗统计', path: '/g6/data/fuel-month', selected: false, active: false, show: true, pages: [] },
          { title: '百公里油耗明细', path: '/g6/data/fuel-day', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '任务下载', path: null, selected: false, active: false, show: true, pages: [
          { title: '自定义任务下载', path: '/g6/download/custom', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '车辆报告', path: null, selected: false, active: false, show: true, pages: [
          { title: '车辆报告', path: '/g6/report/report', selected: false, active: false, show: true, pages: [] },

          { title: '单车日报', path: '/g6/report/veh-day-report', selected: false, active: false, show: true, pages: [] },
          { title: '单车日聚合', path: '/g6/report/veh-day-sum', selected: false, active: false, show: true, pages: [] },
          { title: '单车故障日报', path: '/g6/report/veh-day-fault', selected: false, active: false, show: true, pages: [] },

          { title: '运行分析（月）', path: '/g6/report/veh-month-report', selected: false, active: false, show: true, pages: [] },
          { title: '运行分析（年）', path: '/g6/report/veh-year-report', selected: false, active: false, show: true, pages: [] },
          { title: '怠速停车分析', path: '/g6/report/veh-idling', selected: false, active: false, show: true, pages: [] },
          { title: '车速-油耗', path: '/g6/report/veh-speed-fuel', selected: false, active: false, show: true, pages: [] },
          { title: '车速-百公里油耗差值', path: '/g6/report/veh-speed-fuel-diff', selected: false, active: false, show: true, pages: [] },
          { title: '车速-排放', path: '/g6/report/veh-speed-output', selected: false, active: false, show: true, pages: [] },
          { title: '车速-百公里排放差值', path: '/g6/report/veh-speed-output-diff', selected: false, active: false, show: true, pages: [] },

          { title: '车速-时长', path: '/g6/report/oem-speed-duration', selected: false, active: false, show: true, pages: [] },
          { title: '车速-里程', path: '/g6/report/oem-speed-mile', selected: false, active: false, show: true, pages: [] },
          { title: '车速-油耗', path: '/g6/report/oem-speed-fuel', selected: false, active: false, show: true, pages: [] },
          { title: '车速-排放', path: '/g6/report/oem-speed-output', selected: false, active: false, show: true, pages: [] },
          { title: '工况明细', path: '/g6/report/oem-condition', selected: false, active: false, show: true, pages: [] },
          { title: '工况汇总', path: '/g6/report/oem-condition-sum', selected: false, active: false, show: true, pages: [] },
          { title: '怠速停车', path: '/g6/report/oem-idling', selected: false, active: false, show: true, pages: [] },
          { title: '故障码密度', path: '/g6/report/oem-fault', selected: false, active: false, show: true, pages: [] },
          { title: '百公里均值', path: '/g6/report/oem-average-report', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '指令下发', path: null, selected: false, active: false, show: true, pages: [
          { title: '指令下发', path: '/g6/cmd/cmd', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '地图监控', path: null, selected: false, active: false, show: true, pages: [
          { title: '地图监控', path: '/g6/mon/mon', selected: false, active: false, show: true, pages: [] },
          { title: '轨迹查询', path: '/mon/track', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '电子围栏', path: null, selected: false, active: false, show: true, pages: [
          { title: '电子围栏', path: '/g6/enc/enc', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '设备检测', path: null, selected: false, active: false, show: true, pages: [
          { title: '设备检测', path: '/g6/testing/testing', selected: false, active: false, show: true, pages: [] },
          { title: '历史回放', path: '/g6/testing/playback', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '备案管理', path: null, selected: false, active: false, show: true, pages: [
          { title: '发动机型号备案', path: '/g6/doc/eng-mode', selected: false, active: false, show: true, pages: [] },
          { title: '车辆型号备案', path: '/g6/doc/veh-mode', selected: false, active: false, show: true, pages: [] },
          { title: '芯片型号备案', path: '/g6/doc/chip-mode', selected: false, active: false, show: true, pages: [] },
          { title: '芯片型号标识符申请', path: '/g6/doc/chip-prefix', selected: false, active: false, show: true, pages: [] },
          { title: '终端型号备案', path: '/g6/doc/dtu-mode', selected: false, active: false, show: true, pages: [] },
          { title: '终端型号授权备案', path: '/g6/doc/dtu-authority', selected: false, active: false, show: true, pages: [] },
          { title: '车辆备案', path: '/g6/doc/veh-doc', selected: false, active: false, show: true, pages: [] },
          { title: '备案接口调试', path: '/g6/doc/api-test', selected: false, active: false, show: true, pages: [] },
          { title: '备案平台管理', path: '/g6/doc/doc-manage', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '系统设置', path: null, selected: false, active: false, show: true, pages: [
          { title: '用户管理', path: '/system/security/user', selected: false, active: false, show: true, pages: [] },
          { title: '角色管理', path: '/system/security/role', selected: false, active: false, show: true, pages: [] },
        ]
      },
    ];
    let tboxMenuList: Array<MenuModel> = [
      {
        title: '基本信息', path: '/tbox/basic', selected: false, active: false, show: true, pages: [
          { title: '车辆管理', path: '/tbox/basic/veh', selected: false, active: false, show: true, pages: [] },
        ]
      },
      {
        title: '任务下载', path: '/tbox/download', selected: false, active: false, show: true, pages: [
          { title: '自定义任务下载', path: '/tbox/download/custom', selected: false, active: false, show: true, pages: [] },
        ]
      }
    ];
    return g6MenuList;
  }
  getMenu() {
    return JSON.parse(localStorage.getItem('access_url'));
  }
  //处理菜单的选中属性
  handleMenuSelected(endUrl: string) {
    this.menuList.forEach(menu => {
      menu.selected = false;
      menu.pages.forEach(page => {
        page.selected = false;
        if (this.util.startWith(endUrl, page.path)) {
          menu.selected = true;
          page.selected = true;
          this.currentMenu = menu;
        }
      });

    });
  }
  //处理页面路径
  handleMenuPath() {
    this.currentPath = [];
    this.currentPath.push(this.currentMenu.title);
    this.currentMenu.pages.forEach(page => {
      if (page.selected == true) {
        this.currentPath.push(page.title);
      }
    });
  }

}
