import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorService } from './services/interceptor.service';

registerLocaleData(zh);

const routes: Routes = [
  { path: '', redirectTo: '/index/dash-board', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'index', loadChildren: () => import('./modules/index/index.module').then(m => m.IndexModule) },
  { path: 'system', loadChildren: () => import('./modules/system/system.module').then(m => m.SystemModule) },
  { path: 'mon', loadChildren: () => import('./modules/mon/mon.module').then(m => m.MonModule) },
  { path: 'cmd', loadChildren: () => import('./modules/cmd/cmd.module').then(m => m.CmdModule) },
  { path: 'behavior', loadChildren: () => import('./modules/behavior/behavior.module').then(m => m.BehaviorModule) },
  { path: 'g6', loadChildren: () => import('./modules/g6/g6.module').then(m => m.G6Module) },
  { path: 'tbox', loadChildren: () => import('./modules/tbox/tbox.module').then(m => m.TboxModule) },
  { path: 'ne', loadChildren: () => import('./modules/ne/ne.module').then(m => m.NeModule) },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
