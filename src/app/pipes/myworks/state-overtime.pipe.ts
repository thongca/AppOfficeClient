import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateOvertime'
})
export class StateOvertimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (Number(value)) {
      case 0:
        return 'Chưa duyệt';
      case 1:
        return 'Đã đồng ý';
      case 2:
        return 'Không đồng ý';
      default:
        return 'Không đồng ý';
    }
  }

}
