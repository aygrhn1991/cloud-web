import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './security/role/role.component';
import { UserComponent } from './security/user/user.component';

@NgModule({
  declarations: [
    LoginComponent,
    RoleComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  exports: [
    LoginComponent,
    RoleComponent,
    UserComponent,
  ]
})
export class PublicModule { }
