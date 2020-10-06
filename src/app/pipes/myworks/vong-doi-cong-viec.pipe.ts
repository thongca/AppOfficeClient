import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vongDoiCongViec'
})
export class VongDoiCongViecPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (args.toString() === 'listhistory') {
      switch (value) {
        case 0:
          return 'Mới tạo';
        case 1:
          return 'Bắt đầu';
        case 2:
          return 'Tạm dừng';
        case 3:
          return 'Tiếp tục';
          case 4:
            return 'Kết thúc';
        default:
          return 'Mới tạo';
      }
    } else {
      switch (value) {
        case 0:
          return 'Mới tạo';
        case 1:
          return 'Đang thực hiện';
        case 2:
          return 'Tạm dừng';
        case 3:
          return 'Đang thực hiện';
          case 4:
            return 'Kết thúc';
        default:
          return 'Đang thực hiện';
      }
    }
  }

}
