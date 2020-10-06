import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { SearchService } from '../../../../shared/search.service';
import { CommonService } from '../../../../common/common.service';
import { IGrouprole } from '../../../../models/systems/systemcategory/grouprole.model';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { IMenuCom, IMenuNestPara } from '../../../../models/systems/systemmanagement/imenucom.model';
import { IMenuPermission } from '../../../../models/systems/systemmanagement/ipermission.model';

@Component({
  selector: 'app-permissionmodule',
  templateUrl: './permissionmodule.component.html',
  styleUrls: ['./permissionmodule.component.css']
})
export class PermissionmoduleComponent implements OnInit {
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0, rankrole: this.userlogin.rankrole
  };
  private load = false;
  NameMenu = 'Phân module';
  errormodal = '';
  listGroupRole: IGrouprole[];
  listData: IMenuCom[];
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.options.companyId = Number(this._commonService.getCompanyUser());
  }
  r2_AddData(value: IMenuPermission, check: boolean, type: number) {
    switch (type) {
      case 1:
        value.ViewPer = !value.ViewPer;
        break;
      case 2:
        value.AddPer = !value.AddPer;
        break;
      case 3:
        value.EditPer = !value.EditPer;
        break;
      case 4:
        value.DelPer = !value.DelPer;
        break;
      default:
        value.ExportPer = !value.ExportPer;
    }
    if (Number(this.options.companyId) === 0 || this.options.companyId === null) {
      this.toastr.warning('Bạn phải chọn công ty trước khi thực hiện phân quyền', 'Thông báo');
      return;
    }
    value.CompanyId = this.options.companyId;
    value.DepartmentId = this.options.departmentId;
    value.NestId = this.options.nestId;
    value.GroupRoleId = this.options.groupId;
    this._apiService.r2_Add_Data_Model(value, 'api/PermissionGroup/r2AddDataModel')
      .subscribe(res => {
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

  r1GetDataList() {
    let url = '';
    if (this.options.departmentId > 0 && this.options.nestId === 0) {
      url = 'api/PermissionGroup/r1GetListDataDepartment';
    } else if (this.options.nestId > 0 && this.options.departmentId > 0) {
      url = 'api/PermissionGroup/r1GetListDataNest';
    } else {
      url = 'api/PermissionGroup/r1GetListData';
    }
    this.options.rankrole = this.userlogin.rankrole;
    this._apiService.r1_Post_List_Data(this.options, url)
      .subscribe(res => {
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
  r1GetDataGroupRole() {
    this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListGroupRole')
      .subscribe(res => {
        this.load = true;
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listGroupRole = res['data'];
      });
  }
  SelectRow(Id, Name) {
    this.NameMenu = 'Phân module cho ' + Name;
    this.options.groupId = Id;
    this.r1GetDataList();
  }
  selectCompany(companyId) {
    this.options.companyId = companyId;

  }
  selectDepartment(value) {
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.options.nestId = value;
    this.r1GetDataGroupRole();
  }
}
