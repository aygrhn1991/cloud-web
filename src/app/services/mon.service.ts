import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MonService {
  constructor(private http: HttpClient) {}

  private getTm() {
    return new Date().getTime();
  }
  // 加载车辆快照信息
  public loadVehSnapshot(vid: any) {
    return this.http.get(
      `/rtm/g6/monsvc/loadVehSnapshot/${vid}?tm=${this.getTm()}`
    );
  }

  // 加载车辆统计信息
  public loadStatInfo() {
    return this.http.get(`/rtm/g6/monsvc/loadStatInfo?tm=${this.getTm()}`);
  }

  // 加载车辆统计信息
  public schVehs(flag: any) {
    return this.http.get(`/rtm/g6/monsvc/schVehs/${flag}?tm=${this.getTm()}`);
  }
  // 查车相关
  public statXzqh(mvin: string) {
    return this.http.get(`/rtm/g6/monsvc/statXzqh/${mvin}?tm=${this.getTm()}`);
  }
  public byVin(m_vin: string, m_xzqh: number) {
    return this.http.get(
      `/rtm/g6/monsvc/byVin/${m_vin}/${m_xzqh}?tm=${this.getTm()}`
    );
  }

  // 加载地图上的车辆相关s
  public loadMVeh(m_vid: string) {
    return this.http.get(`/rtm/g6/monsvc/loadMVeh/${m_vid}?tm=${this.getTm()}`);
  }

  // 加载地图上的车辆相关s
  public loadMVehs(m_xzqh: number, m_vin: string) {
    return this.http.get(
      `/rtm/g6/monsvc/loadMVehs/${m_xzqh}/${m_vin}?tm=${this.getTm()}`
    );
  }

  // 查询故障码描述信息
  public searchDtcInfo(m_dtc: String) {
    return this.http.get(
      `/rtm/g6/monsvc/searchDtcInfo/${m_dtc}?tm=${this.getTm()}`
    );
  }

  // ************************************ 轨迹查询相关 *************************/

  public loadTrackerData(mvin: string, mdtb: number, mdte: number) {
    return this.http.get(
      `/bgdata/queryTrackData/${mvin}/${mdtb}/${mdte}?tm=${this.getTm()}`
    );
  }


// ************************************ 坐标转换 相关 *************************/

  public toMarsAddrs(mcoors: any) {
    console.log(mcoors);
    return this.http.post(`/gis/toMars_addrs?tm=${this.getTm()}`, mcoors);
  }

  public toMar(lng: number, lat: number) {
    return this.http.post(`/gis/toMarsXY?tm=${this.getTm()}`, {
      x: lng,
      y: lat
    });
  }
  public toMars(m_coors: any) {
    return this.http.post(`/gis/toMarsXYs?tm=${this.getTm()}`, m_coors);
  }
  public toAddr(lng: number, lat: number) {
    return this.http.post(`/gis/parseXY?tm=${this.getTm()}`, {
      x: lng,
      y: lat
    });
  }
}
