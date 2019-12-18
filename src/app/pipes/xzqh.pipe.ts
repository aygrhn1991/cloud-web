import { Pipe, PipeTransform } from "@angular/core";
import { ConstService } from "../services/const.service";

@Pipe({
  name: "xzqh"
})
export class XzqhPipe implements PipeTransform {
  transform(value: any, isFullName: boolean): any {
    if (isFullName) {
      return ConstService.getInstance().findFullName(value);
    }
    if (value < 100) {
      return ConstService.getInstance().findSheng(value);
    }
    return ConstService.getInstance().findCity(value);
  }
}
