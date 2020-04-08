import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { UtilService } from '../../../services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Result, Search } from 'src/app/models/result.model';
import { RoleModel } from 'src/app/models/sec.model';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  loading: boolean = true;
  searchModel: any = null;
  roleList: Array<any> = [];
  pageGroupList: Array<any> = [];
  pageGroupDetailList: Array<any> = [];

  isVisible_add: boolean = false;
  isVisible_edit: boolean = false;
  isVisible_detail: boolean = false;
  tempData: any = null;
  dataModel: RoleModel = new RoleModel();
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.searchModel = new Search();
    this.loadDatas();
  }
  loadDatas(reset: boolean = false): void {
    this.tr = -1;
    this.loading = true;
    if (reset == true) {
      this.searchModel.pagenum = 1;
    }
    this.http.role_getRole().subscribe((data: Result) => {
      this.loading = false;
      this.searchModel.total = data.data.length;
      this.roleList = data.data;
    })
  }
  tr: number;
  choose(data, i): void {
    this.tempData = data;
    this.tr = i;
  }
  //添加
  showModal_add(): void {
    for (var key in this.dataModel) {
      this.dataModel[key] = null;
    }
    this.isVisible_add = true;
  }
  handleOk_add(): void {
    console.log('-----打印添加model-----');
    console.log(this.dataModel);
    if (this.util.isNull(this.dataModel.name)) {
      this.notification.error('角色名称不能为空', null);
      return;
    }
    this.http.saveRole({ role: this.dataModel, ids: null }).subscribe((data: Result) => {
      if (data.successed) {
        this.notification.success('保存成功', null);
        this.loadDatas();
        this.isVisible_add = false;
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }
  showModal_edit(): void {
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
      return;
    }
    this.dataModel = this.tempData;
    this.http.loadSvcGroups(this.dataModel.id).subscribe((data:Result) => {
      console.log(data)
      this.pageGroupList = data.data;
      this.pageGroupList.forEach((e) => {
        e.expand = true;
      });
    })
    this.isVisible_edit = true;
  }
  handleCancel_edit(): void {
    this.isVisible_edit = false;
    this.loadDatas();
  }

  handleOk_edit(): void {
    console.log('-----打印编辑model-----');
    console.log(this.dataModel);
    if (this.util.isNull(this.dataModel.name)) {
      this.notification.error('角色名称不能为空', null);
      return;
    }
    let ids = [];
    this.pageGroupList.forEach((e) => {
      e.svcs.forEach((f) => {
        if (f.checked) {
          ids.push(f.id);
        }
      });
    });
    this.http.saveRole({ role: this.dataModel, ids: ids }).subscribe((data: Result) => {
      if (data.successed) {
        this.notification.success('保存成功', null);
        this.loadDatas();
        this.isVisible_edit = false;
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }
  loadPageGroupDetail(role): void {
    // this.isVisible_detail = true;
    // this.http.getData('/basic/sec/role/findRoleOutline/' + role.id, (data: any) => {
    //   this.pageGroupDetailList = data.data.svcOLs;
    // })
  }
  delete(): void {
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
    } else {
      this.modalService.confirm({
        nzTitle: '确定执行删除角色操作？',
        nzContent: '角色' + this.tempData.name + '将会被删除',
        nzOnOk: () => {
          this.http.delRole(this.tempData.id).subscribe ((data: Result) => {
            if (data.successed) {
              this.notification.success('删除成功', null);
              this.loadDatas();
            } else {
              this.notification.error('系统错误', null);
            }
          });
        }
      });
    }
  }

}
