import { Injectable } from "@angular/core";

declare var IoVLib, BMapLib, BMap, BMAP_NORMAL_MAP, BMAP_HYBRID_MAP;

@Injectable({
  providedIn: "root"
})
export class HtmapService {
  private vehMks: any[] = [];
  private vehmkMap: { [key: string]: any } = {};
  private bmap: any;
  private vehClickFunc: any;

  constructor() {}
  initMap(vehClickFunc: any) {
    this.vehClickFunc = vehClickFunc;
    const map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(110.404, 37.915), 5); // 初始化地图,设置中心点坐标和地图级别
    // 添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);
    map.setMapStyle({ style: "midnight" });
    this.bmap = map;
  }

  insertVeh(veh) {
    const marker = new BMapLib.VehOverlay(veh); // 创建点
    marker.addEventListener("click", event => {
      this.vehClickFunc(event.target._veh);
    });
    this.vehMks.push(marker);
    this.vehmkMap[veh.vid] = marker;

    this.bmap.addOverlay(marker);
  }
  addVeh(veh: any) {
    const mk = this.vehmkMap[veh.vid];
    if (mk) {
      mk.update(veh);
    } else {
      this.insertVeh(veh);
    }
  }

  addVehs(vehs: any[]) {
    vehs.forEach((veh: any) => {
      this.addVeh(veh);
    });
    this.setVehsInView(vehs);
  }
  public updateVeh(veh: any) {
    const mk = this.vehmkMap[veh.vid];
    if (mk) {
      mk.update(veh);
    }
  }

  public setVehsInView(vehs: any[]) {
    const data = [];
    vehs.forEach(v => {
      data.push({ lng: v.lng, lat: v.lat });
    });
    GisMath.calcBorder(data, this.bmap);
  }

  public updateVehs(vehs: any[]): void {
    vehs.forEach((veh: any) => {
      this.updateVeh(veh);
    });
  }

  public removeAll() {
    this.bmap.clearOverlays();
    this.vehMks = [];
    this.vehmkMap = {};
  }

  public hiddenVehs() {
    this.bmap.clearOverlays();
  }

  public showVehs() {
    this.vehMks.forEach(mk => {
      this.bmap.addOverlay(mk);
    });
  }
}

const GisMath = {
  _INF: 1e200,
  _EP: 1e-10,
  _MAXV: 300,
  _R: 6378.137,
  /*
   * 检索点到折线集的最近点的位置,并返回该位置
   */
  indexPointSetNearPoint: function(p, ps) {
    let d = this._INF;
    let pos = 0;
    for (let i = 0; i < ps.length - 1; i++) {
      const dm = this.distSqu(p, ps[i]);
      if (dm < d) {
        d = dm;
        pos = i;
      }
    }
    return pos;
  },
  /**
   * 两点间的距离 的平方
   */
  distSqu: function(p, q) {
    // p.point.lng - q.lng 拖动后的经度矢量差
    // p.point.lat - q.lat 拖动后的纬度矢量差
    return Math.pow(p.point.lng - q.lng, 2) + Math.pow(p.point.lat - q.lat, 2);
  },
  // 将曲线上的所有点包含在一个矩形内
  calcBorder: function(data, map) {
    // 定义一个大的坐标点跟一个小的坐标点
    const ptMax = new BMap.Point(0, 0);
    const ptMin = new BMap.Point(180, 90);
    for (let i = 0; i < data.length - 1; i++) {
      ptMax.lng = Math.max(ptMax.lng, data[i].lng);
      ptMax.lat = Math.max(ptMax.lat, data[i].lat);
      ptMin.lng = Math.min(ptMin.lng, data[i].lng);
      ptMin.lat = Math.min(ptMin.lat, data[i].lat);
    }
    const pointArr = [
      new BMap.Point(ptMax.lng, ptMax.lat),
      new BMap.Point(ptMin.lng, ptMin.lat)
    ];
    // 根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标。
    map.setViewport(pointArr);
  }
};
