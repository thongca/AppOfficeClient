import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OptionHeader } from '../../../../common/option';
import { ApiService } from '../../../../shared/api.service';
import { Department } from './department.model';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', groupId: 0,
    departmentId: 0, nestId: 0
  };
  model: Department = new Department();
  modeltitle = '';
  listviews: Department[] = [];
  constructor(
    private _toarst: ToastrService,
    private api: ApiService
  ) { }
  ngOnInit(): void {
    this.r1_Get();
  }
  r1_Get(): void {
    this.api.r1_Post_List_Data(this.options, 'api/Department/r1GetListData').subscribe(res => {
      this.api.hidespinner();
      if (res['error'] !== 0) {
        this._toarst.error(res['ms'], 'Thông báo');
        return;
      }
      this.listviews = res['data'];
    });
  }
  r2_AddData() {
    if (!this.model.Id) {
      this.api.r2_Add_Data_Model(this.model, 'api/Department/r2_CreateData').subscribe(res => {
this.api.hidespinner();
        if (res['error'] !== 0) {
          this._toarst.error(res['ms'], 'Thông báo');
          return;
        }
        this._toarst.success(res['ms'], 'Thông báo');
        this.r1_Get();
        this.modaldata.hide();
      });
    } else {
      this.api.r2_Add_Data_Model(this.model, 'api/Department/r3_UpdateData').subscribe(res => {
this.api.hidespinner();
        if (res['error'] !== 0) {
          this._toarst.error(res['ms'], 'Thông báo');
          return;
        }
        this.r1_Get();
        this._toarst.success(res['ms'], 'Thông báo');
        this.modaldata.hide();
      });
    }
  }
  r4DelData(datas) {
    this.api.r4DelListDataForcheckBox(datas, 'api/Department/r4_DeleteData')
      .subscribe(res => {
this.api.hidespinner();
        if (res['error'] !== 0) {
          this._toarst.error(res['ms'], 'Thông báo');
          return;
        }
        this.options.checkLength = 0;
        this.r1_Get();
        this._toarst.success(res['ms'], 'Thông báo');
      });
  }
  CheckAll(obj) {
    this.options.checkLength = obj.CheckLength;
    this.listviews = obj.listData;

  }
  CheckedList(checked, Id) {
    this.listviews.forEach(function (item) {
      if (Id === item.Id) {
        item.check = checked;
      }
    });
    if (checked === true) {
      this.options.checkLength = 1;
    } else if (this.listviews.filter(x => x.check === true).length === 0) {
      this.options.checkLength = 0;
    }
  }

  SelectIDEditModel(Id) {
    this.modeltitle = 'Sửa phòng ban';
    this.r1_getDataById(Id);
    this.modaldata.show();
  }
  r1_getDataById(Id) {
    this.api.r1_GetDataByID(Id, 'api/Department/r1GetItemById').subscribe(res => {
this.api.hidespinner();
      if (res !== undefined) {
        if (res['error'] !== 0) {
          return;
        }
        this.model = res['data'];
        this.modaldata.show();
      }
    });
  }
  showModal() {
    this.model = new Department();
    this.modeltitle = 'Thêm mới phòng ban';
    this.modaldata.show();
  }
  RefreshData() {

  }
}
