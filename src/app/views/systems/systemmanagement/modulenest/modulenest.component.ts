import { Component, OnInit } from '@angular/core';
import { IMenuDepPara, IMenuCom, IMenuNestPara } from '../../../../models/systems/systemmanagement/imenucom.model';
import { CommonService } from '../../../../common/common.service';
import { SearchService } from '../../../../shared/search.service';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { OptionHeader } from '../../../../common/option';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-modulenest',
  templateUrl: './modulenest.component.html',
  styleUrls: ['./modulenest.component.css']
})
export class ModulenestComponent implements OnInit {
  treeControl = new NestedTreeControl<IMenuCom>(node => node.children);
  dataSource = new MatTreeNestedDataSource<IMenuCom>();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', groupId: 0,
    departmentId: 0
  };
  listData: IMenuCom[];
  CheckLength: number;
  thongnguyen: string;
  public loading = false;
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
    private _commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
  }
  r1GetDataList() {
    this._apiService.r1_Post_List_Data(this.options, 'api/ModuleCongty/r1GetListDataNest')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          this.toastr.error('Dữ liệu công ty không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Lỗi khi tải dữ liệu Công ty, Vui lòng kiểm tra lại!', 'Thông báo');
          return;
        }
        this.listData = res['data'];
        this.dataSource.data = this.listData;
        this.treeControl.dataNodes = this.listData;
        this.treeControl.expandAll();
        this.options.total = res['total'];
      });
  }
  hasChild = (_: number, node: IMenuCom) => !!node.children && node.children.length > 0;
  r4DelData(datas) {
    this._apiService.r4DelListDataForcheckBox(datas, 'api/Company/r4DelSys_Dm_Company')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res['error'] === 3) {
          this.toastr.error('Xóa danh sách công ty không thành công! Vui lòng xóa sản phẩm của công ty trước.', 'Thông báo');
          return;
        }
        if (res['error'] === 2) {
          this.toastr.error(res['ms'], 'Thông báo');
          return;
        }
        if (res['error'] === 1) {
          this.toastr.error('Xóa danh sách công ty không thành công!', 'Thông báo');
          return;
        }
        this.toastr.success('Xóa danh sách công ty thành công!', 'Thông báo');
        this.r1GetDataList();
      });
  }
  r2_AddData(value: IMenuNestPara) {
    if (Number(this.options.departmentId) === 0 || this.options.departmentId === null) {
      this.toastr.warning('Bạn phải chọn phòng ban trước khi thực hiện phân quyền', 'Thông báo');
      return;
    }
    value.DepartmentId = this.options.departmentId;
    value.NestId = this.options.nestId;
    value.IsActive = !value.IsActive;
    this._apiService.r2_Add_Data_Model(value, 'api/ModuleCongty/r2AddDataModelNest')
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


  fileSelect(file) {
    console.log(file);
  }
  radiobtnSelect(value) {
    console.log(value);
  }

  selectDepartment(value) {
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.options.nestId = value;
    this.r1GetDataList();
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
