
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmdIdPipe } from './cmd-id.pipe';
import { VehColorPipe } from './veh-color.pipe';
import { IuprPipe } from './iupr.pipe';
import { ValidPipe } from './valid.pipe';
import { TmlZhPipe } from './tml-zh.pipe';
import { XzqhPipe } from './xzqh.pipe';
import { Xzqh2Pipe } from './xzqh2.pipe';
import { VehPowerPipe } from './veh-power.pipe';
import { Eng1Pipe } from './g6/eng1.pipe';
import { Eng2Pipe } from './g6/eng2.pipe';
import { Eng4Pipe } from './g6/eng4.pipe';
import { EngLocatePipe } from './g6/eng-locate.pipe';
import { ObdProtocolPipe } from './g6/obd-protocol.pipe';
import { ObdMilPipe } from './g6/obd-mil.pipe';
import { VehStatePipe } from './g6/g6doc/veh-state.pipe';
import { LocatePipe } from './locate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CmdIdPipe,
    VehColorPipe,
    IuprPipe,
    ValidPipe,
    ObdMilPipe,
    TmlZhPipe,
    XzqhPipe,
    Xzqh2Pipe,
    VehPowerPipe,
    Eng1Pipe,
    Eng2Pipe,
    Eng4Pipe,
    EngLocatePipe,
    ObdProtocolPipe,
    VehStatePipe,
    LocatePipe
  ],
  exports: [
    CmdIdPipe,
    VehColorPipe,
    IuprPipe,
    ValidPipe,
    ObdMilPipe,
    TmlZhPipe,
    XzqhPipe,
    Xzqh2Pipe,
    VehPowerPipe,
    Eng1Pipe,
    Eng2Pipe,
    Eng4Pipe,
    EngLocatePipe,
    ObdProtocolPipe,
    VehStatePipe,
    LocatePipe
  ]

})
export class PipesModule { }
