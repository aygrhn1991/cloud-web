import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EncService {
  constructor(private http: HttpClient) {}
  private getTm() {
    return new Date().getTime();
  }

  // 加载围栏车辆信息
  public loadEncVehs(encId: any, vin: any, binded: any) {
    return this.http.get(
      `/rtm/enc/loadVehs/${encId}/${vin}/${binded}?tm=${this.getTm()}`
    );
  }

  public saveVehs(encId: any, vids: any[]) {
    return this.http.post(`/rtm/enc/saveVehs/encId?tm=${this.getTm()}`, vids);
  }

  public loadEncs() {
    return this.http.get(`/rtm/enc/loadEncs?tm=${this.getTm()}`);
  }
  public loadEnc(encId: any) {
    return this.http.get(`/rtm/enc/loadEnc/${encId}?tm=${this.getTm()}`);
  }
  public removeEnc(encId: any) {
    return this.http.get(`/rtm/enc/removeEnc/${encId}?tm=${this.getTm()}`);
  }

  public saveEnc(enc: any) {
    switch (enc.shape) {
      case 1:
        return this.saveRectEnc(enc);
      case 2:
        return this.savePolygonEnc(enc);
      case 3:
        return this.saveLineEnc(enc);
    }
  }

  public saveRectEnc(enc: any) {
    return this.http.post(`/rtm/enc/saveRectEnc?tm=${this.getTm()}`, enc);
  }
  public savePolygonEnc(enc: any) {
    return this.http.post(`/rtm/enc/savePolygonEnc?tm=${this.getTm()}`, enc);
  }
  public saveLineEnc(enc: any) {
    return this.http.post(`/rtm/enc/saveLineEnc?tm=${this.getTm()}`, enc);
  }
}
