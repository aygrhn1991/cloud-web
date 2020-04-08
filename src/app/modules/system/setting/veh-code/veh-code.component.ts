import { Component, OnInit } from '@angular/core';
import { Vehm } from 'src/app/models/vehm';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { SearchModel, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-veh-code',
  templateUrl: './veh-code.component.html',
  styleUrls: ['./veh-code.component.css']
})
export class VehCodeComponent implements OnInit {

  loading: boolean = true;
  searchModel: any = null;
  form_model: any = null;
  form_oemid: any = null;
  dataList: Array<any> = [];
  dataModel: Vehm = new Vehm();
  tempData: any = {};;//点击一行的时候使用
  isVisible_add: boolean = false;
  isVisible_edit: boolean = false;
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.searchModel = new SearchModel();
    this.reset();
  }
  reset(): void {
    this.form_model = "";
    this.form_oemid = 1;
    this.searchModel.pagenum = 1;
    this.searchModel.pagesize = 10;
    this.loadDatas(true);
  }
  //根据车型、主机厂查询信息
  loadDatas(reset: boolean = false): void {
    this.loading = true;
    this.tempData = null;
    if (reset == true) {
      this.searchModel.pagenum = 1;
    }
    this.http.queryVehm((this.util.isNull(this.form_model) ? '-1' : this.form_model), this.form_oemid).subscribe((data: Result) => {
      this.loading = false;
      console.log(data)
      this.searchModel.total = data.data.length;
      this.dataList = data.data;
    })

  }
  //选中一行
  tr: number;
  choose(data, i): void {
    this.tempData = data;
    this.tr = i;
  }
  //添加车型
  showModal_add(): void {
    this.dataModel = new Vehm();
    this.isVisible_add = true;
  }
  handleOk_add(): void {
    if (this.util.isNull(this.dataModel.model)) {
      this.notification.error('型号代码不能为空', null);
      return;
    }
    this.http.addVehm(this.dataModel).subscribe((data: Result) => {
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
            this.notification.warning("车型已存在", null);
            break;
        }
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }
  //修改车型
  showModal_edit(): void {
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
      return;
    }
    this.dataModel = this.tempData;
    this.isVisible_edit = true;
  }
  handleOk_edit(): void {
    this.http.updateVehm(this.dataModel).subscribe((data: Result) => {
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
  //删除车型
  delete(): void {
    if (this.tempData == null) {
      this.notification.error('请选择一条数据', null);
    } else {
      this.modalService.confirm({
        nzTitle: '确定删除该车辆型号？',
        nzContent: '车型[' + this.tempData.model + ']将会被删除',
        nzOnOk: () => {
          this.http.deleteVehm(this.tempData.model).subscribe((data: Result) => {
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
