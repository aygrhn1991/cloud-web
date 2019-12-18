import { Component, OnInit } from '@angular/core';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Task } from 'src/app/models/task';
import { Result2, SearchModel } from 'src/app/models/result.model';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
  loading: boolean = true;
  searchModel: any = new SearchModel();
  form_name: any = null;
  dataList: Array<any> = [];
  isVisible_add: boolean = false;
  isVisible_edit: boolean = false;
  dataModel: Task = new Task();
  tempData: any = {};;//点击一行的时候使用
  form_state: any = null;
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }
  ngOnInit() {
    this.searchModel = new SearchModel();
    this.reset();
    // setInterval(() => {
    //   this.loadDatas();
    //   console.log('任务刷新:' + new Date());
    // }, 15000);
  }

  getData(reset: boolean = false): void {
    this.loading = true;
    this.tempData = null;
    if (reset == true) {
      this.searchModel.pageNum = 1;
    }
    this.http.getG6Task(
      this.util.parameterTransfer(this.searchModel.id, -1),
      this.searchModel.dtb.getTime(),
      this.searchModel.dte.getTime(),
      this.form_state).subscribe((data: Result2) => {
        console.log(data.data);
        this.loading = false;
        this.searchModel.total = data.data.length;
        this.dataList = data.data;
        console.log(this.dataList);
      })
  }

  reset(): void {
    for (var key in this.searchModel) {
      this.searchModel[key] = null;
    }
    let today = new Date();
    this.searchModel.dtb = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
    this.searchModel.dte = new Date(new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1);
    this.form_state = '-1';
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.getData(true);
  }
  tr: number;
  choose(data, i): void {
    this.tempData = data;
    this.tr = i;
  }
  clearChoose(): void {
    this.tempData = null;
    this.tr = -1;
  }
  showModal_add(): void {
    for (var key in this.dataModel) {
      this.dataModel[key] = null;
    }
    let today = new Date();
    this.dataModel.dtb = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
    this.dataModel.dte = new Date(new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1);
    this.dataModel.flag = '0';
    this.isVisible_add = true;
  }

  handleOk_add(): void {
    console.log('-----打印添加model-----');
    console.log(this.dataModel);
    if (this.util.isNull(this.dataModel.tname)) {
      this.notification.error('任务名称不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.vin)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.dtb)) {
      this.notification.error('起始时间不能为空', null);
      return;
    }
    if (this.util.isNull(this.dataModel.tname)) {
      this.notification.error('结束时间不能为空', null);
      return;
    }

    this.http.addG6Task(this.dataModel).subscribe((data: Result2) => {
      if (data.successed) {
        switch (data.data) {
          case 0:
            this.notification.error('保存失败', null);
            break;
          case 1:
            this.notification.success('保存成功', null);
            this.getData(true);
            break;
        }
      } else {
        this.notification.error('系统错误', null);
      }
    })
  }


  downLoad(e): void {
    window.open('/report/file/verify/read/' + e.fileId, '_blank');
  }

}
