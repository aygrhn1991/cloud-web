import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../modules/login/login.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { CloudComponent } from './cloud.component';
import { PublicModule } from '../modules/public.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: CloudComponent,
    children: [
      { path: 'g6', loadChildren: () => import('./g6/g6.module').then(m => m.G6Module) },
      { path: 'tbox', loadChildren: () => import('./tbox/tbox.module').then(m => m.TboxModule) },
      { path: 'ne', loadChildren: () => import('./ne/ne.module').then(m => m.NeModule) },
    ]
  }
];

@NgModule({
  declarations: [CloudComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    PublicModule
  ]
})
export class CloudModule { }
