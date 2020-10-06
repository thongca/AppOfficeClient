import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hanCongViec'
})
export class HanCongViecPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return '';
      case 1:
        return 'Quá hạn';
      case 2:
        return 'Chưa đến hạn';
      case 3:
        return 'Gần đến hạn';
      case 4:
        return 'Tạm hoàn thành & quá hạn';
      case 5:
        return 'Tạm hoàn thành';
      case 6:
        return 'Quá hạn';
      case 7:
        return 'Chưa đến hạn';
      case 8:
        return 'Hoàn thành nhưng quá hạn';
      case 9:
        return 'Hoàn thành';
      default:
        break;
    }
  }

}
