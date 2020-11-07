import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { CommonService } from '../../../../common/common.service';
import { User } from '../../../../models/systems/systemcategory/user.model';
import { IGrouprole } from '../../../../models/systems/systemcategory/grouprole.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0, rankrole: 0
  };
  selectedItems = [];
  dropdownSettings = {};
  permission: number;
  modeltitle: string;
  listData: User[] = [];
  listPosition: [] = [];
  listGroupRole: IGrouprole[];
  model: User = {
    Id: 0,
    FullName: '',
    Code: 0,
    IsActive: true,
    check: false,
    Username: '',
    Password: '',
    CompanyId: this.options.companyId,
    DepartmentId: this.options.departmentId,
    PositionId: 0
  };
  groupRoles: any;
  CheckLength: number;
  thongnguyen: string;
  public loading = false;
  private loaddata = false;
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
    this.r1GetListDataPosition();

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
    this._apiService.r1_Post_List_Data(this.options, 'api/User/r1GetListUser')
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
  r1GetListDataPosition() {
    this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataPosition')
      .subscribe(res => {
        this.loaddata = true;
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listPosition = res['data'];
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
  r4DelData(datas) {
    this._apiService.r4DelListDataForcheckBox(datas, 'api/User/r4DelSys_Dm_User')
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
        this.r1GetDataList();
      });
  }
  r2_AddData() {
    if (this.options.companyId === 0) {
      this.toastr.error('Vui lòng chọn công ty!', 'Thông báo');
      return;
    }
    this.model.PositionId = Number(this.model.PositionId);
    const models = {
      'Id': this.model.Id,
      'GroupRoles': this.selectedItems,
      'sys_Dm_User': this.model
    };
    if (this.model.Id === 0 || this.model.Id === null) {
    this._apiService.r2_Add_Data_Model(models, 'api/User/r1AddDataSysDmUser')
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
          this.toastr.error(res['ms'], 'Thông báo');
          return;
        }
        this.toastr.success('Thêm dữ liệu thành công, Vui lòng kiểm tra lại!', 'Thông báo');
        this.modaldata.hide();
        this.r1GetDataList();
        return;
      });
    } else {
     this._apiService.r3_Put_Data(models, 'api/User').subscribe(res => {
        if (res === undefined) {
          if (res['error'] === 1) {
            this.toastr.error('Cập nhật dữ liệu không thành công!!', 'Thông báo');
            return false;
          }
        }
        this.toastr.success('Cập nhật dữ liệu thành công!', 'Thông báo');
        this.r1GetDataList();
        this.modaldata.hide();
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
    this.listData = obj.listData;

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
    this.model.CompanyId = Number(companyId);
    this.options.companyId = Number(companyId);
    this.r1GetListDataPosition();

  }
  selectDepartment(value) {
    this.options.departmentId = value;
    this.model.DepartmentId = Number(value);
  }
  selectNest(value) {
    this.options.nestId = Number(value);
    if (Number(value) > 0) {
      this.model.DepartmentId = Number(value);
    }
    this.r1GetDataList();
    this.r1GetDataGroupRole();
  }
  showModal() {
    this.modeltitle = 'Thêm mới người sử dụng';
    this.modaldata.show();
    this.model = {
      Id: 0,
      FullName: '',
      Code: 0,
      IsActive: true,
      check: false,
      Username: '',
      Password: '',
      CompanyId: this.options.companyId,
      DepartmentId: this.model.DepartmentId,
      PositionId: 0
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
