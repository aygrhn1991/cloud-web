import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { VehCodeComponent } from './setting/veh-code/veh-code.component';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';
import { PasswordComponent } from '../security/password/password.component';
import { ErrorComponent } from '../security/error/error.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DtuManuComponent } from './setting/dtu-manu/dtu-manu.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      { path: '', redirectTo: 'security/user', pathMatch: 'full' },
      { path: 'security/password', component: PasswordComponent },
      { path: 'security/error/:message', component: ErrorComponent },
      { path: 'setting/veh-code', component: VehCodeComponent, canActivate: [GuardService] },
      { path: 'setting/dtu-manu', component: DtuManuComponent, canActivate: [GuardService] },
    ]
  }
];

@NgModule({
  declarations: [
    SystemComponent,
    PasswordComponent,
    ErrorComponent,
    VehCodeComponent,
    DtuManuComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class SystemModule { }
