import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { UtilService } from '../../../services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Result, Search } from 'src/app/models/result.model';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { RoleModel, UserModel } from 'src/app/models/sec.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    public dictionary: DictionaryService) { }

  ngOnInit() {
    this.http.role_getRole().subscribe((data: Result) => {
      this.roles = data.data.map((x) => {
        let item = new RoleModel();
        item.id = x.id;
        item.name = x.name;
        item._select = false;
        return item;
      });
    });
    this.reset();
  }

  //#region 预加载
  roles: Array<RoleModel>;
  //#endregion

  //#region 搜索
  loading: boolean = false;
  dataList: Array<UserModel> = [];
  search: Search = new Search();
  getData(): void {
    this.loading = true;
    this.search.pageNum = 1;
    this.http.user_getUser(this.util.parameterTransfer(this.search.string1, -1)).subscribe((data: Result) => {
      this.loading = false;
      this.dataList = data.data.map((x) => {
        let item = new UserModel();
        item.id = x.id;
        item.name = x.name;
        item.account = x.account;
        item.password = x.password;
        item.state = x.status;
        return item;
      });
    })
  }
  reset(): void {
    this.search.string1 = null;
    this.getData();
  }
  //#endregion

  //#region 添加
  isVisibleAdd: boolean = false;
  addModel: UserModel = new UserModel();
  showModalAdd(): void {
    this.roles.forEach((x) => {
      x._select = false;
    });
    this.addModel = new UserModel();
    this.addModel.state = 1;
    this.addModel.roles = [];
    this.isVisibleAdd = true;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.name) ||
      this.util.isNull(this.addModel.account) ||
      this.util.isNull(this.addModel.password)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.roles.forEach((x) => {
      if (x._select == true) {
        this.addModel.roles.push(x);
      }
    });
    this.http.user_addUser(this.addModel).subscribe((data: Result) => {
      switch (data.data) {
        case -2:
          this.notification.error('用户已存在', null);
          break;
        case -1:
          this.notification.error('账号已存在', null);
          break;
        case 0:
          this.notification.error('操作失败', null);
          break;
        case 1:
          this.notification.success('操作成功', null);
          this.getData();
          this.isVisibleAdd = false;
          break;
      }
    })
  }
  //#endregion

  //#region 修改
  isVisibleEdit: boolean = false;
  editModel: UserModel = new UserModel();
  showModalEdit(e: UserModel): void {
    this.editModel = e;
    this.editModel.roles = [];
    this.isVisibleEdit = true;
    this.http.user_getUserRole(this.editModel.id).subscribe((data: Result) => {
      this.roles.forEach((x) => {
        if (data.data.filter((y) => { return y.id == x.id }).length > 0) {
          x._select = true;
        } else {
          x._select = false;
        }
      });
    });
  }
  handleOkEdit(): void {
    if (this.util.isNull(this.editModel.name)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.roles.forEach((x) => {
      if (x._select == true) {
        this.editModel.roles.push(x);
      }
    });
    this.http.user_editUser(this.editModel).subscribe((data: Result) => {
      switch (data.data) {
        case 0:
          this.notification.error('操作失败', null);
          break;
        case 1:
          this.notification.success('操作成功', null);
          this.getData();
          this.isVisibleEdit = false;
          break;
      }
    })
  }
  //#endregion

  //#region 删除
  delete(e: UserModel): void {
    this.modalService.confirm({
      nzTitle: '确定执行删除操作？',
      nzOnOk: () => {
        this.http.user_editState(e.id, 0).subscribe((data: Result) => {
          switch (data.data) {
            case 0:
              this.notification.error('操作失败', null);
              break;
            case 1:
              this.notification.success('操作成功', null);
              this.getData();
              break;
          }
        })
      }
    });
  }
  //#endregion

  //#region 账号操作
  setState(e: UserModel, state: number): void {
    this.http.user_editState(e.id, state).subscribe((data: Result) => {
      switch (data.data) {
        case 0:
          this.notification.error('操作失败', null);
          break;
        case 1:
          this.notification.success('操作成功', null);
          this.getData();
          break;
      }
    })
  }
  setPassword(e: UserModel) {
    this.http.user_editPassword(e.id, '123456').subscribe((data: Result) => {
      switch (data.data) {
        case 0:
          this.notification.error('操作失败', null);
          break;
        case 1:
          this.notification.success('操作成功', null);
          this.getData();
          break;
      }
    })
  }
  //#endregion

}
