import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Result1 } from 'src/app/models/result.model';
import { NzNotificationService } from 'ng-zorro-antd';
import { G6DocHttpService } from 'src/app/services/g6/g6doc/g6-doc-http.service';

@Component({
  selector: 'app-doc-manage',
  templateUrl: './doc-manage.component.html',
  styleUrls: ['./doc-manage.component.css']
})
export class DocManageComponent implements OnInit {

  //#region 基本数据
  manageOptions: Array<any> = [
    { value: 1, label: '重连' },
    { value: 2, label: '断开' },
    { value: 3, label: '平台登录' },
    { value: 4, label: '平台登出' },
  ];
  //#endregion

  constructor(private http: G6DocHttpService,
    private notification: NzNotificationService) { }

  ngOnInit() { }

  sendG6DocCmd(msgid: number) {
    this.http.sendG6DocCmd(msgid).subscribe((data: Result1) => {
      if (data.success) {
        this.notification.success('指令发送成功', null);
      }
    });
  }

}
