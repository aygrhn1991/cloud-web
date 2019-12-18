import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TboxComponent } from './tbox.component';
import { VehComponent } from './basic/veh/veh.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { GuardService } from 'src/app/services/guard.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CustomComponent } from './download/custom/custom.component';

const routes: Routes = [
  {
    path: '',
    component: TboxComponent,
    children: [
      { path: '', redirectTo: 'basic/veh', pathMatch: 'full' },
      { path: 'basic/veh', component: VehComponent, canActivate: [GuardService] },
      { path: 'download/custom', component: CustomComponent, canActivate: [] },
    ]
  }
];

@NgModule({
  declarations: [
    TboxComponent,
    VehComponent,
    CustomComponent
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
