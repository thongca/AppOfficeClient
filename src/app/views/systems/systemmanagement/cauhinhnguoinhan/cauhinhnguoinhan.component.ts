import { Component, OnInit } from '@angular/core';
import { OptionQuyTrinh, VbLenhTuongTac, VBQTBuocLenhGroupRole } from '../../../../models/vanban/quytrinhvanban/quytrinh.model';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { CommonService } from '../../../../common/common.service';

@Component({
  selector: 'app-cauhinhnguoinhan',
  templateUrl: './cauhinhnguoinhan.component.html',
  styleUrls: ['./cauhinhnguoinhan.component.css']
})
export class CauhinhnguoinhanComponent implements OnInit {
  options: OptionQuyTrinh = {
    BuocId: 0,

    LenhTuongTacId: 0,
    QuyTrinhId: 0,
    BuocLenhTuongTacId: 0
  };
  NameMenu = 'Cấu hình người nhận';
  listLenhTuongTac: VbLenhTuongTac[] = [];
  listBuocLenhGroups: VBQTBuocLenhGroupRole[] = [];
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
  }
  r1GetDataLenhTuongTac() {
    const qt = {

      'QuyTrinhId': this.options.QuyTrinhId,
      'BuocId': this.options.BuocId
    };
    this._apiService.r1_List_Data_Model_General(qt, 'api/QuyTrinhVanBan/r1GetListDataLTTCHNguoiNhan')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          this.toastr.error('Dữ liệu không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.listLenhTuongTac = res['data'];
      });
  }
  r1GetDataNNtoGroupRole() {
    this._apiService.r1_List_Data_Model_General(this.options, 'api/QuyTrinhVanBan/r2GetCauHinhNN')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          this.toastr.error('Dữ liệu không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.listBuocLenhGroups = res['data'];
      });
  }
  r2_AddData(value: VBQTBuocLenhGroupRole, check: boolean, type: number) {
    if (this.options.BuocLenhTuongTacId === undefined) {
      this.toastr.warning('Bạn phải chọn lệnh trước khi thực hiện', 'Thông báo');
      return;
    }
    switch (type) {
      case 1:
        value.IsAll = !value.IsAll;
        break;
      case 2:
        value.IsAllComCha = !value.IsAllComCha;
        break;
      case 3:
        value.IsAllComCon = !value.IsAllComCon;
        break;
      case 4:
        value.IsDepartment = !value.IsDepartment;
        break;
      case 5:
        value.IsNest = !value.IsNest;
        break;
      case 6:
        value.IsNguoiLap = !value.IsNguoiLap;
        break;
      case 8:
        value.IsManagement = !value.IsManagement;
        break;
      default:
        value.IsNguoiGui = !value.IsNguoiGui;
    }
    value.BuocLenhTuongTacId = this.options.BuocLenhTuongTacId;

    this._apiService.r2_Add_Data_Model(value, 'api/QuyTrinhVanBan/r2AddListDataNNToNhomQuyen')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          this.toastr.error('Lỗi khi lưu thông tin, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi lưu thông tin, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
      });
  }
  SelectRow(buocLenhId, Name) {
    this.NameMenu = 'Cấu hình người nhận cho ' + Name;
    this.options.BuocLenhTuongTacId = buocLenhId;
    this.r1GetDataNNtoGroupRole();
  }

  changeQuyTrinh(value) {
    this.options.QuyTrinhId = Number(value);
  }
  changeSteps(value) {
    this.options.BuocId = Number(value);
    this.r1GetDataLenhTuongTac();
  }
}
