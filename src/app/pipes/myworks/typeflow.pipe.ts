import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeflow'
})
export class TypeflowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return 'Bắt đầu quy trình';
      case 1:
        return 'Trình phê duyệt thời hạn';
      case 2:
        return 'Đã phê duyệt thời hạn';
      case 4:
        return 'Trình phê duyệt kết quả';
      case 5:
        return 'Yêu cầu chỉnh sửa';
      case 6:
        return 'Đạt chất lượng';
      case 7:
        return 'Xin thêm thời gian';
      case 8:
        return 'Nhắc nhở và gia hạn';
      case 9:
        return 'Tính lỗi nặng';
      default:
        return 'Hoàn thành quy trình';
    }
  }

}
