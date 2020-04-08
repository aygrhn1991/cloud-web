import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexComponent } from './index/index/index.component';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,    
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class NeModule { }
