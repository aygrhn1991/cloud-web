import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MonComponent } from './mon.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SctlComponent } from './sctl/sctl.component';
import { SchvehComponent } from './sctl/schveh/schveh.component';
import { HtwsComponent } from './sctl/htws/htws.component';
import { LabelTextComponent } from './sctl/label-text/label-text.component';
import { LabelIconComponent } from './sctl/label-icon/label-icon.component';
import { HeaderComponent } from './sctl/header/header.component';
import { RtEngineComponent } from './sctl/rt-engine/rt-engine.component';
import { RtObdComponent } from './sctl/rt-obd/rt-obd.component';
import { RtObdDtcComponent } from './sctl/rt-obd-dtc/rt-obd-dtc.component';
import { RtObdIuprComponent } from './sctl/rt-obd-iupr/rt-obd-iupr.component';
import { SurveyComponent } from './sctl/survey/survey.component';
import { VehInfoComponent } from './sctl/veh-info/veh-info.component';
import { CardComponent } from './sctl/card/card.component';
import { GuardService } from 'src/app/services/guard.service';


const routes: Routes = [
  {
    path: '',
    component: MonComponent,
    children: [
      { path: '', redirectTo: 'mon/sctl', pathMatch: 'full' },
      { path: 'mon/track', component: TrackerComponent, canActivate: [] },
      { path: 'mon/sctl', component: SctlComponent, canActivate: [] }
    ]
  }
];

@NgModule({
  declarations: [TrackerComponent, MonComponent, SctlComponent, SchvehComponent, HtwsComponent, LabelTextComponent, LabelIconComponent, HeaderComponent, RtEngineComponent, RtObdComponent, RtObdDtcComponent, RtObdIuprComponent, SurveyComponent, VehInfoComponent, CardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    PipesModule
  ]
})
export class MonModule { }
