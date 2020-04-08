import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { VinComponent } from './vin/vin.component';
import { FormsModule } from '@angular/forms';
import { XzqhComponent } from './xzqh/xzqh.component';

@NgModule({
  declarations: [
    VinComponent,
    XzqhComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    VinComponent,
    XzqhComponent
  ]
})
export class ComponentsModule { }
