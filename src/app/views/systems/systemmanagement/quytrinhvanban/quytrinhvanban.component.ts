import { VbLenhTuongTac } from './../../../../models/vanban/quytrinhvanban/quytrinh.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { CommonService } from '../../../../common/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { IGrouprole } from '../../../../models/systems/systemcategory/grouprole.model';
import { IVbQuyTrinh, VbBuocLenh } from '../../../../models/vanban/quytrinhvanban/quytrinh.model';

@Component({
  selector: 'app-quytrinhvanban',
  templateUrl: './quytrinhvanban.component.html',
  styleUrls: ['./quytrinhvanban.component.css']
})
export class QuytrinhvanbanComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  @ViewChild('modalLenh', { static: false }) public modalLenh: ModalDirective;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0, rankrole: 0
  };
  selectedItems = [];
  dropdownSettings = {};
  permission: number;
  modeltitle: string;
  listData: IVbQuyTrinh[] = [];
  listBuocLenh: VbBuocLenh[] = [];
  listLenhTuongTac: VbLenhTuongTac[] = [];
  listGroupRole: IGrouprole[];
  model: IVbQuyTrinh = {
    Id: 0,
    Name: '',
    check: false,
    IsOrder: 0
  };
  BuocId: number;
  groupRoles: any;
  CheckLength: number;
  public loading = false;
  private loaddata = false;
  private QuyTrinhId = 0;
  dropdownList = [];
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
    private _commonService: CommonService
  ) {
    this.permission = this._commonService.getPermissionUser();
  }

  ngOnInit(): void {
    this.options.companyId = Number(this._commonService.getCompanyUser());

  }
  ngAfterViewInit(): void {
      this._s.DataSearch$.subscribe(res => {
        if (res === undefined || res === '') {
          this.options.s = '';
        } else {
          this.options.s = res;
        }
        if (this.loaddata === true) {
        this.r1GetDataList();
      }
      });
  }
  r1GetDataList() {
    this._apiService.r1_Get_List_Data('api/QuyTrinhVanBan/r1GetListDataQT')
      .subscribe(res => {
        this.loaddata = true;
        if (res === undefined) {
          this.toastr.error('Dữ liệu không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.listData = res['data'];
      });
  }
  r1GetDataBuocQuyTrinh(Id) {
    this.modeltitle = 'Cấu hình quy trình văn bản';
    this.QuyTrinhId = Id;
    const qt = {
      'CompanyId': this.options.companyId,
      'QuyTrinhId': Id
    };
    this._apiService.r1_List_Data_Model_General(qt, 'api/QuyTrinhVanBan/r1GetListDataBuoc')
      .subscribe(res => {
        this.loaddata = true;
        if (res === undefined) {
          this.toastr.error('Dữ liệu không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.modaldata.show();
        this.listBuocLenh = res['data'];
      });
  }
  r1GetDataLenhTuongTac(Id) {
    this.BuocId = Id;
    const qt = {
      'CompanyId': this.options.companyId,
      'QuyTrinhId': this.QuyTrinhId,
      'BuocId': Id
    };
    this._apiService.r1_List_Data_Model_General(qt, 'api/QuyTrinhVanBan/r1GetListDataLTT')
      .subscribe(res => {
        this.loaddata = true;
        if (res === undefined) {
          this.toastr.error('Dữ liệu không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.modalLenh.show();
        this.listLenhTuongTac = res['data'];
      });
  }
  r1GetDataGroupRole() {
    this.options.rankrole = this.userlogin.rankrole;
    this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListGroupRole')
      .subscribe(res => {
        this.loaddata = true;
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listGroupRole = res['data'];
        this.dropdownList = this.listGroupRole;
        this.selectedItems = [
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'Id',
          textField: 'Name',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      });
  }
  r4DelData(BuocId, LenhId) {
    const models = {
      'BuocId': BuocId,
      'LenhTuongTacId': LenhId
    };
    this._apiService.r4DelListDataForcheckBox(models, 'api/QuyTrinhVanBan/r4DelListDataBuocLenh')
      .subscribe(res => {
        if (res['error'] === 2) {
          this.toastr.error(res['ms'], 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Xóa danh sách dữ liệu không thành công!', 'Thông báo');
          return;
        }
        this.CheckLength = 0;
        this.toastr.success('Xóa danh sách dữ liệu thành công!', 'Thông báo');
        this.r1GetDataBuocQuyTrinh(this.QuyTrinhId);
      });
  }
  r2_AddDataBuocLenhTT(check, Id) {
    const models = {
      'BuocId': this.BuocId,
      'LenhTuongTacId': Id
    };
    if (check === true) {
      this._apiService.r2_Add_Data_Model(models, 'api/QuyTrinhVanBan/r2AddListDataBuocLenh')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Thêm dữ liệu không thành công, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Thêm dữ liệu không thành công, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 2) {
          this.toastr.error('Lệnh tương tác đã tồn tại trong bước!, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.toastr.success('Thêm dữ liệu thành công, Vui lòng kiểm tra lại!', 'Thông báo');
        this.r1GetDataBuocQuyTrinh(this.QuyTrinhId);
        return;
      });

    }
  }
  SelectIDEditModel(Id) {
    this.modeltitle = 'Sửa thông tin người dùng';
   this._apiService.r1_GetDataByID(Id, 'api/User').subscribe(res => {
      if (res !== undefined) {
        if (res['error'] === 1) {
          return;
        }
        this.model = res['data'];
        this.selectedItems = res['userGroups'];
      }
    });
    this.modaldata.show();
  }
   // checked
   CheckAll(obj) {
    this.CheckLength = obj.CheckLength;
    this.listBuocLenh = obj.listData;

  }
  CheckedList(checked, Id) {
    this.listData.forEach(function (item) {
      if (Id === item.Id) {
        item.check = checked;
      }
    });
    if (checked === true) {
      this.CheckLength = 1;
    } else if (this.listData.filter(x => x.check === true).length === 0) {
      this.CheckLength = 0;
    }
  }
  selectCompany(companyId) {
    this.options.companyId = companyId;

  }
  selectDepartment(value) {
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.options.nestId = value;
    this.r1GetDataList();
    this.r1GetDataGroupRole();
  }
  showModal() {
    this.modeltitle = 'Thêm mới người sử dụng';
    this.modaldata.show();
    this.model = {
      Id: 0,
      Name: '',
      check: false,
      IsOrder: 0
    };
  }
  radioKichHoat(value) {
    console.log(value);
  }
  dateSelect(date) {
    console.log(date);
  }
  PhanTrang(p) {
    this.options.p = p;
    this.r1GetDataList();
  }
  RefreshData() {
    this.options.s = '';
    this._s.SearchRoot(this.options.s);
    this.options.p = 1;
    this.toastr.success('Tải lại trang thành công', 'Thông báo');
  }
}
