import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../services/http.service';
import { UtilService } from '../../../services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { User } from 'src/app/models/user';
import { Result, SearchModel } from 'src/app/models/result.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading: boolean = true;
  searchModel: any = null;
  form_name: any = null;
  userList: Array<any> = [];
  roleList: Array<any> = [];
  roleList_edit: Array<any> = [];
  isVisible_add: boolean = false;
  isVisible_edit: boolean = false;
  dataModel: User = new User();
  tempData: any = {};;//点击一行的时候使用
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }
  ngOnInit() {
    this.searchModel = new SearchModel();
    this.reset();
  }
  reset(): void {
    this.form_name = "";
    this.searchModel.pagenum = 1;
    this.searchModel.pagesize = 10;
    this.loadDatas(true);
  }
  loadDatas(reset: boolean = false): void {
    this.loading = true;
    this.tempData = null;
    if (reset == true) {
      this.searchModel.pagenum = 1;
    }
    this.http.queryUsers(this.util.parameterTransfer(this.form_name, '-1')).subscribe((data: Result) => {
      this.loading = false;
      this.searchModel.total = data.data.length;
      this.userList = data.data;
    })
  }
  //选中一行
  tr: number;
  choose(data, i): void {
    this.tempData = data;
    this.tr = i;
  }
  //添加
  showModal_add(): void {
    this.dataModel = new User();
    this.isVisible_add = true;
    this.http.loadAllRoles().subscribe((data: Result) => {
      this.roleList = data.data;
    })
  }
  handleOk_add(): void {
    console.log(this.dataModel);
    if (this.util.isNull(this.dataModel.name)) {
      this.notification.error('用户姓名不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.account)) {
      this.notification.error('登录帐号不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.password)) {
      this.notification.error('登录密码不能为空', null);
      return;
    }
    let ids = [];
    this.roleList.forEach((e) => {
      if (e.checked) {
        ids.push(e.id);
      }
    });
    this.http.addUser({ user: this.dataModel, rids: ids }).subscribe((data: Result) => {
      if (data.successed) {
        switch (data.data) {
          case 0:
            this.notification.error('保存失败', null);
            break;
          case 1:
            this.notification.success('保存成功', null);
            this.loadDatas(true);
            break;
          case -1:
            this.notification.warning("用户已存在", null);
            break;
        }
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }
  //修改
  showModal_edit(): void {
    console.log("---this.tempData ---" + this.tempData)
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
      return;
    }
    this.dataModel = this.tempData;
    this.isVisible_edit = true;
    this.http.findUserRoles(this.dataModel.id).subscribe((data: Result) => {
      this.roleList_edit = data.data;
    });
  }

  handleOk_edit(): void {
    if (this.util.isNull(this.dataModel.name)) {
      this.notification.error('用户姓名不能为空', null);
      return;
    }
    var ids = [];
    this.roleList_edit.forEach((e) => {
      if (e.checked) {
        ids.push(e.id);
      }
    });
    this.http.updateUser({ user: this.dataModel, rids: ids }).subscribe((data: Result) => {
      if (data.successed) {
        switch (data.data) {
          case 0:
            this.notification.error('修改失败', null);
            break;
          case 1:
            this.notification.success('修改成功', null);
            this.loadDatas(true);
            break;
        }
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }
  //删除
  delete(): void {
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
    } else {
      this.modalService.confirm({
        nzTitle: '确定执行删除用户操作？',
        nzContent: '用户' + this.tempData.name + '将会被删除',
        nzOnOk: () => {
          this.http.updateUserStatus(this.tempData.id, -1).subscribe((data: any) => {
            if (data.successed) {
              switch (data.data) {
                case 0:
                  this.notification.error('删除失败', null);
                  break;
                case 1:
                  this.notification.success('删除成功', null);
                  this.loadDatas(true);
                  break;
              }
            } else {
              this.notification.error('系统错误', null);
            }
          });
        }
      });
    }
  }
  //更改用户状态
  setState(e): void {
    this.http.updateUserStatus(e.id, ((e.status == 0 || e.status == 4) ? 1 : 0)).subscribe((data: Result) => {
      if (data.successed) {
        switch (data.data) {
          case 0:
            this.notification.error('保存失败', null);
            break;
          case 1:
            this.notification.success("保存成功", null);
            this.loadDatas(true);
            break;
        }

      } else {
        this.notification.error('系统错误', null);
      }
    })
  }

}
