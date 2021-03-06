import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehComponent } from './basic/veh/veh.component';
import { CustomComponent } from './download/custom/custom.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { GuardService } from 'src/app/services/guard.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DataObdComponent } from './data/data-obd/data-obd.component';
import { DataEngComponent } from './data/data-eng/data-eng.component';
import { OdoMileComponent } from './data/odo-mile/odo-mile.component';
import { OnlineLogComponent } from './data/online-log/online-log.component';
import { EngModeComponent } from './doc/eng-mode/eng-mode.component';
import { VehModeComponent } from './doc/veh-mode/veh-mode.component';
import { ChipModeComponent } from './doc/chip-mode/chip-mode.component';
import { DtuModeComponent } from './doc/dtu-mode/dtu-mode.component';
import { VehDocComponent } from './doc/veh-doc/veh-doc.component';
import { ChipPrefixComponent } from './doc/chip-prefix/chip-prefix.component';
import { DtuAuthorityComponent } from './doc/dtu-authority/dtu-authority.component';
import { ApiTestComponent } from './doc/api-test/api-test.component';
import { DocManageComponent } from './doc/doc-manage/doc-manage.component';
import { FuelMonthComponent } from './data/fuel-month/fuel-month.component';
import { FuelDayComponent } from './data/fuel-day/fuel-day.component';
import { TestingComponent } from './testing/testing/testing.component';
import { PlaybackComponent } from './testing/playback/playback.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReportComponent } from './report/report/report.component';
import { CmdComponent } from './cmd/cmd/cmd.component';
import { EncComponent } from './enc/enc/enc.component';
import { IndexComponent } from './index/index.component';
import { VehDaySumComponent } from './report/veh-day-sum/veh-day-sum.component';
import { VehDayReportComponent } from './report/veh-day-report/veh-day-report.component';
import { VehDayFaultComponent } from './report/veh-day-fault/veh-day-fault.component';
import { VehMonthReportComponent } from './report/veh-month-report/veh-month-report.component';
import { VehYearReportComponent } from './report/veh-year-report/veh-year-report.component';
import { VehSpeedFuelComponent } from './report/veh-speed-fuel/veh-speed-fuel.component';
import { VehSpeedFuelDiffComponent } from './report/veh-speed-fuel-diff/veh-speed-fuel-diff.component';
import { VehSpeedOutputComponent } from './report/veh-speed-output/veh-speed-output.component';
import { VehSpeedOutputDiffComponent } from './report/veh-speed-output-diff/veh-speed-output-diff.component';
import { OemSpeedDurationComponent } from './report/oem-speed-duration/oem-speed-duration.component';
import { OemSpeedMileComponent } from './report/oem-speed-mile/oem-speed-mile.component';
import { OemSpeedFuelComponent } from './report/oem-speed-fuel/oem-speed-fuel.component';
import { OemSpeedOutputComponent } from './report/oem-speed-output/oem-speed-output.component';
import { OemConditionComponent } from './report/oem-condition/oem-condition.component';
import { OemConditionSumComponent } from './report/oem-condition-sum/oem-condition-sum.component';
import { OemIdlingComponent } from './report/oem-idling/oem-idling.component';
import { OemFaultComponent } from './report/oem-fault/oem-fault.component';
import { OemAverageReportComponent } from './report/oem-average-report/oem-average-report.component';
import { VehIdlingMonthComponent } from './report/veh-idling-month/veh-idling-month.component';
import { VehIdlingYearComponent } from './report/veh-idling-year/veh-idling-year.component';
import { MonComponent } from './mon/mon/mon.component';
import { HeaderComponent } from './mon/mon/header/header.component';
import { SchvehComponent } from './mon/mon/schveh/schveh.component';
import { SurveyComponent } from './mon/mon/survey/survey.component';
import { LabelTextComponent } from './mon/mon/label-text/label-text.component';
import { VehSpeedFuelYearComponent } from './report/veh-speed-fuel-year/veh-speed-fuel-year.component';
import { VehSpeedOutputYearComponent } from './report/veh-speed-output-year/veh-speed-output-year.component';
import { OemSpeedDurationYearComponent } from './report/oem-speed-duration-year/oem-speed-duration-year.component';
import { OemSpeedFuelYearComponent } from './report/oem-speed-fuel-year/oem-speed-fuel-year.component';
import { OemSpeedMileYearComponent } from './report/oem-speed-mile-year/oem-speed-mile-year.component';
import { OemSpeedOutputYearComponent } from './report/oem-speed-output-year/oem-speed-output-year.component';
import { OemConditionYearComponent } from './report/oem-condition-year/oem-condition-year.component';
import { OemConditionSumYearComponent } from './report/oem-condition-sum-year/oem-condition-sum-year.component';
import { OemIdlingYearComponent } from './report/oem-idling-year/oem-idling-year.component';
import { OemFaultYearComponent } from './report/oem-fault-year/oem-fault-year.component';
import { OemAverageReportYearComponent } from './report/oem-average-report-year/oem-average-report-year.component';
import { VehReportComponent } from './report/veh-report/veh-report.component';
import { OemReportComponent } from './report/oem-report/oem-report.component';
import { UserComponent } from 'src/app/modules/security/user/user.component';
import { RoleComponent } from 'src/app/modules/security/role/role.component';
import { PublicModule } from 'src/app/modules/public.module';

const routes: Routes = [


  { path: '', redirectTo: 'index', pathMatch: 'full' },

  { path: 'index/index', component: IndexComponent, canActivate: [GuardService] },

  { path: 'basic/veh', component: VehComponent, canActivate: [GuardService] },

  { path: 'security/user', component: RoleComponent, canActivate: [GuardService] },
  { path: 'security/role', component: UserComponent, canActivate: [GuardService] },

  { path: 'data/data-eng', component: DataEngComponent, canActivate: [GuardService] },
  { path: 'data/data-obd', component: DataObdComponent, canActivate: [GuardService] },
  { path: 'data/odo-mile', component: OdoMileComponent, canActivate: [GuardService] },
  { path: 'data/online-log', component: OnlineLogComponent, canActivate: [GuardService] },
  { path: 'data/fuel-month', component: FuelMonthComponent, canActivate: [GuardService] },
  { path: 'data/fuel-day', component: FuelDayComponent, canActivate: [GuardService] },

  { path: 'download/custom', component: CustomComponent, canActivate: [GuardService] },

  { path: 'report/report', component: ReportComponent, canActivate: [GuardService] },
  { path: 'report/veh-day-report', component: VehDayReportComponent, canActivate: [GuardService] },
  { path: 'report/veh-day-sum', component: VehDaySumComponent, canActivate: [GuardService] },
  { path: 'report/veh-day-fault', component: VehDayFaultComponent, canActivate: [GuardService] },

  { path: 'report/veh-report', component: VehReportComponent, canActivate: [GuardService] },
  { path: 'report/oem-report', component: OemReportComponent, canActivate: [GuardService] },

  { path: 'report/veh-month-report', component: VehMonthReportComponent, canActivate: [GuardService] },
  { path: 'report/veh-year-report', component: VehYearReportComponent, canActivate: [GuardService] },
  { path: 'report/veh-idling-month', component: VehIdlingMonthComponent, canActivate: [GuardService] },
  { path: 'report/veh-idling-year', component: VehIdlingYearComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-fuel', component: VehSpeedFuelComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-fuel-year', component: VehSpeedFuelYearComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-fuel-diff', component: VehSpeedFuelDiffComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-output', component: VehSpeedOutputComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-output-year', component: VehSpeedOutputYearComponent, canActivate: [GuardService] },
  { path: 'report/veh-speed-output-diff', component: VehSpeedOutputDiffComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-duration', component: OemSpeedDurationComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-duration-year', component: OemSpeedDurationYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-mile', component: OemSpeedMileComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-mile-year', component: OemSpeedMileYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-fuel', component: OemSpeedFuelComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-fuel-year', component: OemSpeedFuelYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-output', component: OemSpeedOutputComponent, canActivate: [GuardService] },
  { path: 'report/oem-speed-output-year', component: OemSpeedOutputYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-condition', component: OemConditionComponent, canActivate: [GuardService] },
  { path: 'report/oem-condition-year', component: OemConditionYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-condition-sum', component: OemConditionSumComponent, canActivate: [GuardService] },
  { path: 'report/oem-condition-sum-year', component: OemConditionSumYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-idling', component: OemIdlingComponent, canActivate: [GuardService] },
  { path: 'report/oem-idling-year', component: OemIdlingYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-fault', component: OemFaultComponent, canActivate: [GuardService] },
  { path: 'report/oem-fault-year', component: OemFaultYearComponent, canActivate: [GuardService] },
  { path: 'report/oem-average-report', component: OemAverageReportComponent, canActivate: [GuardService] },
  { path: 'report/oem-average-report-year', component: OemAverageReportYearComponent, canActivate: [GuardService] },

  { path: 'cmd/cmd', component: CmdComponent, canActivate: [GuardService] },

  { path: 'mon/mon', component: MonComponent, canActivate: [GuardService] },

  { path: 'enc/enc', component: EncComponent, canActivate: [GuardService] },

  { path: 'testing/testing', component: TestingComponent, canActivate: [GuardService] },
  { path: 'testing/playback', component: PlaybackComponent, canActivate: [GuardService] },

  { path: 'doc/eng-mode', component: EngModeComponent, canActivate: [GuardService] },
  { path: 'doc/veh-mode', component: VehModeComponent, canActivate: [GuardService] },
  { path: 'doc/chip-mode', component: ChipModeComponent, canActivate: [GuardService] },
  { path: 'doc/chip-prefix', component: ChipPrefixComponent, canActivate: [GuardService] },
  { path: 'doc/dtu-mode', component: DtuModeComponent, canActivate: [GuardService] },
  { path: 'doc/dtu-authority', component: DtuAuthorityComponent, canActivate: [GuardService] },
  { path: 'doc/veh-doc', component: VehDocComponent, canActivate: [GuardService] },
  { path: 'doc/api-test', component: ApiTestComponent, canActivate: [GuardService] },
  { path: 'doc/doc-manage', component: DocManageComponent, canActivate: [GuardService] },


];

@NgModule({
  declarations: [
    VehComponent,
    CustomComponent,
    DataObdComponent,
    DataEngComponent,
    OdoMileComponent,
    OnlineLogComponent,
    EngModeComponent,
    VehModeComponent,
    ChipModeComponent,
    DtuModeComponent,
    VehDocComponent,
    ChipPrefixComponent,
    DtuAuthorityComponent,
    ApiTestComponent,
    DocManageComponent,
    FuelMonthComponent,
    FuelDayComponent,
    TestingComponent,
    PlaybackComponent,
    ReportComponent,
    CmdComponent,
    EncComponent,
    IndexComponent,
    VehDaySumComponent,
    VehDayReportComponent,
    VehDayFaultComponent,
    VehMonthReportComponent,
    VehYearReportComponent,
    VehSpeedFuelComponent,
    VehSpeedFuelDiffComponent,
    VehSpeedOutputComponent,
    VehSpeedOutputDiffComponent,
    OemSpeedDurationComponent,
    OemSpeedMileComponent,
    OemSpeedFuelComponent,
    OemSpeedOutputComponent,
    OemConditionComponent,
    OemConditionSumComponent,
    OemIdlingComponent,
    OemFaultComponent,
    OemAverageReportComponent,
    VehIdlingMonthComponent,
    VehIdlingYearComponent,
    MonComponent,
    HeaderComponent,
    SchvehComponent,
    SurveyComponent,
    LabelTextComponent,
    VehSpeedFuelYearComponent,
    VehSpeedOutputYearComponent,
    OemSpeedDurationYearComponent,
    OemSpeedFuelYearComponent,
    OemSpeedMileYearComponent,
    OemSpeedOutputYearComponent,
    OemConditionYearComponent,
    OemConditionSumYearComponent,
    OemIdlingYearComponent,
    OemFaultYearComponent,
    OemAverageReportYearComponent,
    VehReportComponent,
    OemReportComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    NgxEchartsModule,
    PublicModule
  ]
})
export class G6Module { }
