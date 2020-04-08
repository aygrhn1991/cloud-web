import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Search, Result } from 'src/app/models/result.model';
import { DtuManu } from 'src/app/models/manu';

@Component({
  selector: 'app-dtu-manu',
  templateUrl: './dtu-manu.component.html',
  styleUrls: ['./dtu-manu.component.css']
})
export class DtuManuComponent implements OnInit {

  loading: boolean = true;
  searchModel: any = null;
  form_name: any = null;
  dataList: Array<any> = [];
  dataModel: DtuManu = new DtuManu();
  tempData: any = {};;//点击一行的时候使用
  isVisible_add: boolean = false;
  isVisible_edit: boolean = false;
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.searchModel = new Search();
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

    this.http.queryDtumanu(this.util.parameterTransfer(this.form_name, '-1')).subscribe((data: Result) => {
      this.loading = false;
      this.searchModel.total = data.data.length;
      this.dataList = data.data;
    })

  }
  tr: number;
  choose(data, i): void {
    this.tempData = data;
    this.tr = i;
  }
  showModal_add(): void {
    this.dataModel = new DtuManu();
    this.isVisible_add = true;
  }
  handleOk_add(): void {
    if (this.util.isNull(this.dataModel.id)) {
      this.notification.error('制造商编号不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.name)) {
      this.notification.error('制造商名称不能为空', null);
      return;
    }
    this.http.addDtumanu(this.dataModel).subscribe((data: Result) => {
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
            this.notification.warning("制造商重复", null);
            break;
        }
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
    this.isVisible_edit = true;
  }
  handleOk_edit(): void {
    this.http.updateDtumanu(this.dataModel).subscribe((data: Result) => {
      if (data.successed) {
        switch (data.data) {
          case 0:
            this.notification.error('修改失败', null);
            break;
          case 1:
            this.notification.success('修改成功', null);
            this.loadDatas(true);
            break;
          case -1:
            this.notification.warning("制造商名称已存在", null);
        }
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }

  delete(): void {
    console.log("===this.tempData==="+this.tempData.id)
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
    } else {
      this.modalService.confirm({
        nzTitle: '确定删除该制造商？',
        nzContent: '制造商' + this.tempData.name + '将会被删除',
        nzOnOk: () => {
          this.http.deleteDtumanu(this.tempData.id).subscribe((data: Result) => {
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
          })
        }
      });
    }
  }

}
