import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing.component';
import { Routes, RouterModule } from '@angular/router';
import { G6TestingComponent } from './g6-testing/g6-testing.component';
import { TboxTestingComponent } from './tbox-testing/tbox-testing.component';
import { NeTestingComponent } from './ne-testing/ne-testing.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { GuardService } from 'src/app/services/guard.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { G6PlaybackComponent } from './g6-playback/g6-playback.component';

const routes: Routes = [
  {
    path: '',
    component: TestingComponent,
    children: [
      { path: '', redirectTo: 'g6/testing', pathMatch: 'full' },
      { path: 'g6/testing', component: G6TestingComponent, canActivate: [GuardService] },
      { path: 'g6/playback', component: G6PlaybackComponent },
      { path: 'tbox/testing', component: TboxTestingComponent, canActivate: [GuardService] },
      { path: 'ne/testing', component: NeTestingComponent, canActivate: [GuardService] },
    ]
  }
];

@NgModule({
  declarations: [
    TestingComponent,
    G6TestingComponent,
    TboxTestingComponent,
    NeTestingComponent,
    G6PlaybackComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    NgxEchartsModule
  ]
})
export class TestingModule { }
