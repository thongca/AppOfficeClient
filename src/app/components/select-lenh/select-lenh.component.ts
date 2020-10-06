import { UserXNHT } from './../../models/vanban/quytrinhvanban/chuyenxuly.model';
import { User } from './../../models/systems/systemcategory/user.model';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { CommonService } from '../../common/common.service';
import { OptionLenhSelect, BuocLenhGroupSelect } from '../../models/vanban/quytrinhvanban/quytrinh.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ChuyenXuLyModel, UserNhan } from '../../models/vanban/quytrinhvanban/chuyenxuly.model';
import { ToastrService } from 'ngx-toastr';
import { SignalRealTimeService } from '../../shared/signal-real-time.service';
import { UserNhanThongBao } from '../../models/usernhantb.interface';

@Component({
  selector: 'app-select-lenh',
  templateUrl: './select-lenh.component.html',
  styleUrls: ['./select-lenh.component.css']
})
export class SelectLenhComponent implements OnInit {
  modelChuyenXuLy: ChuyenXuLyModel = {
    Time: new Date(),
    NguoiGuiId: this._commonService.getUser().Id,
    NameNguoiGui: this._commonService.getUser().FullName
  };
  modelUserNhan: UserNhan = {
  };
  modelUserXNHT: UserXNHT = {
  };
  isShowBtn = false;
  _VbMoiSoHoaId: string;
  @Input() MenuId: string;
  @Input() set VbLuanChuyenId(value) {
    this.modelChuyenXuLy.Id = value;
  }
  @Output() refreshPaList = new EventEmitter();
  @ViewChild('modalOpinion', { static: false }) public modalOpinion: ModalDirective;
  @ViewChild('modalMoveProcess', { static: false }) public modalMoveProcess: ModalDirective;
  @ViewChild('modalXNHT', { static: false }) public modalXNHT: ModalDirective;
  @ViewChild('modalTraLai', { static: false }) public modalTraLai: ModalDirective;
  @ViewChild('modalTrinhKy', { static: false }) public modalTrinhKy: ModalDirective;
  BuocLenhGroupId = 0;
  options: OptionLenhSelect = {
    MenuId: '',
    GroupRoleId: 0
  };
  isNguoiLap: boolean;
  isNguoiGui: boolean;
  ModalTitle = 'Trình';
  listLenh: BuocLenhGroupSelect[] = [];
  constructor(
    private _apiService: ApiService,
    private _commonService: CommonService,
    private toastr: ToastrService,
    private _signalService: SignalRealTimeService
  ) { }

  ngOnInit(): void {
    this.r1GetDataLenh();
  }
  r1GetDataLenh() {
    this.options.MenuId = this.MenuId;
    this.options.GroupRoleId = this._commonService.getGroupUser();
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_List_Data_Model_General(this.options, 'api/Common/r1GetListDataLenhTheoUser')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listLenh = res['data'];
      });
  }
  r2_XuLyData() {
      this.modelChuyenXuLy.MenuNhanId = 'VB0108';
      this.modelChuyenXuLy.MenuGuiId = this.MenuId;
      this.modelChuyenXuLy.TrangThaiXuLy = 2;
      this.modalTrinhKy.hide();
    this._apiService.r2_Add_Data_Model(this.modelChuyenXuLy, 'api/SoHoaVanBan/r2AddQTChuyenChoPheDuyet')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Lỗi khi trình ký văn bản!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi trình ký văn bản!', 'Thông báo');
          return;
        }
        this.refreshPaList.emit();
        this._signalService.GetNguoiNhanThongBao(res['nguoiNhanTbs'] as UserNhanThongBao[]);
        this.toastr.success('Trình ký văn bản thành công!', 'Thông báo');
        return;
      });
  }
  r2_AddXinYKien() {

  }
  // add quy trình chuyển xử lý
  r2_ChuyenXuLy() {
    this.modelChuyenXuLy.MenuNhanId = 'VB0111';
    this.modelChuyenXuLy.MenuGuiId = this.MenuId;
    this.modelChuyenXuLy.TrangThaiXuLy = 5;
    this.modalTrinhKy.hide();
    const op = {
      'VB_QT_LuanChuyenVanBan': this.modelChuyenXuLy,
      'UserNhan': this.modelUserNhan
    };
    this._apiService.r2_Add_Data_Model(op, 'api/SoHoaVanBan/r2AddQTChuyenXuLy')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Lỗi khi chuyển xử văn bản!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi trình ký văn bản!', 'Thông báo');
          return;
        }
        this.toastr.success('Chuyển xử lý văn bản thành công!', 'Thông báo');
        return;
      });
  }
  r2_XNHT() {
    this.modelChuyenXuLy.MenuNhanId = 'VB0109';
    this.modelChuyenXuLy.MenuGuiId = this.MenuId;
    this.modelChuyenXuLy.TrangThaiXuLy = 3;
    this.modalXNHT.hide();
    const op = {
      'VB_QT_LuanChuyenVanBan': this.modelChuyenXuLy,
      'UserXNHT': this.modelUserXNHT
    };
    this._apiService.r2_Add_Data_Model(op, 'api/VanBanChoPheDuyet/r2AddQTPheDuyetTrinhKy')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Lỗi khi chuyển xử văn bản!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi phê duyệt văn bản!', 'Thông báo');
          return;
        }
        this._signalService.GetNguoiNhanThongBao(res['nguoiNhanTbs'] as UserNhanThongBao[]);
        this.toastr.success('Chuyển xử lý văn bản thành công!', 'Thông báo');
        return;
      });
  }
  r2_TralaiVb() {
    this.modelChuyenXuLy.MenuNhanId = 'VB0110';
    this.modelChuyenXuLy.MenuGuiId = this.MenuId;
    this.modelChuyenXuLy.TrangThaiXuLy = 4;
    this.modalTraLai.hide();
    const op = {
      'VB_QT_LuanChuyenVanBan': this.modelChuyenXuLy,
      'UserXNHT': this.modelUserXNHT
    };
    this._apiService.r2_Add_Data_Model(op, 'api/VanBanChoPheDuyet/r2AddQTTraLaiTrinhKy')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Lỗi khi chuyển xử văn bản!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi trả lại trình ký văn bản!', 'Thông báo');
          return;
        }
        this._signalService.GetNguoiNhanThongBao(res['nguoiNhanTbs'] as UserNhanThongBao[]);
        this.toastr.success('Chuyển xử lý văn bản thành công!', 'Thông báo');
        return;
      });
  }
  // modal trình ký
  getNguoiNhanTK(value: User) {
    this.modelChuyenXuLy.NguoiKyId = value.Id;
    this.modelChuyenXuLy.TenNguoiKy = value.FullName;
    this.modelChuyenXuLy.NguoiNhanId = value.Id;
    this.modelChuyenXuLy.TenNguoiNhan = value.FullName;
  }
  // modal trình ký

  dateSelect(date) {
    this.modelChuyenXuLy.HanXuLy = date;
  }
  getUserInfo(value: User) {
    this.modelUserNhan.NguoiChiDaoId = value.Id;
    this.modelUserNhan.TenNguoiChiDao = value.FullName;
  }
  getNXLC(value: User) {
    this.modelUserNhan.TenNguoiXuLy = value.FullName;
    this.modelUserNhan.NguoiXuLyId = value.Id;
  }
  getNDXL(value: User) {
    this.modelUserNhan.TenNguoiDXuLy = value.FullName;
    this.modelUserNhan.NguoiDXuLyId = value.Id;
  }
  getNNDB(value: User) {
    this.modelUserNhan.TenNguoiNDB = value.FullName;
    this.modelUserNhan.NguoiNDBId = value.Id;
  }
  showBtn(value: boolean) {
    if (value === true) {
      this.isShowBtn = value;
    } else {
      this.isShowBtn = false;
    }
  }
  ShowModal(Code, Id) {
    this.BuocLenhGroupId = Id;
    switch (Code) {
      case 'VB_XINYKIEN':
        this.modalOpinion.show();
        this.ModalTitle = 'Trình xin ý kiến';
        break;
      case 'VB_CHUYENXULY':
        this.modalMoveProcess.show();
        this.ModalTitle = 'Chuyển xử lý';
        this.modelChuyenXuLy.MaLenh = 'VB_CHUYENXULY';
        break;
      case 'VB_CHOTRINHKY':
        this.modalTrinhKy.show();
        this.ModalTitle = 'Trình ký';
        this.modelChuyenXuLy.MaLenh = 'VB_CHOTRINHKY';
        break;
      case 'VB_DAPHEDUYET':
        this.modalXNHT.show();
        this.ModalTitle = 'Phê duyệt trình ký';
        this.modelChuyenXuLy.MaLenh = 'VB_DAPHEDUYET';
        const op = {
          'Id': Id
        };
        this._apiService.r1_List_Data_Model_General(op, 'api/VanBanCommon/r1checkNguoiNhanXNHT')
          .subscribe(res => {
            if (res === undefined) {
              return;
            }
            if (res['error'] === 1) {
              return;
            }
            this.isNguoiGui = res['IsNguoiGui'];
            this.isNguoiLap = res['IsNguoiLap'];
            this.modelUserXNHT.isNguoiLap = this.isNguoiLap;
            this.modelUserXNHT.isNguoiGui = this.isNguoiGui;
          });
        break;
        case 'VB_TRALAI':
          this.modalTraLai.show();
          this.ModalTitle = 'Trả lại trình ký';
          this.modelChuyenXuLy.MaLenh = 'VB_TRALAI';
          const op1 = {
            'Id': Id
          };
          this._apiService.r1_List_Data_Model_General(op1, 'api/VanBanCommon/r1checkNguoiNhanXNHT')
            .subscribe(res => {
              if (res === undefined) {
                return;
              }
              if (res['error'] === 1) {
                return;
              }
              this.isNguoiGui = res['IsNguoiGui'];
              this.isNguoiLap = res['IsNguoiLap'];
              this.modelUserXNHT.isNguoiLap = this.isNguoiLap;
              this.modelUserXNHT.isNguoiGui = this.isNguoiGui;
            });
          break;
          case 'GV_GIAOVIEC':
            this.modelChuyenXuLy.MaLenh = 'GV_GIAOVIEC';
            const oplccv = {
              'Id': this.modelChuyenXuLy.Id
            };
            this._apiService.r2_Add_Data_Model(oplccv, 'api/CongViecMoi/r2LuanChuyenCongViec')
            .subscribe(res => {
              if (res === undefined) {
                return;
              }
              if (res['error'] === 1) {
                return;
              }
              this.toastr.success('Giao việc thành công!', 'Thông báo');
              return;
            });
            break;
      default:
        break;
    }
  }
}
