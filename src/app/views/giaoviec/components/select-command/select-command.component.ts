import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BuocLenhGroupSelect, OptionLenhSelect } from '../../../../models/vanban/quytrinhvanban/quytrinh.model';
import { ApiService } from '../../../../shared/api.service';
import { CommonService } from '../../../../common/common.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRealTimeService } from '../../../../shared/signal-real-time.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApifileService } from '../../../../shared/apifile.service';
import { CVQTMyWork, WorkFlow } from '../../../../models/giaoviec/congviecmoi.model';
import { HttpEventType } from '@angular/common/http';
import { SelectlenhsharedService } from '../../sharedmyworks/selectlenhshared.service';
import { WorkdetailService } from '../../../../shared/workdetail.service';

@Component({
  selector: 'app-select-command',
  templateUrl: './select-command.component.html',
  styleUrls: ['./select-command.component.css']
})
export class SelectCommandComponent implements OnInit, AfterViewInit {
  timeHour = new Date; // giờ duyệt kết thúc
  timeStart = new Date; // giờ duyệt bắt đầu
  modelView: CVQTMyWork = new CVQTMyWork();
  modelTTH: FlowModel = {
    Time: new Date(),
    NguoiGuiId: this._commonService.getUser().Id,
    NameNguoiGui: this._commonService.getUser().FullName,
    Id: '',
    MyWorkId: '',
    Note: '',
    Require: '',
    FullNames: '',
    UserDelivers: [],
    UserManagerId: null,
    UserNextId: null
  };
  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};
  selectedErrors: Error[] = [];
  dropdownErrorList: Error[] = [];
  droperrorSettings = {};
  BuocLenhGroupId = 0;
  selectedUsers: TypeUserDeli[] = [
  ];
  dropdownUserList: TypeUserDeli[] = [
    {
      Id: 1,
      Name: 'Người chủ trì'
    },
    {
      Id: 2,
      Name: 'Người phối hợp'
    },
    {
      Id: 3,
      Name: 'Người làm trước'
    }
  ];
  dropuserSettings = {
    singleSelection: false,
    idField: 'Id',
    textField: 'Name',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  @Input() MenuId: string;
  @Output() refreshPaList = new EventEmitter();
  @ViewChild('modalTrinhThoiHan', { static: false }) public modalTrinhThoiHan: ModalDirective;
  @ViewChild('modalDuyetThoiHan', { static: false }) public modalDuyetThoiHan: ModalDirective;
  @ViewChild('modalDanhGiaCL', { static: false }) public modalDanhGiaCL: ModalDirective;
  @ViewChild('modalTrinhHT', { static: false }) public modalTrinhHT: ModalDirective;
  @ViewChild('modalDuyetHT', { static: false }) public modalDuyetHT: ModalDirective;
  @ViewChild('modalRejectHT', { static: false }) public modalRejectHT: ModalDirective;
  @ViewChild('modalNNGH', { static: false }) public modalNNGH: ModalDirective;
  @ViewChild('modalTrinhKTS', { static: false }) public modalTrinhKTS: ModalDirective;
  @ViewChild('modalDuyetKts', { static: false }) public modalDuyetKts: ModalDirective;
  @ViewChild('modalTrinhPhoiHop', { static: false }) public modalTrinhPhoiHop: ModalDirective;
  ModalTitle = 'Trình';
  isShowBtn = false;
  listLenh: BuocLenhGroupSelect[] = [];
  listErrors: [];
  options: OptionLenhSelect = {
    MenuId: '',
    GroupRoleId: 0,
    MyWorkId: ''
  };
  vbattach: File = null;
  constructor(
    private _apiService: ApiService,
    private _commonService: CommonService,
    private toastr: ToastrService,
    private _apiFileService: ApifileService,
    private _apiSharedService: SelectlenhsharedService,
    private _signalService: SignalRealTimeService,
    private _workFlowDetail: WorkdetailService,
  ) { }
  ngOnInit(): void {
    this.r1GetDataError();
    this._workFlowDetail.infoWorkFlow$.subscribe(data => {
      this.modelView = data;
      this.modelTTH.DateChange = new Date(data.EndDate);
      this.modelTTH.DateStartChange = new Date(data.ExpectedDate);
      this.timeHour = data.EndDate;
      this.timeStart = data.ExpectedDate;
    });
  }
  ngAfterViewInit(): void {
    this._apiSharedService.listCommands$.subscribe(data => {
      this.listLenh = data;
    });
  }
  r1GetDataLenh() {
    this.options.MenuId = this.MenuId;
    this.options.GroupRoleId = this._commonService.getGroupUser();
    this._apiSharedService.r1_getListLenhs(this.options);
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
  }
  r1GetDataError() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Get_List_Data('api/MyWorkCommon/r1GetListErrorCTG')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.dropdownErrorList = res['data'];
        this.selectedErrors = [
        ];
        this.droperrorSettings = {
          singleSelection: false,
          enableCheckAll: false,
          idField: 'Id',
          textField: 'ErrorName',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 4,
          allowSearchFilter: true
        };
      });
  }
  OnChangeError(data) {
    this.selectedErrors.forEach(item => {
      item.Point = this.dropdownErrorList.find(x => x.Id === item.Id).Point;
      item.Amount = 1;
      item.PointLocal = item.Point;
    });
  }
  DeChangeError(data) {
    this.selectedErrors.forEach(item => {
      item.Point = this.dropdownErrorList.find(x => x.Id === item.Id).Point;
      item.PointLocal = item.Point;
      item.Amount = 1;
    });
  }
  showBtn(value: boolean, workFlow: WorkFlow) {
    this.modelTTH.MyWorkId = workFlow.MyWorkId;
    this.options.MyWorkId = workFlow.MyWorkId;
    this.r1GetDataLenh();
    this.modelTTH.Id = workFlow.Id;
    if (value === true) {
      this.isShowBtn = value;
    } else {
      this.isShowBtn = false;
    }
  }

  // add quy trình chuyển xử lý
  r2_TrinhPheThoiHan() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalTrinhThoiHan.hide();
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowTTH')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt thời hạn hoàn thành!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
    // add quy trình chuyển xử lý
    r2_TrinhGiaiQuyetPhoiHop() {
      this.modelTTH.UserDelivers = this.selectedItems;
      this.modalTrinhThoiHan.hide();
      this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowPHCT')
        .subscribe(res => {
          if (res.type === HttpEventType.Response) {
            if (res === undefined) {
              this.toastr.error(res['body']['ms'], 'Thông báo');
              return;
            }
            if (res['body']['error'] === 1) {
              this.toastr.error(res['body']['ms'], 'Thông báo');
              return;
            }
            this.toastr.success(res['body']['ms'], 'Thông báo');
            this._signalService.GetNguoiNhanThongBao('');
            this._apiSharedService.reloadMyWorkByChangeData();
            this._apiSharedService.r1_getListLenhs(this.options);
            return;
          }
        });
    }
  // add quy trình duyệt thời hạn
  r2_PheThoiHan() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetThoiHan.hide();
    this.modelTTH.DEnd = this._commonService.FromDateToDouble(this._commonService.setTimeToDate(this.modelTTH.DateChange, this.timeHour));
    this.modelTTH.DStart =
      this._commonService.FromDateToDouble(this._commonService.setTimeToDate(this.modelTTH.DateStartChange, this.timeStart));
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowDuyetTH')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt thời hạn hoàn thành!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  // add quy trình duyệt thời hạn
  r2_TrinhHoanThanh() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowHTCV')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalTrinhHT.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt hoàn thành công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  // add quy trình duyệt khởi tạo sau
  r2_TrinhHoanThanhKTS() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowHTCVKTS')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalTrinhKTS.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt hoàn thành công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  r2_PheHoanThanh() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetThoiHan.hide();
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowDuyetHTCV')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalDuyetHT.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt hoàn thành công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  r2_DuyetKhoiTaoSau(type: number) {
    let url = 'api/MyWorkFlow/r2AddWorkFlowDongyKTS';
    if (type === 1) {
      url = 'api/MyWorkFlow/r2AddWorkFlowDongyKTS';
    } else {
      url = 'api/MyWorkFlow/r2AddWorkFlowNotDongyKTS';
    }
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetKts.hide();
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, url)
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalDuyetHT.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi trình phê duyệt hoàn thành công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  r2_YeuCauChinhSua() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetThoiHan.hide();
    this.modelTTH.DEnd = this._commonService.FromDateToDouble(this._commonService.setTimeToDate(this.modelTTH.DateChange, this.timeHour));
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowYeuCauChinhSua')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalRejectHT.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi yêu cầu chỉnh sửa công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  r2_NhacNhoGiaHan() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetThoiHan.hide();
    if (this.modelTTH.DateChange === null) {
      this.toastr.error('Thời gian gia hạn không được để trống!', 'Thông báo');
      return;
    }
    this.modelTTH.DEnd = this._commonService.FromDateToDouble(this._commonService.setTimeToDate(this.modelTTH.DateChange, this.timeHour));
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowNhacNhoGiaHan')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.modalRejectHT.hide();
          if (res === undefined) {
            this.toastr.error('Lỗi khi nhắc nhở và gia hạn công việc!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          this._signalService.GetNguoiNhanThongBao('');
          this._apiSharedService.reloadMyWorkByChangeData();
          this._apiSharedService.r1_getListLenhs(this.options);
          return;
        }
      });
  }
  // đánhg giá chất lượng
  r2_DanhGiaChatLuong() {
    this.modelTTH.Errors = this.selectedErrors;
    this.modelTTH.TypeUserDelis = this.selectedUsers;
    this.modalDanhGiaCL.hide();
    this._apiFileService.r2_addFileModel(this.vbattach, this.modelTTH, 'api/MyWorkFlow/r2AddWorkFlowDGCL')
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          if (res === undefined) {
            this.toastr.error('Lỗi khi đánh giá chất lượng công việc không thành công!', 'Thông báo');
            return;
          }
          if (res['body']['error'] === 1) {
            this.toastr.error(res['body']['ms'], 'Thông báo');
            return;
          }
          this.toastr.success(res['body']['ms'], 'Thông báo');
          return;
        }
      });
  }
  ShowModal(Code, Id) {
    this.vbattach = null;
    this.r1ListUser(Code);
    this.modelTTH.Note = '';
    this.modelTTH.Require = '';
    this.modelTTH.UserDelivers = [];
    this.BuocLenhGroupId = Id;
    switch (Code) {
      case 'CV_TRINHTHOIHAN':
        this.modalTrinhThoiHan.show();
        this.ModalTitle = 'Trình phê duyệt thời hạn';
        break;
      case 'CV_DUYETTHOIHAN':
        this.modalDuyetThoiHan.show();
        this.ModalTitle = 'Phê duyệt thời hạn';
        break;
      case 'CV_DANHGIACL':
        this.modalDanhGiaCL.show();
        this.ModalTitle = 'Đánh giá chất lượng';
        break;
      case 'CV_TRINHHOANTHANH':
        this.modalTrinhHT.show();
        this.ModalTitle = 'Trình hoàn thành công việc';
        break;
      case 'CV_DUYETHOANTHANH':
        this.modalDuyetHT.show();
        this.ModalTitle = 'Duyệt hoàn thành công việc';
        break;
      case 'CV_YEUCAUCHINHSUA':
        this.modalRejectHT.show();
        this.ModalTitle = 'Yêu cầu chỉnh sửa';
        break;
      case 'CV_NHACNHOGIAHAN':
        this.modalNNGH.show(); // nhắc nhở gia hạn
        this.ModalTitle = 'Nhắc nhở và gia hạn';
        break;
      case 'CV_KHOITAOSAU':
        this.modalTrinhKTS.show();
        this.ModalTitle = 'Trình phê duyệt khởi tạo sau';
        break;
      case 'CV_DUYETKHOITAOSAU':
        this.modalDuyetKts.show();
        this.ModalTitle = 'Duyệt công việc khởi tạo sau';
        break;
      case 'CV_TRINHXULYPHOIHOP':
        this.modalTrinhPhoiHop.show();
        this.ModalTitle = 'Trình giải quyết phối hợp công tác';
        break;
      default:
        break;
    }
  }
  r1ListUser(Code: string) {
    const op = {
      'GroupRoleId': Number(this._commonService.getGroupUser()),
      MenuId: this.MenuId,
      MaLenh: Code
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/Common/r1GetListUserNhanViec')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.dropdownList = res['data'];
        this.selectedItems = [
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'UserId',
          textField: 'FullName',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 2,
          allowSearchFilter: true
        };
      });
  }
  dateSelectdc(date) {
    this.modelTTH.DateChange = date;
  }
  datestartdc(date) {
    this.modelTTH.DateStartChange = date;
  }
  onSelectFile(fileInput: any) {
    this.vbattach = fileInput;
  }
}

export class FlowModel {
  Time: Date;
  Id: string;
  MyWorkId: string;
  NguoiGuiId: number;
  NameNguoiGui: string;
  Note: string;
  Require: string;
  FullNames?: string;
  DEnd?: number; // date para number end
  DateChange?: Date;
  DStart?: number; // date para number start
  DateStartChange?: Date;
  UserManagerId?: number;
  UserNextId?: number;
  UserDelivers?: UserDeliver[];
  TypeUserDelis?: TypeUserDeli[];
  Errors?: Error[];
}

export class UserDeliver {
  UserId: number;
  FullName: string;
}
export class TypeUserDeli {
  Id: number;
  Name: string;
}
export class Error {
  Id: number;
  Point: number;
  PointLocal: number;
  Amount: number;
  ErrorName: string;
}

