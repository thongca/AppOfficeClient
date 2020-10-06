
import { CommonService } from './../../../../common/common.service';
import { SysDmCompany } from './../../../../models/systems/systemcategory/congty.model';
import { OptionHeader } from './../../../../common/option';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { ToastrService } from 'ngx-toastr';
import { GroupRole } from '../../../../models/systems/systemcategory/grouprole.model';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-grouprole',
  templateUrl: './grouprole.component.html',
  styleUrls: ['./grouprole.component.css']
})
export class GrouproleComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0
  };
  permission: number;
  modeltitle: string;
  listData: GroupRole[] = [];
  model: GroupRole = {
    Id: 0,
    Name: '',
    IsActive: true,
    IsAdminCom: false,
    IsAdminDep: false,
    IsAdminNest: false,
    IsAdministrator: false,
    check: false,
    DepartmentId: this.options.departmentId,
    CompanyId: this.options.companyId,
  };
  CheckLength: number;
  public loading = false;
  private load = false;
  todos$ = this._s.$search;
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
    this.todos$.subscribe(res => {
      if (res === undefined || res === '') {
        this.options.s = '';
      } else {
        this.options.s = res;
      }
      if (this.load === true) {
        this.r1GetDataList();
      }
    });
  }
  r1GetDataList() {
    this._apiService.r1_Post_List_Data(this.options, 'api/GroupRole/r1GetListGroupRole')
      .subscribe(res => {
        this.load = true;
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
  r4DelData(datas) {
    this._apiService.r4DelListDataForcheckBox(datas, 'api/GroupRole/r4DelSys_Dm_GroupRole')
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
    if (this.options.nestId > 0) {
      this.model.DepartmentId = this.options.nestId;
    }
    if (this.model.Id === 0 || this.model.Id === null) {
    this._apiService.r2_Add_Data_Model(this.model, 'api/GroupRole/r1AddDataGroupRole')
      .subscribe(res => {
        if (res === undefined) {
          this.toastr.error('Thêm dữ liệu không thành công, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Thêm dữ liệu không thành công, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.toastr.success('Thêm dữ liệu thành công, Vui lòng kiểm tra lại!', 'Thông báo');
        this.modaldata.hide();
        this.r1GetDataList();
        return;
      });
    } else {
     this._apiService.r3_Put_Data(this.model, 'api/GroupRole').subscribe(res => {
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
    this.modeltitle = 'Sửa nhóm quyền';
   this._apiService.r1_GetDataByID(Id, 'api/GroupRole').subscribe(res => {
      if (res !== undefined) {
        if (res['error'] === 1) {
          return;
        }
        this.model = res['data'];
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
    this.model.CompanyId = this.options.companyId;
    this.options.companyId = companyId;

  }
  selectDepartment(value) {
    this.model.DepartmentId = this.options.departmentId;
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.model.DepartmentId = this.options.nestId;
    this.options.nestId = value;
    this.r1GetDataList();
  }
  showModal() {
    this.modeltitle = 'Thêm mới nhóm quyền';
    this.modaldata.show();
    this.model = {
      Id: 0,
      Name: '',
      IsActive: true,
      IsAdminCom: false,
      IsAdminDep: false,
      IsAdminNest: false,
      IsAdministrator: false,
      check: false,
      DepartmentId: this.options.departmentId,
      CompanyId: this.options.companyId,
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
