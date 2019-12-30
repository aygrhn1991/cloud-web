import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';

@Component({
  selector: 'app-data-eng',
  templateUrl: './data-eng.component.html',
  styleUrls: ['./data-eng.component.css']
})
export class DataEngComponent implements OnInit {

  constructor(private http: G6HttpService,
    private util: UtilService,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.reset();
  }

  //#region 搜索区
  loading: boolean = false;
  dataList: Array<any> = [];
  searchModel: SearchModel = new SearchModel();
  getData(reset: boolean = false): void {
    if (this.util.isNull(this.searchModel.vid)) {
      this.notification.error('VIN不能为空', null);
      return;
    }
    this.loading = true;
    if (reset) {
      this.searchModel.pageNum = 1;
    }
    this.http.getG6EngData(this.util.parameterTransfer(this.searchModel.vid, -1),
      this.util.getDayStart(this.searchModel.dateStart).getTime(),
      this.util.getDayEnd(this.searchModel.dateStart).getTime()).subscribe((data: Result2) => {
        this.loading = false;
        this.dataList = data.data;
      })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.dateStart = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.dataList = [];
  }
  //#endregion

}
