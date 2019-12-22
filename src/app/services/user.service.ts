import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: UserModel = new UserModel();

  constructor() { }

  makeUser(user: any): UserModel {
    let userModel = new UserModel();
    userModel.id = user.id;
    userModel.name = user.name;
    userModel.entId = user.entId;
    userModel.entName = user.entName;
    return userModel;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('access_user'));
  }

}
