import { Injectable } from '@angular/core';
import { AccountModel } from '../models/sec.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  account: AccountModel = new AccountModel();

  constructor(private util: UtilService) {
    let access_user = localStorage.getItem('access_user');
    if (!this.util.isNull(access_user)) {
      this.account = JSON.parse(access_user);
    }
  }

  makeUser(account: AccountModel): void {
    this.account = account;
    localStorage.setItem('access_user', JSON.stringify(this.account));
  }

}
