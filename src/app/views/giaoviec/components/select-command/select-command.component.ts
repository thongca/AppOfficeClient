import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BuocLenhGroupSelect, OptionLenhSelect } from '../../../../models/vanban/quytrinhvanban/quytrinh.model';
import { ApiService } from '../../../../shared/api.service';
import { CommonService } from '../../../../common/common.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRealTimeService } from '../../../../shared/signal-real-time.service';
import { ChuyenXuLyModel } from '../../../../models/vanban/quytrinhvanban/chuyenxuly.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { User } from '../../../../models/systems/systemcategory/user.model';
import { ApifileService } from '../../../../shared/apifile.service';
import { WorkFlow } from '../../../../models/giaoviec/congviecmoi.model';
import { HttpEventType } from '@angular/common/http';
import { SelectlenhsharedService } from '../../sharedmyworks/selectlenhshared.service';
import { map } from 'rxjs/operators';
import { UserNhanThongBao } from '../../../../models/usernhantb.interface';

@Component({
  selector: 'app-select-command',
  templateUrl: './select-command.component.html',
  styleUrls: ['./select-command.component.css']
})
export class SelectCommandComponent implements OnInit, AfterViewInit {
  timeHour = new Date;
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
  ModalTitle = 'Trình';
  isShowBtn = false;
  listLenh: BuocLenhGroupSelect[] = [];
  listErrors:  [];
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
    private _signalService: SignalRealTimeService
  ) { }
  ngOnInit(): void {
    this.r1GetDataError();
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
          idField: 'Id',
          textField: 'ErrorName',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 2,
          allowSearchFilter: true
        };
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
          return;
        }
      });
  }
  // add quy trình duyệt thời hạn
  r2_PheThoiHan() {
    this.modelTTH.UserDelivers = this.selectedItems;
    this.modalDuyetThoiHan.hide();
    this.modelTTH.DateChange = this._commonService.setTimeToDateAndChangeTimeZone(this.modelTTH.DateChange, this.timeHour);
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
            return;
          }
        });
    }
    r2_YeuCauChinhSua() {
      this.modelTTH.UserDelivers = this.selectedItems;
      this.modalDuyetThoiHan.hide();
      this.modelTTH.DateChange = this._commonService.setTimeToDateAndChangeTimeZone(this.modelTTH.DateChange, this.timeHour);
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
    this.modelTTH.DateChange = null;
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
  DateChange?: Date;
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
  Point: string;
  ErrorName: string;
}

