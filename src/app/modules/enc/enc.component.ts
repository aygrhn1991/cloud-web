import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { EncService } from "./enc.service";
import { UtilService } from "src/app/services/util.service";

declare var BMapLib: any;
declare var BMap: any;
declare var SEMapLib: any;
@Component({
  selector: "app-enc",
  templateUrl: "./enc.component.html",
  styleUrls: ["./enc.component.css"]
})
export class EncComponent implements OnInit {
  @ViewChild("enc_map", { static: true }) enc_map: ElementRef;
  constructor(
    private util: UtilService,
    private encSvc: EncService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}
  ngOnInit() {
    this.load_encs();
    this.map = new BMap.Map(this.enc_map.nativeElement);
    this.map.centerAndZoom(new BMap.Point(121.51606, 31.244604), 6);
    this.map.enableScrollWheelZoom(true);
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false,
      enableDrawingTool: false,
      polylineOptions: this.map_style_options,
      rectangleOptions: this.map_style_options,
      polygonOptions: this.map_style_options
    });
    this.drawingManager.addEventListener("overlaycomplete", e => {
      this.map.removeOverlay(this.overlays[0]); //这里不使用clearMap()方法，因为绘制不一定完成（如矩形绘制），不能关闭绘制
      this.overlays.shift();
      this.overlays.push(e.overlay);
    });
    this.map.addEventListener("click", e => {
      if (this.enc_model.shape == SHAPE.polyline && this.overlays.length != 0) {
        let new_point = SEMapLib.CMath.ptoPointSetNearPoint(
          e.point,
          this.overlays[0].ia
        );
        if (this.temp_item_point_type == POINT_TYPE.single_point) {
          this.temp_item.marsCoor = { x: new_point.lng, y: new_point.lat };
          this.map.removeOverlay(this.temp_item.marker);
          let marker = new BMap.Marker(
            new BMap.Point(new_point.lng, new_point.lat)
          );
          let label = new BMap.Label(this.temp_item.name, {
            offset: new BMap.Size(20, -10)
          });
          marker.setLabel(label);
          this.temp_item.marker = marker;
          this.map.addOverlay(marker);
        }
        if (this.temp_item_point_type == POINT_TYPE.way_point_start) {
          this.temp_item.hpMars = { x: new_point.lng, y: new_point.lat };
          this.map.removeOverlay(this.temp_item.marker_start);
          let marker = new BMap.Marker(
            new BMap.Point(new_point.lng, new_point.lat)
          );
          let label = new BMap.Label(this.temp_item.name + "（起点）", {
            offset: new BMap.Size(20, -10)
          });
          marker.setLabel(label);
          this.temp_item.marker_start = marker;
          this.map.addOverlay(marker);
        }
        if (this.temp_item_point_type == POINT_TYPE.way_point_end) {
          this.temp_item.epMars = { x: new_point.lng, y: new_point.lat };
          this.map.removeOverlay(this.temp_item.marker_end);
          let marker = new BMap.Marker(
            new BMap.Point(new_point.lng, new_point.lat)
          );
          let label = new BMap.Label(this.temp_item.name + "（终点）", {
            offset: new BMap.Size(20, -10)
          });
          marker.setLabel(label);
          this.temp_item.marker_end = marker;
          this.map.addOverlay(marker);
        }
      }
    });
  }
  //-----init-----//
  edit_box = {
    title: null,
    visible: false
  };
  edit_box_prop_list: Array<any> = [];
  edit_box_point_list: Array<any> = [];
  edit_box_way_list: Array<any> = [];
  edit_box_bind_veh_list: Array<any> = [];
  edit_box_unbind_veh_list: Array<any> = [];
  enc_model = {
    id: null,
    name: null,
    shape: null,
    width: null,
    veh_visible: true,
    key_bind: null,
    key_unbind: null
  };
  enc_prop_model = {
    allTimeRun: true,
    bt: null,
    et: null,
    limMaxSpeed: true,
    maxSpeed: null,
    limMinSpeed: true,
    minSpeed: null,
    acrossAreaAlarm: true,
    alwaysAlarmMark: null,
    name: null,
    radius: null,
    unIn: true,
    unInTime: null,
    unOut: true,
    unOutTime: null,
    marsCoor: { x: null, y: null }
  };
  edit_box_init(type, shape, id): void {
    //在create和edit方法里已经执行过clearMap方法了
    this.edit_box_prop_list = [];
    this.edit_box_point_list = [];
    this.edit_box_way_list = [];
    if (type == "add") {
      this.enc_model.id = null;
      this.enc_model.name = null;
      this.enc_model.shape = shape;
      this.enc_model.width = null;
      this.enc_model.veh_visible = false;
      if (this.enc_model.shape == SHAPE.polyline) {
        //无需操作
      } else {
        this.edit_box_add_prop(LIST_TYPE.prop);
      }
    } else {
      this.encSvc.loadEnc(id).subscribe((data: any) => {
        this.temp_enc = data.data;
        this.enc_model.id = id;
        this.enc_model.name = data.data.name;
        this.enc_model.shape = data.data.shape;
        this.enc_model.width = data.data.width;
        this.enc_model.veh_visible = true;
        this.edit_box_bind_veh();
        this.edit_box_unbind_veh();
        let drawing = null;
        let xys = [];
        if (data.data.shape == SHAPE.polyline) {
          data.data.marsData.forEach(e => {
            xys.push(new BMap.Point(e.x, e.y));
          });
          drawing = new BMap.Polyline(xys, this.map_style_options);
          this.overlays.push(drawing);
          //画线上的点
          data.data.keyPoints.forEach(e => {
            e.marker = new BMap.Marker(
              new BMap.Point(e.marsCoor.x, e.marsCoor.y)
            );
            let label = new BMap.Label(e.name, {
              offset: new BMap.Size(20, -10)
            });
            e.marker.setLabel(label);
            this.map.addOverlay(e.marker);
          });
          //画线上的路段
          data.data.segs.forEach(e => {
            e.marker_start = new BMap.Marker(
              new BMap.Point(e.hpMars.x, e.hpMars.y)
            );
            let label_start = new BMap.Label(e.name + "（起点）", {
              offset: new BMap.Size(20, -10)
            });
            e.marker_start.setLabel(label_start);
            this.map.addOverlay(e.marker_start);
            e.marker_end = new BMap.Marker(
              new BMap.Point(e.epMars.x, e.epMars.y)
            );
            let label_end = new BMap.Label(e.name + "（终点）", {
              offset: new BMap.Size(20, -10)
            });
            e.marker_end.setLabel(label_end);
            this.map.addOverlay(e.marker_end);
          });
        }
        if (data.data.shape == SHAPE.rectangle) {
          //画矩形
          xys.push(
            new BMap.Point(data.data.marsData[0].x, data.data.marsData[0].y)
          );
          xys.push(
            new BMap.Point(data.data.marsData[0].x, data.data.marsData[1].y)
          );
          xys.push(
            new BMap.Point(data.data.marsData[1].x, data.data.marsData[1].y)
          );
          xys.push(
            new BMap.Point(data.data.marsData[1].x, data.data.marsData[0].y)
          );
          drawing = new BMap.Polygon(xys, this.map_style_options);
          this.overlays.push(drawing);
          this.drawingManager.open();
          this.drawingManager.setDrawingMode("rectangle");
        }
        if (data.data.shape == SHAPE.polygon) {
          data.data.marsData.forEach(e => {
            xys.push(new BMap.Point(e.x, e.y));
          });
          drawing = new BMap.Polygon(xys, this.map_style_options);
          this.overlays.push(drawing);
        }
        this.map.addOverlay(drawing);
        if (data.data.shape == SHAPE.polyline) {
          data.data.keyPoints.forEach(e => {
            this.edit_box_point_list.push(e);
          });
          data.data.segs.forEach(e => {
            this.edit_box_way_list.push(e);
          });
        }
        if (data.data.shape != SHAPE.polyline) {
          data.data.options.forEach(e => {
            e.alwaysAlarmMark = e.alwaysAlarmMark.toString();
            this.edit_box_prop_list.push(e);
          });
        }
      });
    }
  }
  edit_box_add_prop(type): void {
    if (type == LIST_TYPE.prop) {
      this.edit_box_prop_list.push(this.objCopy(this.enc_prop_model));
    }
    if (type == LIST_TYPE.point) {
      this.edit_box_point_list.push(this.objCopy(this.enc_prop_model));
    }
    if (type == LIST_TYPE.way) {
      this.edit_box_way_list.push({ name: null, option: [] });
    }
  }
  edit_box_remove_prop(type, i): void {
    if (type == LIST_TYPE.prop) {
      this.edit_box_prop_list.splice(i, 1);
    }
    if (type == LIST_TYPE.point) {
      this.map.removeOverlay(this.edit_box_point_list[i].marker);
      this.edit_box_point_list.splice(i, 1);
    }
    if (type == 2) {
      this.map.removeOverlay(this.edit_box_way_list[i].marker_start);
      this.map.removeOverlay(this.edit_box_way_list[i].marker_end);
      this.edit_box_way_list.splice(i, 1);
    }
  }
  edit_box_add_prop_way(e) {
    e.option.push(this.objCopy(this.enc_prop_model));
  }
  edit_box_remove_prop_way(pp, ii) {
    pp.splice(ii, 1);
  }
  edit_box_bind_veh(): void {
    this.encSvc
      .loadEncVehs(
        this.enc_model.id,
        this.util.isNull(this.enc_model.key_bind)
          ? -1
          : this.enc_model.key_bind,
        1
      )
      .subscribe((data: any) => {
        data.data.forEach(e => {
          e.checked = false;
        });
        this.edit_box_bind_veh_list = data.data;
      });
  }
  edit_box_unbind_veh(): void {
    this.encSvc
      .loadEncVehs(
        this.enc_model.id,
        this.util.isNull(this.enc_model.key_unbind)
          ? -1
          : this.enc_model.key_unbind,
        0
      )
      .subscribe((data: any) => {
        data.data.forEach(e => {
          e.checked = false;
        });
        this.edit_box_unbind_veh_list = data.data;
      });
  }
  edit_box_edit_shape(): void {
    this.drawingManager.close();
    this.overlays[0].enableEditing();
    this.temp_item = null;
    this.temp_item_point_type = null;
  }
  edit_box_locate(): void {
    let xy = this.calcCenter(this.temp_enc);
    let center = new BMap.Point(xy.x, xy.y);
    this.map.centerAndZoom(center, xy.zoom);
  }
  save(): void {
    if (this.overlays.length <= 0) {
      this.notification.error("请绘制围栏", null);
      return;
    }
    if (this.util.isNull(this.enc_model.name)) {
      this.notification.error("围栏名称为空", null);
      return;
    }
    if (this.enc_model.shape == SHAPE.polyline) {
      if (this.util.isNull(this.enc_model.width)) {
        this.notification.error("路宽为空", null);
        return;
      }
      for (let i = 0; i < this.edit_box_point_list.length; i++) {
        if (this.util.isNull(this.edit_box_point_list[i].marker)) {
          this.notification.error("请绘制关键点", null);
          return;
        }
        if (this.util.isNull(this.edit_box_point_list[i].radius)) {
          this.notification.error("请填写关键点作用半径", null);
          return;
        }
        if (
          (this.edit_box_point_list[i].unIn == true &&
            this.util.isNull(this.edit_box_point_list[i].unInTime)) ||
          (this.edit_box_point_list[i].unOut == true &&
            this.util.isNull(this.edit_box_point_list[i].unOutTime))
        ) {
          this.notification.error("关键点时段信息有误", null);
          return;
        }
      }
      for (let i = 0; i < this.edit_box_way_list.length; i++) {
        if (
          this.util.isNull(this.edit_box_way_list[i].marker_start) ||
          this.util.isNull(this.edit_box_way_list[i].marker_end)
        ) {
          this.notification.error("请绘制路段起止点", null);
          return;
        }
        if (this.edit_box_way_list[i].option.length == 0) {
          this.notification.error("路段至少应当有一组属性", null);
          return;
        }
        let opt = this.edit_box_way_list[i].option;
        for (let ii = 0; ii < opt.length; ii++) {
          if (opt[ii].allTimeRun == true && opt.length != 1) {
            this.notification.error(
              "路段属性的时间范围是[全天都起作用]时，该围栏只能有一组属性，请删除其他属性",
              null
            );
            return;
          }
          if (
            opt[ii].allTimeRun == false &&
            (this.util.isNull(opt[ii].bt) || this.util.isNull(opt[ii].et))
          ) {
            this.notification.error("路段时段信息有误", null);
            return;
          }
          if (
            (opt[ii].limMaxSpeed == true &&
              this.util.isNull(opt[ii].maxSpeed)) ||
            (opt[ii].limMinSpeed == true && this.util.isNull(opt[ii].minSpeed))
          ) {
            this.notification.error("路段限速信息有误", null);
            return;
          }
        }
      }
    }
    if (this.enc_model.shape != SHAPE.polyline) {
      if (this.edit_box_prop_list.length == 0) {
        this.notification.error("属性不正确，至少应当有一组围栏属性", null);
        return;
      }
      for (let i = 0; i < this.edit_box_prop_list.length; i++) {
        if (
          this.edit_box_prop_list[i].time_all_day == true &&
          this.edit_box_prop_list.length != 1
        ) {
          this.notification.error(
            "围栏属性的时间范围是[全天都起作用]时，该围栏只能有一组属性，请删除其他属性",
            null
          );
          return;
        }
        if (
          this.edit_box_prop_list[i].time_all_day == false &&
          (this.util.isNull(this.edit_box_prop_list[i].time_start) ||
            this.util.isNull(this.edit_box_prop_list[i].time_end))
        ) {
          this.notification.error("时段信息有误", null);
          return;
        }
        if (
          (this.edit_box_prop_list[i].speed_high_on == true &&
            this.util.isNull(this.edit_box_prop_list[i].speed_high)) ||
          (this.edit_box_prop_list[i].speed_low_on == true &&
            this.util.isNull(this.edit_box_prop_list[i].speed_low))
        ) {
          this.notification.error("限速信息有误", null);
          return;
        }
        if (
          this.edit_box_prop_list[i].alarm_on == true &&
          this.util.isNull(this.edit_box_prop_list[i].alarm_type)
        ) {
          this.notification.error("报警信息有误", null);
          return;
        }
      }
    }
    let options = [];
    let keyPoints = [];
    let segs = [];
    this.edit_box_prop_list.forEach(e => {
      options.push(e);
    });
    this.edit_box_point_list.forEach(e => {
      let marker = e.marker;
      e.marker = null;
      let ee = this.objCopy(e);
      e.marker = marker;
      keyPoints.push(ee);
    });
    this.edit_box_way_list.forEach(e => {
      let marker_start = e.marker_start;
      let marker_end = e.marker_end;
      e.marker_start = null;
      e.marker_end = null;
      let ee = this.objCopy(e);
      e.marker_start = marker_start;
      e.marker_end = marker_end;
      segs.push(ee);
    });
    let marsData = [];
    if (this.enc_model.shape == SHAPE.polyline) {
      this.overlays[0].ia.forEach(e => {
        marsData.push({ x: e.lng, y: e.lat });
      });
    }
    if (this.enc_model.shape == SHAPE.rectangle) {
      marsData = [
        { x: this.overlays[0].Ou.Le, y: this.overlays[0].Ou.Xd },
        { x: this.overlays[0].Ou.He, y: this.overlays[0].Ou.Vd }
      ];
    }
    if (this.enc_model.shape == SHAPE.polygon) {
      this.overlays[0].ia.forEach(e => {
        marsData.push({ x: e.lng, y: e.lat });
      });
    }
    this.encSvc
      .saveEnc({
        id: this.enc_model.id,
        name: this.enc_model.name,
        shape: this.enc_model.shape,
        width: this.enc_model.width,
        marsData: marsData,
        options: options,
        keyPoints: keyPoints,
        segs: segs
      })
      .subscribe((data: any) => {
        if (data.successed) {
          this.notification.success("围栏保存成功", null);
          this.edit_box.visible = false;
          this.load_encs();
          this.clearMap();
          this.clearTable();
        } else {
          this.notification.error(data.data, null);
        }
      });
  }
  cancel(): void {
    this.edit_box.visible = false;
    this.clearMap();
    this.clearTable();
  }
  //-----edit_box-----//
  view_box = {
    visible_props: false,
    visible_points: false,
    visible_ways: false
  };
  view_box_prop_list: Array<any> = [];
  view_box_point_list: Array<any> = [];
  view_box_way_list: Array<any> = [];
  view_box_bind_veh_list: Array<any> = [];
  enc_list: Array<any> = [];
  tr = null;
  temp_enc = null;

  /**
   * 加载围栏列表
   */
  load_encs() {
    this.encSvc.loadEncs().subscribe((data: any) => {
      this.enc_list = data.data;
    });
    this.clearTable();
    this.clearMap();
  }
  /**
   * 加载围栏
   */
  load_enc(enc, i) {
    this.tr = i;
    this.encSvc.loadEnc(enc.id).subscribe((data: any) => {
      this.temp_enc = data.data;
      this.view_box_prop_list = [];
      this.view_box_point_list = [];
      this.view_box_way_list = [];
      if (data.data.shape == SHAPE.polyline) {
        //显示对应的属性列表
        this.view_box.visible_props = false;
        this.view_box.visible_points = true;
        this.view_box.visible_ways = true;
        //显示关键点
        data.data.keyPoints.forEach(e => {
          this.view_box_point_list.push(e);
        });
        //显示路段
        data.data.segs.forEach(e => {
          this.view_box_way_list.push(e);
        });
      }
      if (data.data.shape != SHAPE.polyline) {
        //显示对应的属性列表
        this.view_box.visible_props = true;
        this.view_box.visible_points = false;
        this.view_box.visible_ways = false;
        //显示基本属性
        data.data.options.forEach(e => {
          this.view_box_prop_list.push(e);
        });
      }
      this.clearMap();
      let drawing = null;
      let xys = [];
      if (data.data.shape == SHAPE.polyline) {
        //画线
        data.data.marsData.forEach(e => {
          xys.push(new BMap.Point(e.x, e.y));
        });
        drawing = new BMap.Polyline(xys, this.map_style_options);
        this.map.addOverlay(drawing);
        //画线上的点
        data.data.keyPoints.forEach(e => {
          let marker = new BMap.Marker(
            new BMap.Point(e.marsCoor.x, e.marsCoor.y)
          );
          let label = new BMap.Label(e.name, {
            offset: new BMap.Size(20, -10)
          });
          marker.setLabel(label);
          this.map.addOverlay(marker);
        });
        //画线上的路段
        data.data.segs.forEach(e => {
          let marker_start = new BMap.Marker(
            new BMap.Point(e.hpMars.x, e.hpMars.y)
          );
          let label_start = new BMap.Label(e.name + "（起点）", {
            offset: new BMap.Size(20, -10)
          });
          marker_start.setLabel(label_start);
          this.map.addOverlay(marker_start);
          let marker_end = new BMap.Marker(
            new BMap.Point(e.epMars.x, e.epMars.y)
          );
          let label_end = new BMap.Label(e.name + "（终点）", {
            offset: new BMap.Size(20, -10)
          });
          marker_end.setLabel(label_end);
          this.map.addOverlay(marker_end);
        });
      }
      if (data.data.shape == SHAPE.rectangle) {
        //画矩形
        xys.push(
          new BMap.Point(data.data.marsData[0].x, data.data.marsData[0].y)
        );
        xys.push(
          new BMap.Point(data.data.marsData[0].x, data.data.marsData[1].y)
        );
        xys.push(
          new BMap.Point(data.data.marsData[1].x, data.data.marsData[1].y)
        );
        xys.push(
          new BMap.Point(data.data.marsData[1].x, data.data.marsData[0].y)
        );
        drawing = new BMap.Polygon(xys, this.map_style_options);
        this.map.addOverlay(drawing);
      }
      if (data.data.shape == SHAPE.polygon) {
        //画多边形
        data.data.marsData.forEach(e => {
          xys.push(new BMap.Point(e.x, e.y));
        });
        drawing = new BMap.Polygon(xys, this.map_style_options);
        this.map.addOverlay(drawing);
      }
    });

    this.view_box_bind_veh(enc);
  }
  view_box_bind_veh(enc: any): void {
    this.encSvc.loadEncVehs(enc.id, -1, 1).subscribe((data: any) => {
      this.view_box_bind_veh_list = data.data;
    });
  }
  create(shape): void {
    this.edit_box.visible = true;
    this.clearMap();
    this.drawingManager.open();
    if (shape == SHAPE.polyline) {
      this.edit_box.title = "线路围栏";
      this.drawingManager.setDrawingMode("polyline");
    }
    if (shape == SHAPE.rectangle) {
      this.edit_box.title = "矩形围栏";
      this.drawingManager.setDrawingMode("rectangle");
    }
    if (shape == SHAPE.polygon) {
      this.edit_box.title = "多边形围栏";
      this.drawingManager.setDrawingMode("polygon");
    }
    this.edit_box_init("add", shape, null);
  }
  delete(): void {
    if (this.temp_enc == null) {
      this.notification.error("请选择一条数据", null);
      return;
    }
    this.modalService.confirm({
      nzTitle: "确定删除" + this.temp_enc.name + "?",
      nzOnOk: () => {
        this.encSvc.removeEnc(this.temp_enc.id).subscribe((data: any) => {
          if (data.successed) {
            this.notification.success("操作成功", null);
            this.load_encs();
            this.clearTable();
          } else {
            this.notification.error("操作失败", null);
          }
        });
      }
    });
  }
  edit(enc) {
    this.edit_box.title = enc.name;
    this.edit_box.visible = true;
    this.clearMap();
    this.edit_box_init("edit", null, enc.id);
  }
  //-----view_box-----//
  drawingManager: any;
  overlays: Array<any> = [];
  map: any;
  //map_options: MapOptions;
  map_style_options: any = {
    strokeColor: "red", //边线颜色。
    fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3, //边线的宽度，以像素为单位。
    strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
    fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
    strokeStyle: "solid" //边线的样式，solid或dashed。
  };

  temp_item: any;
  temp_item_point_type: number;
  preMakePoint(type, item) {
    if (this.util.isNull(item.name)) {
      this.modalService.error({ nzTitle: "请先填写该点对应名称" });
      return;
    }
    this.temp_item = item;
    this.temp_item_point_type = type;
  }
  //-----map-----//
  allChecked_bind = false;
  indeterminate_bind = false;
  displayData_bind: Array<any> = [];
  currentPageDataChange_bind($event: Array<any>): void {
    this.displayData_bind = $event;
  }
  refreshStatus_bind(): void {
    const allChecked = this.displayData_bind.every(
      value => value.checked === true
    );
    const allUnChecked = this.displayData_bind.every(value => !value.checked);
    this.allChecked_bind = allChecked;
    this.indeterminate_bind = !allChecked && !allUnChecked;
  }
  checkAll_bind(value: boolean): void {
    this.displayData_bind.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus_bind();
  }
  allChecked_unbind = false;
  indeterminate_unbind = false;
  displayData_unbind: Array<any> = [];
  currentPageDataChange_unbind($event: Array<any>): void {
    this.displayData_unbind = $event;
  }
  refreshStatus_unbind(): void {
    const allChecked = this.displayData_unbind.every(
      value => value.checked === true
    );
    const allUnChecked = this.displayData_unbind.every(value => !value.checked);
    this.allChecked_unbind = allChecked;
    this.indeterminate_unbind = !allChecked && !allUnChecked;
  }
  checkAll_unbind(value: boolean): void {
    this.displayData_unbind.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus_unbind();
  }
  unbind(): void {
    if (
      this.edit_box_bind_veh_list.filter(e => {
        return e.checked == true;
      }).length == 0
    ) {
      this.notification.error("请选择要解绑的车辆", null);
      return;
    }
    let vins = [];
    this.edit_box_bind_veh_list.forEach(e => {
      if (!e.checked) {
        vins.push(e.vin);
      }
    });
    this.encSvc.saveVehs(this.enc_model.id, vins).subscribe((data: any) => {
      if (data.successed) {
        this.edit_box_bind_veh();
        this.edit_box_unbind_veh();
      }
    });
  }
  bind(): void {
    if (
      this.edit_box_unbind_veh_list.filter(e => {
        return e.checked == true;
      }).length == 0
    ) {
      this.notification.error("请选择要绑定的车辆", null);
      return;
    }
    let vins = [];
    this.edit_box_bind_veh_list.forEach(e => {
      vins.push(e.vin);
    });
    this.edit_box_unbind_veh_list.forEach(e => {
      if (e.checked) {
        vins.push(e.vin);
      }
    });
    this.encSvc.saveVehs(this.enc_model.id, vins).subscribe((data: any) => {
      if (data.successed) {
        this.edit_box_bind_veh();
        this.edit_box_unbind_veh();
      }
    });
  }
  //-----table-----//
  clearMap(): void {
    if (!this.util.isNull(this.map)) {
      this.map.clearOverlays();
      this.drawingManager.close();
    }
    this.overlays = [];
  }
  clearTable(): void {
    this.tr = null;
    this.temp_enc = null;
    this.view_box.visible_props = false;
    this.view_box.visible_points = false;
    this.view_box.visible_ways = false;
  }
  objCopy(obj): any {
    let str = JSON.stringify(obj);
    let newObj = JSON.parse(str);
    return newObj;
  }
  calcCenter(data: any): any {
    let xy = { x: null, y: null, zoom: null };
    if (data.shape == SHAPE.polyline) {
      let maxLng = Math.max.apply(
        Math,
        data.marsData.map(function(o) {
          return o.x;
        })
      );
      let minLng = Math.min.apply(
        Math,
        data.marsData.map(function(o) {
          return o.x;
        })
      );
      let maxLat = Math.max.apply(
        Math,
        data.marsData.map(function(o) {
          return o.y;
        })
      );
      let minLat = Math.min.apply(
        Math,
        data.marsData.map(function(o) {
          return o.y;
        })
      );
      xy.x = (maxLng + minLng) / 2;
      xy.y = (maxLat + minLat) / 2;
      xy.zoom = this.getZoom(maxLng, minLng, maxLat, minLat);
    }
    if (data.shape == SHAPE.rectangle) {
      xy.x = (data.marsData[0].x + data.marsData[1].x) / 2;
      xy.y = (data.marsData[0].y + data.marsData[1].y) / 2;
      xy.zoom = this.getZoom(
        data.marsData[1].x,
        data.marsData[0].x,
        data.marsData[1].y,
        data.marsData[0].y
      );
    }
    if (data.shape == SHAPE.polygon) {
      let maxLng = Math.max.apply(
        Math,
        data.marsData.map(function(o) {
          return o.x;
        })
      );
      let minLng = Math.min.apply(
        Math,
        data.marsData.map(function(o) {
          return o.x;
        })
      );
      let maxLat = Math.max.apply(
        Math,
        data.marsData.map(function(o) {
          return o.y;
        })
      );
      let minLat = Math.min.apply(
        Math,
        data.marsData.map(function(o) {
          return o.y;
        })
      );
      xy.x = (maxLng + minLng) / 2;
      xy.y = (maxLat + minLat) / 2;
      xy.zoom = this.getZoom(maxLng, minLng, maxLat, minLat);
    }
    return xy;
  }
  getZoom(maxLng, minLng, maxLat, minLat): number {
    let zoom = [
      50,
      100,
      200,
      500,
      1000,
      2000,
      5000,
      10000,
      20000,
      25000,
      50000,
      100000,
      200000,
      500000,
      1000000,
      2000000
    ]; //级别18到3。
    let pointA = new BMap.Point(maxLng, maxLat);
    let pointB = new BMap.Point(minLng, minLat);
    let distance = this.map.getDistance(pointA, pointB).toFixed(1);
    for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
      if (zoom[i] - distance > 0) {
        return 18 - i + 3;
      }
    }
  }
}
const SHAPE = {
  rectangle: 1,
  polygon: 2,
  polyline: 3
};
const LIST_TYPE = {
  prop: 0,
  point: 1,
  way: 2
};
const POINT_TYPE = {
  single_point: 0,
  way_point_start: 1,
  way_point_end: 2
};
