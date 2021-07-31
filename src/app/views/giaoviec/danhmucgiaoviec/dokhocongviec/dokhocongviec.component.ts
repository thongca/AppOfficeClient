import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../common/common.service';
import { OptionHeader, UserLoginFromToken } from '../../../../common/option';
import { ApiService } from '../../../../shared/api.service';
import { DoKhoCongViec } from './dokhocongviec.model';

@Component({
  selector: 'app-dokhocongviec',
  templateUrl: './dokhocongviec.component.html',
  styleUrls: ['./dokhocongviec.component.css']
})
export class DokhocongviecComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', groupId: 0,
    departmentId: 0, nestId: 0
  };
  model: DoKhoCongViec = new DoKhoCongViec();
  modeltitle = '';
  listviews: DoKhoCongViec[] = [];
  constructor(
    private _commonService: CommonService,
    private _toarst: ToastrService,
    private api: ApiService
  ) { }
  userlogin: UserLoginFromToken = this._commonService.readDataTokenUser();
  ngOnInit(): void {
    this.r1_Get();
  }
  r1_Get(): void {
    this.api.r1_Post_List_Data(this.options, 'api/LevelTask/r1GetListData').subscribe(res => {
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
      this.api.r2_Add_Data_Model(this.model, 'api/LevelTask/r2_CreateData').subscribe(res => {
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
      this.api.r2_Add_Data_Model(this.model, 'api/LevelTask/r3_UpdateData').subscribe(res => {
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
    this.api.r4DelListDataForcheckBox(datas, 'api/LevelTask/r4_DeleteData')
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
    this.modeltitle = 'Sửa mức độ công việc';
    this.r1_getDataById(Id);
    this.modaldata.show();
  }
  r1_getDataById(Id) {
    this.api.r1_GetDataByID(Id, 'api/LevelTask/r1GetItemById').subscribe(res => {
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
    this.model = new DoKhoCongViec();
    this.modeltitle = 'Thêm mới mức độ công việc';
    this.modaldata.show();
  }
  RefreshData() {

  }
}
