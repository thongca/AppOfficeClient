import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../common/common.service';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { SharedmyworksService } from '../../sharedmyworks/sharedmyworks.service';
import { CvtxServiceService } from './cvtx-service.service';

@Component({
  selector: 'app-congviecthuongxuyen',
  templateUrl: './congviecthuongxuyen.component.html',
  styleUrls: ['./congviecthuongxuyen.component.css']
})
export class CongviecthuongxuyenComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 0, groupId: 0,
    departmentId: 0, nestId: 0
  };
  modeltitle = '';
  constructor(
    public cvtxservice: CvtxServiceService,
    private _commonService: CommonService
  ) { }
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  ngOnInit(): void {
    this.cvtxservice.r1getListCVtx();
  }
  r2_AddData() {
    if (this.cvtxservice.model.Id === '') {
      this.cvtxservice.r2_AddDataService();
    this.modaldata.hide();
    } else {
      this.cvtxservice.r3_UpdateDataService();
      this.modaldata.hide();
    }
  }
  r4DelData(datas) {
    this.cvtxservice.r4DelData(datas);
  }
  CheckAll(obj) {
    this.cvtxservice.CheckLength = obj.CheckLength;
    this.cvtxservice.listData = obj.listData;

  }
  CheckedList(checked, Id) {
    this.cvtxservice.listData.forEach(function (item) {
      if (Id === item.Id) {
        item.check = checked;
      }
    });
    if (checked === true) {
      this.cvtxservice.CheckLength = 1;
    } else if (this.cvtxservice.listData.filter(x => x.check === true).length === 0) {
      this.cvtxservice.CheckLength = 0;
    }
  }
  selectCompany(companyId) {
    this.options.companyId = companyId;
  }
  selectDepartment(value) {
    this.cvtxservice.model.DepartmentId = value;
    this.options.departmentId = value;
  }
  selectNest(value) {
    this.options.nestId = value;
  }
  SelectIDEditModel(Id) {
    this.modeltitle = 'Sửa công việc thường xuyên';
    this.cvtxservice.r1_getDataById(Id);
    this.modaldata.show();
  }
  showModal() {
    this.cvtxservice.model  = {
      Id: '',
      Code: '',
      Name: '',
      GroupTaskId: 0,
      CreateDate: new Date,
      LevelTask: 0,
      LevelTime: 0,
      PointTime: 0,
      PointTask: 0,
      DepartmentId: this.userlogin.departmentId
      };
    this.modeltitle = 'Thêm mới công việc thường xuyên';
    this.modaldata.show();
  }
}
