import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { OptionHeader } from '../../../../common/option';
import { SearchService } from '../../../../shared/search.service';
import { SysDmCompany } from '../../../../models/systems/systemcategory/congty.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  options: OptionHeader = { s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '',  groupId: 0 };
  listData: SysDmCompany[];
  CheckLength: number;
  thongnguyen: string;
  public loading = false;
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _s: SearchService,
  ) { }

  ngOnInit(): void {
    this.thongnguyen = '12';
    this.r1GetDataList();
  }
  r1GetDataList() {
        this._apiService.r1_Post_List_Data(this.options, 'api/Company/r1GetListData')
          .subscribe(res => {
            if (res === undefined) {
              this.toastr.error('Dữ liệu công ty không tồn tại, Vui lòng kiểm tra lại!', 'Thông báo');
              return;
            }
            if (res['error'] === 1) {
              this.toastr.error('Lỗi khi tải dữ liệu Công ty, Vui lòng kiểm tra lại!', 'Thông báo');
              return;
            }
            this.listData = res['data'];
            this.options.total = res['total'];
          });
  }
  r4DelData(datas) {
    this._apiService.r4DelListDataForcheckBox(datas, 'api/Company/r4DelSys_Dm_Company')
    .subscribe(res => {
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
  r2_AddData() {
    alert(this.thongnguyen);
  }
  // checked
  toggleAll(rowto, checked) {
    this.CheckLength = 0;
    rowto.forEach(function (value, key) {
      rowto[key].checked = !checked;
    });
    const listvitrual = this.listData.filter(c => c.check === true);
    this.CheckLength = listvitrual.length;
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
  fileSelect(file) {
console.log(file);
  }
  radiobtnSelect(value) {
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
