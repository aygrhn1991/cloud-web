import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';
import { Platform } from '../enums/platform.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: UserModel = new UserModel();

  constructor() { }

  makeUser(user: any, platform: number): UserModel {
    let userModel = new UserModel();
    userModel.id = user.id;
    userModel.name = user.name;
    userModel.oemId = user.entId;
    userModel.oemName = user.entName;
    userModel.platformId = platform;
    switch (platform) {
      case Platform.g6:
        userModel.platformIndex = '/g6/index/index';
        break;
      case Platform.tbox:
        userModel.platformIndex = '/tbox/index/index';
        break;
      case Platform.ne:
        userModel.platformIndex = '/ne/index/index';
        break;
    }
    return userModel;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('access_user'));
  }

}
