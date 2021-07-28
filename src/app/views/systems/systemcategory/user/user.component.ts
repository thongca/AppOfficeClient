import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { CommonService } from '../../../../common/common.service';
import { User } from '../../../../models/systems/systemcategory/user.model';
import { IGrouprole } from '../../../../models/systems/systemcategory/grouprole.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', groupId: 0,
    departmentId: 0, nestId: 0, rankrole: 0
  };
  selectedItems = [];
  dropdownSettings = {};
  permission: number;
  modeltitle: string;
  listData: User[] = [];
  listPosition: [] = [];
  listGroupRole: IGrouprole[];
  model: User = new User();
  groupRoles: any;
  CheckLength: number;
  thongnguyen: string;
  public loading = false;
  private loaddata = false;
  dropdownList = [];
  ctdepartments = [];
  ctnests = [];
  ctroles = [{
    Id: 1,
    Name: 'Quản trị công ty'
  },
  {
    Id: 2,
    Name: 'Quản trị chi nhánh'
  },
  {
    Id: 3,
    Name: 'Quản trị phòng ban'
  },
  {
    Id: 4,
    Name: 'Quản trị tổ'
  },
  {
    Id: 5,
    Name: 'Quyền thường'
  }
  ];
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
    private _commonService: CommonService
  ) {
    this.permission = this._commonService.getPermissionUser();
  }

  ngOnInit(): void {

    this.r1GetListDataPosition();
    this.r1GetDepartment();

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
  r1GetDepartment() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataCommonDep')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.ctdepartments = res['data'];
        this.r1GetDataNest();
      });
  }
  r1GetDataNest() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataNest')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.ctnests = res['data'];
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
      this._apiService.r2_Add_Data_Model(models, 'api/User/r3UpdateDataModel').subscribe(res => {
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
  selectDepartment(value) {
    this.options.departmentId = value;
    this.model.DepartmentId = Number(value);
  }
  selectNest(value: number) {
    this.options.nestId = value;
    this.model.NestId = value;
    this.r1GetDataList();
    this.r1GetDataGroupRole();
  }
  showModal() {
    this.modeltitle = 'Thêm mới người sử dụng';
    this.modaldata.show();
    this.model = new User();
  }
  onChange_Department(DepartmentId: number): void {
    this.options.departmentId = DepartmentId;
    this.r1GetDataNest();
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
