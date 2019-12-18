import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { SiteMapComponent } from './site-map/site-map.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { GuardService } from 'src/app/services/guard.service';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'dash-board', pathMatch: 'full' },
      { path: 'dash-board', component: DashBoardComponent, canActivate: [GuardService] },
      { path: 'site-map', component: SiteMapComponent, canActivate: [GuardService] },
      { path: 'quick-search', component: QuickSearchComponent, canActivate: [GuardService] },
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    SiteMapComponent,
    DashBoardComponent,
    QuickSearchComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    NgxEchartsModule
  ]
})
export class IndexModule { }
