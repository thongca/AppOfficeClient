import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trangthaiSchedule'
})
export class TrangthaiSchedulePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return 'Công việc chính';
        case 1:
        return 'Chưa bắt đầu';
        case 2:
          return 'Đang thực hiện';
          case 3:
            return 'Đã hoàn thành';
      default:
        return 'Công việc chính';
    }
  }

}
