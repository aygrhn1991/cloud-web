import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzNotificationService } from "ng-zorro-antd";

@Injectable({
  providedIn: "root"
})
export class CmdService {
  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  public searchSimpVehs(val: any, acceptDataFunc: any): void {
    console.log("http:searchSimpVehs", val);
    const ob1 = this.http.get(`/cmd/svc/query/1/${val}`);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendTboxCruiseLicence(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendTboxCruiseLicence", cmd);
    const ob1 = this.http.post(`/cmd/tbox/sendCruiseLicence`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  public sendTboxRemoteDiag(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendTboxRemoteDiag", cmd);
    const ob1 = this.http.post(`/cmd/tbox/sendRemoteDiag`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendTboxDtuConfig(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendTboxDtuConfig", cmd);
    const ob1 = this.http.post(`/cmd/tbox/sendDtuConfig`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendTboxRemoteCtrl(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendTboxRemoteCtrl", cmd);
    const _url = `/cmd/tbox/sendRemoteCtrl`;
    cmd.items.forEach(item => {
      const ob1 = this.http.post(_url, {
        ctrlId: item.id,
        val: item.val,
        vids: cmd.vids
      });
      ob1.subscribe(
        (data: any) => {
          if (acceptDataFunc) {
            acceptDataFunc(data);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
  }

  public sendjt808DtuConfig(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendjt808DtuConfig", cmd);
    const ob1 = this.http.post(`/cmd/jt808/sendDtuConfig`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendjt808NormalCmd(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendjt808NormalCmd", cmd);
    const ob1 = this.http.post(`/cmd/jt808/sendNormalCmd`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendjt808SchDtuConfig(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendjt808SchDtuConfig", cmd);
    const ob1 = this.http.post(`/cmd/jt808/sendSchDtuConfig`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendjt808CtrlDtu(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendjt808SchDtuConfig", cmd);
    const ob1 = this.http.post(`/cmd/jt808/sendCtrlDtu`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendg6Upgrade(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendg6Upgrade", cmd);
    const ob1 = this.http.post(`/cmd/g6/sendUpgrade`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public sendg6Normal(cmd: any, acceptDataFunc: any): void {
    console.log("http:sendg6Upgrade", cmd);
    const ob1 = this.http.post(`/cmd/g6/sendNormalCmd`, cmd);
    ob1.subscribe(
      (data: any) => {
        if (acceptDataFunc) {
          acceptDataFunc(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public showMessage(msg: string): void {
    this.notification.blank("通知", msg);
  }
}
