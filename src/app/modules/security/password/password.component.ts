import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Result } from 'src/app/models/result.model';
import { AccountModel } from 'src/app/models/sec.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  accountModel: AccountModel = new AccountModel();

  constructor(private util: UtilService,
    private http: HttpService,
    private notification: NzNotificationService, ) { }

  ngOnInit() {
  }

  save() {
    if (this.util.isNull(this.accountModel.password) || this.util.isNull(this.accountModel.newPassword) || this.util.isNull(this.accountModel.confirmPassword)) {
      this.notification.error('所有项必须填写', null);
      return;
    }
    if (this.accountModel.confirmPassword != this.accountModel.newPassword) {
      this.notification.error('两次密码不一致', null);
      return;
    }
    this.http.changePassword(this.accountModel.password, this.accountModel.newPassword).subscribe((data: Result) => {
      if (data.successed) {
        this.notification.success('修改成功', null);
      } else {
        this.notification.error(data.msg, null);
      }
    });
  }

}
