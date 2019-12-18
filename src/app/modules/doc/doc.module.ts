import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DocComponent } from './doc.component';
import { G6DocComponent } from './g6-doc/g6-doc.component';
import { TboxDocComponent } from './tbox-doc/tbox-doc.component';
import { NeDocComponent } from './ne-doc/ne-doc.component';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';

const routes: Routes = [
  {
    path: '',
    component: DocComponent,
    children: [
      { path: '', redirectTo: 'g6', pathMatch: 'full' },
      { path: 'g6', component: G6DocComponent, canActivate: [GuardService] },
      { path: 'tbox', component: TboxDocComponent, canActivate: [GuardService] },
      { path: 'ne', component: NeDocComponent, canActivate: [GuardService] },
    ]
  }
];

@NgModule({
  declarations: [
    DocComponent,
    G6DocComponent,
    TboxDocComponent,
    NeDocComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class DocModule { }
