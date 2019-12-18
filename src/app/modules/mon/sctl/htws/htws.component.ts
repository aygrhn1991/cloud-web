import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
declare var IoVLib;
@Component({
  selector: 'app-htws',
  templateUrl: './htws.component.html',
  styleUrls: ['./htws.component.css']
})
export class HtwsComponent implements OnInit {
  openFlag = true;
  ws: WebSocket;
  linked: boolean;
  @Output()
  loaded: EventEmitter<any> = new EventEmitter();
  @Output()
  vehLogin: EventEmitter<any> = new EventEmitter();
  @Output()
  vehLogout: EventEmitter<any> = new EventEmitter();
  @Output()
  acceptLngLat: EventEmitter<any> = new EventEmitter();
  @Output()
  acceptObd: EventEmitter<any> = new EventEmitter();
  @Output()
  acceptEngine: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.initWebSocket();
    this.loaded.emit(this);
  }
  initWebSocket() {
    const ip = "192.168.40.157:10000"; //this.getWebsocketIp();
    console.log('================init web socket ing==============' + ip);
    this.createObservableSocket('ws://' + ip + '/rta')
      .subscribe(
        data => {
          try {
            const msg = JSON.parse(data);
            console.log(msg);
            switch (msg.order) {
              case COMMPROT.LNGLAT:
                this.acceptLngLat.emit(msg.data);
                break;
              case COMMPROT.LOGIN:
                this.vehLogin.emit(msg.data);
                break;
              case COMMPROT.LOGOUT:
                this.vehLogout.emit(msg.data);
                break;
              case COMMPROT.G6_OBD:
                this.acceptObd.emit(msg.data);
                break;
              case COMMPROT.G6_ENG:
                this.acceptEngine.emit(msg.data);
                break;
            }
          } catch (ex) {
            console.log(data, ex);
          }
          this.linked = true;
        },
        err => {
          this.linked = false;
          console.error('closed', err);
          setTimeout(() => this.initWebSocket(), 2000);
        },
        () => {
          this.linked = false;
          console.log('', 'ws连接shibai！');
          setTimeout(() => this.initWebSocket(), 2000);
        }
      );
  }

  // 返回一个可观测的流，包括服务器返回的消息
  createObservableSocket(url: string): Observable<any> {
    const nurl = url + '/websocket?tm=' + (new Date().getTime());

    this.ws = new WebSocket(nurl);
    this.ws.onopen = (event) => {
      this.linked = true;
      console.log('linked', 'ws连接成功！');
    };
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  // 向服务器端发送消息
  sendMessage(message: any) {
    if (this.openFlag) {
      console.log('htws.sendMessage', message);
      this.ws.send(JSON.stringify(message));
    }
  }


  public sendSimpClear(): void {
    this.sendMessage({order: COMMPROT.UP_SIMP_APPEND});
  }

  public sendFullClear(): void {
    this.sendMessage({order: COMMPROT.UP_FULL_REMOVE});
  }

  public sendAppendVehs(vehs) {
    console.log(vehs);
    const ids: string[] = [];
    vehs.forEach((veh: any) => {
      ids.push(veh.vid);
    });
    this.sendMessage({order: COMMPROT.UP_SIMP_APPEND, data: ids});
  }

  /**
   * 高频监控一辆车 的全部数据
   */
  public fullMonVeh(vid) {
    this.sendMessage({order: COMMPROT.UP_FULL_APPEND, data: vid});
  }

  private getWebsocketIp() {

    const parser = document.createElement('a');
    parser.href = window.location.href;
    console.log(parser.host, parser.port);
    return parser.host;
  }

  private getWsIp(): any {
    const ip = IoVLib.wsip;
    const url = window.location.href;
    console.log(url);
    const b = this.isInnerIp(url);
    return b ? IoVLib.ws.inip : IoVLib.ws.outip;
  }

  isInnerIp(url: string): boolean {
    let reg1 = /(http|ftp|https|www):\/\//g;
    url = url.replace(reg1, '');
    console.log(url);
    let reg2 = /\:+/g;
    url = url.replace(reg2, '.');
    console.log(url);
    let urlArr = url.split('.');
    let ip = urlArr[0] + '.' + urlArr[1] + '.' + urlArr[2] + '.' + urlArr[3];
    console.log(ip);
    let ipNum = this.getIpNum(ip);
    let aBegin = this.getIpNum("10.0.0.0");
    let aEnd = this.getIpNum("10.255.255.255");
    let bBegin = this.getIpNum("172.16.0.0");
    let bEnd = this.getIpNum("172.31.255.255");
    let cBegin = this.getIpNum("192.168.0.0");
    let cEnd = this.getIpNum("192.168.255.255");
    let dBegin = this.getIpNum("127.0.0.0");
    let dEnd = this.getIpNum("127.255.255.255");
    return ((ipNum >= aBegin) && (ipNum <= aEnd)) ||
      ((ipNum >= bBegin) && (ipNum <= bEnd)) ||
      ((ipNum >= cBegin) && (ipNum <= cEnd)) ||
      ((ipNum >= dBegin) && (ipNum <= dEnd));
  }

  private getIpNum(ip: string) {
    var ipArr = ip.split(".");
    var a = parseInt(ipArr[0]);
    var b = parseInt(ipArr[1]);
    var c = parseInt(ipArr[2]);
    var d = parseInt(ipArr[3]);
    var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
    return ipNum;
  }
}

const COMMPROT = {
  UP_SIMP_REMOVE: 10000,
  UP_SIMP_APPEND: 10001,
  UP_FULL_REMOVE: 10010,
  UP_FULL_APPEND: 10011,
  LNGLAT: 20101,
  LOGIN: 20102,
  LOGOUT: 20103,
  G6_OBD: 20201,
  G6_ENG: 20202,
};
