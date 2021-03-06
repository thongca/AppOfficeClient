import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trangThaiXuLy'
})
export class TrangThaiXuLyPipe implements PipeTransform {

  transform(value: unknown, args: any[]): unknown {
    switch (args.toString()) {
      case 'vanban':
        switch (value) {
          case 1:
            return 'Văn bản mới số hóa';
          case 2:
            return 'Văn bản chờ phê duyệt';
          case 3:
            return 'Văn bản đã phê duyệt';
          case 4:
            return 'Văn bản bị trả lại';
          case 5:
            return 'Văn bản nhận thông báo';
          case 6:
            return 'Văn bản xử lý chính';
          case 7:
            return 'Văn bản đồng xử lý';
          case 8:
            return 'Văn bản nhận để biết';
          default:
            return 'Văn bản mới số hóa';
        }
      case 'giaoviec':
        switch (value) {
          case 0:
            return 'Công việc mới';
          case 1:
            return 'Trình phê duyệt thời hạn';
          case 2:
            return 'Đã phê duyệt thời hạn có chỉnh sửa';
          case 3:
            return 'Đã phê duyệt thời hạn';
          case 4:
            return 'Trình phê duyệt kết quả';
          case 5:
            return 'Yêu cầu chỉnh sửa';
          case 6:
            return 'Đạt chất lượng';
          case 7:
            return 'Trình chỉnh sửa phát sinh';
          case 8:
            return 'Duyệt chỉnh sửa phát sinh';
          case 9:
            return 'Nhắc nhở gia hạn';
          case 10:
            return 'Bị đ/g chất lượng cv';
          case 11:
            return 'Chuyển tiên quyết';
          case 12:
            return 'Chuyển theo dõi';
          case 13:
            return 'Công việc khởi tạo sau';
          case 14:
            return 'Trình phê duyệt khởi tạo sau';
          case 15:
            return 'Khởi tạo sau không được duyệt';
          case 16:
            return 'Khởi tạo sau đã được duyệt';
            case 17:
            return 'Trình giải quyết phối hợp công tác';
          default:
            return 'Công việc mới';
        }
      default:
        break;
    }
  }

}
