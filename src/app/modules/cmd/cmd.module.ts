import { NgModule } from "@angular/core";
import { CommonModule,registerLocaleData } from "@angular/common";
import { CmdComponent } from "./cmd.component";
import { Routes, RouterModule } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";
import zh from "@angular/common/locales/zh";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/components/components.module";
import { PipesModule } from "src/app/pipes/pipes.module";
import { TboxDtuParamComponent } from './tbox-dtu-param/tbox-dtu-param.component';
import { TboxDtuConfigComponent } from './tbox-dtu-config/tbox-dtu-config.component';
import { TboxRemoteCtrlComponent } from './tbox-remote-ctrl/tbox-remote-ctrl.component';
import { Jt808DtuConfigComponent } from './jt808-dtu-config/jt808-dtu-config.component';
import { Jt808DtuSearchComponent } from './jt808-dtu-search/jt808-dtu-search.component';
import { Jt808DtuCtrlComponent } from './jt808-dtu-ctrl/jt808-dtu-ctrl.component';
import { G6DtuCtrlComponent} from './g6-dtu-ctrl/g6-dtu-ctrl.component';
import { ZonarParam1Component } from './zonar-param1/zonar-param1.component';
import { CruiseLicenceComponent } from './cruise-licence/cruise-licence.component';
import { TboxRemoteDiagComponent } from './tbox-remote-diag/tbox-remote-diag.component';
import { ZonarConfigComponent } from './zonar-config/zonar-config.component';
import { ZonarParamComponent } from './zonar-param/zonar-param.component';
import { CmdviewG6Component } from './cmdview-g6/cmdview-g6.component';
import { SchvehComponent } from './schveh/schveh.component';
import { CmdviewTboxComponent } from './cmdview-tbox/cmdview-tbox.component';
import { CmdviewJt808Component } from './cmdview-jt808/cmdview-jt808.component';
registerLocaleData(zh);

const routes: Routes = [
  {
    path: "",
    component: CmdComponent,
    children: [
      { path: "", redirectTo: "g6", pathMatch: "full" },
      { path: "g6", component: CmdviewG6Component, canActivate: [] },
      { path: "tbox", component: CmdviewTboxComponent, canActivate: [] },
      { path: "jt808", component: CmdviewJt808Component, canActivate: [] }
    ]
  }
];

@NgModule({
  declarations: [
    CmdComponent,
    TboxDtuParamComponent,
    TboxDtuConfigComponent,
    TboxRemoteCtrlComponent,
    Jt808DtuConfigComponent,
    Jt808DtuSearchComponent,
    Jt808DtuCtrlComponent,
    G6DtuCtrlComponent,
    ZonarParamComponent,
    ZonarConfigComponent,
    ZonarParam1Component,
    CruiseLicenceComponent,
    TboxRemoteDiagComponent,
    CmdviewG6Component,
    SchvehComponent,
    CmdviewTboxComponent,
    CmdviewJt808Component
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule,
    PipesModule
  ]
})
export class CmdModule {}
