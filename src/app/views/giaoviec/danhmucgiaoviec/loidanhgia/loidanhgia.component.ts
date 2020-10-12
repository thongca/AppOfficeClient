import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../common/common.service';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { DanhgiadmServiceService } from './danhgiadm-service.service';

@Component({
  selector: 'app-loidanhgia',
  templateUrl: './loidanhgia.component.html',
  styleUrls: ['./loidanhgia.component.css']
})
export class LoidanhgiaComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0
  };
  modeltitle = '';
  constructor(
    public dmdgservice: DanhgiadmServiceService,
    private _commonService: CommonService
  ) { }
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  ngOnInit(): void {
    this.dmdgservice.r1getListCVtx();
  }
  r2_AddData() {
    if (this.dmdgservice.model.Id === 0) {
      this.dmdgservice.r2_AddDataService();
      this.modaldata.hide();
    } else {
      this.dmdgservice.r3_UpdateDataService();
      this.modaldata.hide();
    }
  }
  r4DelData(datas) {
    this.dmdgservice.r4DelData(datas);
  }
  CheckAll(obj) {
    this.dmdgservice.CheckLength = obj.CheckLength;
    this.dmdgservice.listData = obj.listData;

  }
  CheckedList(checked, Id) {
    this.dmdgservice.listData.forEach(function (item) {
      if (Id === item.Id) {
        item.check = checked;
      }
    });
    if (checked === true) {
      this.dmdgservice.CheckLength = 1;
    } else if (this.dmdgservice.listData.filter(x => x.check === true).length === 0) {
      this.dmdgservice.CheckLength = 0;
    }
  }
  selectCompany(companyId) {
    this.options.companyId = companyId;
  }
  selectDepartment(value) {
    this.dmdgservice.model.DepartmentId = value;
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.options.nestId = value;
  }
  SelectIDEditModel(Id) {
    this.modeltitle = 'Sửa công việc thường xuyên';
    this.dmdgservice.r1_getDataById(Id);
    this.modaldata.show();
  }
  RefreshData() {

  }
  showModal() {
    this.dmdgservice.model = {
      Id: 0,
      Point: 0,
      ErrorName: '',
      DepartmentId: this.userlogin.departmentId ?? 0
    };
    this.modeltitle = 'Thêm mới công việc thường xuyên';
    this.modaldata.show();
  }
}
