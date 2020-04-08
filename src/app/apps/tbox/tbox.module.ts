import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehComponent } from './basic/veh/veh.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { GuardService } from 'src/app/services/guard.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CustomComponent } from './download/custom/custom.component';
import { IndexComponent } from './index/index/index.component';

const routes: Routes = [

      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index/index', component: IndexComponent, canActivate: [GuardService] },
      { path: 'basic/veh', component: VehComponent, canActivate: [GuardService] },
      { path: 'download/custom', component: CustomComponent, canActivate: [] },

];

@NgModule({
  declarations: [
    VehComponent,
    CustomComponent,
    IndexComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,    
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class TboxModule { }
