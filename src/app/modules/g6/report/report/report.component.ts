import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { SearchModel, Result2 } from 'src/app/models/result.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  docveh: any = {};
  docVehException: any = {};
  loading: boolean = false;
  searchModel: any = null;
  yyyys: any = [];
  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.searchModel = new SearchModel();
    this.docVehException = {
      obdExName: ["MIL亮灯", "一级故障", "二级故障", "三级故障"],
      obdExValue: [{
        "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0
      },
      { "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0 },
      { "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0 },
      { "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0 }],
      engineExName: ["NOx超标", "SCR超温", "DPF压差"],
      engineExValue: [{
        "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0
      },
      { "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0 },
      { "m1": 0, "m2": 0, "m3": 0, "m4": 0, "m5": 0, "m6": 0, "m7": 0, "m8": 0, "m9": 0, "m10": 0, "m11": 0, "m12": 0 }]
    }
    var yy = new Date().getFullYear();
    for (let a = 0; a < 10; a++) {
      this.yyyys.push(yy--);
    }
  }
  reset(): void {
    for (var key in this.searchModel) {
      this.searchModel[key] = null;
    }
    this.loadDatas();
  }

  loadDatas(yyyy: number = this.yyyys[0]): void {

    this.http.queryNowDocVeh(this.util.parameterTransfer(this.searchModel.vid, -1)).subscribe((data: Result2) => {
      this.loading = false;
      this.docveh = data.data;
      console.log("===this.docveh==="+this.docveh)
    })

    this.http.queryVehException(this.util.parameterTransfer(this.searchModel.vid, -1), yyyy).subscribe((data: Result2) => {
      this.loading = false;
      this.docVehException = data.data;
    })
  }

}
