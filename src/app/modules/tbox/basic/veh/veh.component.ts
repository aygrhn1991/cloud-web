import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { NzNotificationService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { CommonService } from 'src/app/services/common.service';
import { VehTBox } from 'src/app/models/veh.model';
import { Result2, SearchModel } from 'src/app/models/result.model';
import { G6HttpService } from 'src/app/services/g6/g6-http.service';

@Component({
  selector: 'app-veh',
  templateUrl: './veh.component.html',
  styleUrls: ['./veh.component.css']
})
export class VehComponent implements OnInit {

  //#region 基本数据
  colorOptions = this.commonService.vehColorOptions;
  powerOptions = this.commonService.vehPowerOptions;
  //#endregion

  constructor(private http: HttpService,
    private util: UtilService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.searchModel = Object.assign(new SearchModel(), {
      vehNo: null,
      xzqh: null,
      power: null,
      vehMode: null,
      simCode: null,
      dtuCode: null,
      dtuType: null,
      manu: null,
    });
    this.reset();
  }

  //#region 搜索区
  showSearchMore: boolean = false;
  loading: boolean = false;
  dataList: Array<VehTBox> = [];
  searchModel: any = null;
  getData(reset: boolean = false): void {
    this.loading = true;
    this.editModel = new VehTBox();
    if (reset) {
      this.searchModel.pageNum = 1;
    }
    this.http.getTBoxVeh(this.searchModel.pageNum,
      this.searchModel.pageSize,
      this.util.parameterTransfer(this.searchModel.vid, -1),
      this.util.parameterTransfer(this.searchModel.vehNo, -1),
      this.util.parameterTransfer(this.searchModel.xzqh, -1),
      this.util.parameterTransfer(this.searchModel.power, -1),
      this.util.parameterTransfer(this.searchModel.vehMode, -1),
      this.util.parameterTransfer(this.searchModel.simCode, -1),
      this.util.parameterTransfer(this.searchModel.dtuCode, -1),
      this.util.parameterTransfer(this.searchModel.dtuType, -1),
      this.util.parameterTransfer(this.searchModel.manu, -1),
      this.util.getDayStart(this.searchModel.dateStart).getTime(),
      this.util.getDayEnd(this.searchModel.dateEnd).getTime()).subscribe((data: Result2) => {
        this.loading = false;
        this.searchModel.total = data.data.total;
        this.dataList = data.data.data.map((x) => {
          let veh = new VehTBox();
          veh.vid = x.C_ID;
          veh.vin = x.C_VIN;
          veh.vehNo = x.C_VEHNO;
          veh.vehNoColor = x.C_COLOR;
          veh.xzqh = x.C_XZQH;
          veh.power = x.C_ET;
          veh.vehMode = x.C_VEHM;
          veh.simCode = x.C_IMSI;
          veh.dtuCode = x.C_DTUID;
          veh.dtuType = x.C_DTUM;
          veh.manu = x.C_MANU;
          veh.key = x.C_KEY;
          veh.iv = x.C_IV;
          veh.createTime = x.C_FTM;
          veh.remark = x.C_DESC;
          return veh;
        });
      })
  }
  reset(): void {
    this.searchModel.vid = null;
    this.searchModel.vin = null;
    this.searchModel.vehNo = null;
    this.searchModel.xzqh = null;
    this.searchModel.power = null;
    this.searchModel.vehMode = null;
    this.searchModel.simCode = null;
    this.searchModel.dtuCode = null;
    this.searchModel.dtuType = null;
    this.searchModel.manu = null;
    this.searchModel.dateStart = this.util.stringToDate('2000-01-01 00:00:00');
    this.searchModel.dateEnd = new Date();
    this.searchModel.pageNum = 1;
    this.searchModel.pageSize = 10;
    this.getData(true);
  }
  //#endregion

  //#region 添加车辆
  isVisibleAdd: boolean = false;
  addModel: VehTBox = new VehTBox();
  showAddMore = true;
  showModalAdd(showAll: boolean): void {
    this.addModel = new VehTBox();
    this.isVisibleAdd = true;
    this.showAddMore = showAll;
  }
  handleOkAdd(): void {
    if (this.util.isNull(this.addModel.vin) ||
      this.util.isNull(this.addModel.vehNo) ||
      this.util.isNull(this.addModel.vehNoColor) ||
      this.util.isNull(this.addModel.simCode) ||
      this.util.isNull(this.addModel.dtuCode)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    if (this.addModel.vin.length != 17) {
      this.notification.error('VIN长度错误', null);
      return;
    }
    this.http.addTBoxVeh(this.addModel.vin,
      this.util.parameterTransfer(this.addModel.vehNo, -1),
      this.util.parameterTransfer(this.addModel.vehNoColor, -1),
      this.util.parameterTransfer(this.addModel.xzqh, -1),
      this.util.parameterTransfer(this.addModel.power, -1),
      this.util.parameterTransfer(this.addModel.vehMode, -1),
      this.util.parameterTransfer(this.addModel.simCode, -1),
      this.util.parameterTransfer(this.addModel.dtuCode, -1),
      this.util.parameterTransfer(this.addModel.dtuType, -1),
      this.util.parameterTransfer(this.addModel.manu, -1),
      this.util.parameterTransfer(this.addModel.key, -1),
      this.util.parameterTransfer(this.addModel.iv, -1),
      this.util.parameterTransfer(this.addModel.remark, -1)).subscribe((data: Result2) => {
        switch (data.data) {
          case -1:
            this.notification.error('VIN已存在', null);
            break;
          case 0:
            this.notification.error('保存失败', null);
            break;
          case 1:
            this.notification.success('保存成功', null);
            this.getData();
            this.isVisibleAdd = false;
            break;
        }
      })
  }
  //#endregion

  //#region 修改车辆
  isVisibleEdit: boolean = false;
  editModel: VehTBox = new VehTBox();
  showModalEdit(): void {
    if (this.util.isNull(this.editModel.vid)) {
      this.notification.error('请选择一条数据', null);
      return;
    }
    this.isVisibleEdit = true;
  }
  handleOkEdit(): void {
    if (this.util.isNull(this.editModel.vehNo) ||
      this.util.isNull(this.editModel.vehNoColor) ||
      this.util.isNull(this.editModel.simCode) ||
      this.util.isNull(this.editModel.dtuCode)) {
      this.notification.error('必填项不能为空', null);
      return;
    }
    this.http.editTBoxVeh(this.editModel.vid,
      this.util.parameterTransfer(this.editModel.vehNo, -1),
      this.util.parameterTransfer(this.editModel.vehNoColor, -1),
      this.util.parameterTransfer(this.editModel.xzqh, -1),
      this.util.parameterTransfer(this.editModel.power, -1),
      this.util.parameterTransfer(this.editModel.vehMode, -1),
      this.util.parameterTransfer(this.editModel.simCode, -1),
      this.util.parameterTransfer(this.editModel.dtuCode, -1),
      this.util.parameterTransfer(this.editModel.dtuType, -1),
      this.util.parameterTransfer(this.editModel.manu, -1),
      this.util.parameterTransfer(this.addModel.key, -1),
      this.util.parameterTransfer(this.addModel.iv, -1),
      this.util.parameterTransfer(this.editModel.remark, -1)).subscribe((data: Result2) => {
        switch (data.data) {
          case 0:
            this.notification.error('保存失败', null);
            break;
          case 1:
            this.notification.success('保存成功', null);
            this.getData();
            this.isVisibleEdit = false;
            break;
        }
      })
  }
  //#endregion

  //#region 选择行
  choose(data: VehTBox) {
    this.editModel = data;
  }
  //#endregion

  //#region 删除车辆
  delete(): void {
    if (this.util.isNull(this.editModel.vid)) {
      this.notification.error('请选择一条数据', null);
      return;
    }
    this.modalService.confirm({
      nzTitle: '确定执行删除车辆操作？',
      nzOnOk: () => {
        this.http.deleteTBoxVeh(this.editModel.vid).subscribe((data: Result2) => {
          switch (data.data) {
            case 0:
              this.notification.error('保存失败', null);
              break;
            case 1:
              this.notification.success('保存成功', null);
              this.getData();
              break;
          }
        })
      }
    });
  }
  //#endregion

  //#region 导入/导出
  exportVeh(): void {
    window.open(this.http.exportTBoxVeh(), '_blank');
  }
  importVehTemplateDownload(): void {
    window.open(this.http.importTBoxVehTemplateDownload(), '_blank');
  }
  importVehSimpleTemplateDownload(): void {
    window.open(this.http.importTBoxVehSimpleTemplateDownload(), '_blank');
  }
  isVisibleImport: boolean = false;
  fileList: Array<any> = [];
  importFilePath = this.http.importTBoxFile();
  repeatData: Array<string> = [];
  uploadResult: string = null;
  showModalImport(): void {
    this.isVisibleImport = true;
    this.repeatData = [];
    this.uploadResult = null;
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList.push(file);
    return true;
  };
  importVeh(): void {
    let formData = new FormData();
    formData.append('file', this.fileList[0]);
    // this.http.importG6Veh(formData).subscribe((data: Result2) => {
    //   if (data.successed && data.data > 0) {
    //     this.notification.success('数据导入成功，导入数据' + data.data + '条', null);
    //     this.isVisibleImport = false;
    //     this.getData();
    //   } else {
    //     this.notification.error('数据导入失败', null);
    //   }
    // });
  }
  nzChange(event) {
    if (event.type == 'success') {
      let result = event.file.response;
      this.repeatData = result.data;
      this.uploadResult = this.repeatData.length == 0 ? '数据校验通过，请点击导入按钮进行数据导入' : '以下VIN已存在，请删除后重新上传';
    }
  }
  //#endregion

}
