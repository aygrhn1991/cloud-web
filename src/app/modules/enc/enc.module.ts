import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule, registerLocaleData } from "@angular/common";
import { ComponentsModule } from "src/app/components/components.module";
import { EncComponent } from "./enc.component";
import { FormsModule } from "@angular/forms";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh);

@NgModule({
  declarations: [EncComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: EncComponent }]),
    NgZorroAntdModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class EncModule {}
