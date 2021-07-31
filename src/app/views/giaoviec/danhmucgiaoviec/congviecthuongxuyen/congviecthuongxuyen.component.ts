import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../common/common.service';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { ApiService } from '../../../../shared/api.service';
import { SharedmyworksService } from '../../sharedmyworks/sharedmyworks.service';
import { CongViecThuongXuyen } from '../models/congviecthuongxuyen.model';
import { CvtxServiceService } from './cvtx-service.service';

@Component({
  selector: 'app-congviecthuongxuyen',
  templateUrl: './congviecthuongxuyen.component.html',
  styleUrls: ['./congviecthuongxuyen.component.css']
})
export class CongviecthuongxuyenComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', groupId: 0,
    departmentId: 0, nestId: 0
  };
  ctleveltasks = [];
  ctleveltimes = [];
  modeltitle = '';
  constructor(
    public cvtxservice: CvtxServiceService,
    private api: ApiService,
    private _toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.cvtxservice.r1getListCVtx();
    this.r1_GetTasks();
    this.r1_GetTime();
  }
  r1_GetTasks(): void {
    this.api.r1_Get_List_Data('api/Common/r1GetDataLevelTask').subscribe(res => {
      this.api.hidespinner();
      if (res['error'] !== 0) {
        this._toastr.error(res['ms'], 'Thông báo');
        return;
      }
      this.ctleveltasks = res['data'];
      if (this.ctleveltasks) {
        this.cvtxservice.model.LevelTaskId = this.ctleveltasks[0].Id;
      }
    });
  }
  r1_GetTime(): void {
    this.api.r1_Get_List_Data('api/Common/r1GetDataLevelTime').subscribe(res => {
      this.api.hidespinner();
      if (res['error'] !== 0) {
        this._toastr.error(res['ms'], 'Thông báo');
        return;
      }
      this.ctleveltimes = res['data'];
      if (this.ctleveltimes) {
        this.cvtxservice.model.LevelTimeId = this.ctleveltimes[0].Id;
      }
    });
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
    this.cvtxservice.model = new CongViecThuongXuyen();
    this.modeltitle = 'Thêm mới công việc thường xuyên';
    if (this.ctleveltimes) {
      this.cvtxservice.model.LevelTimeId = this.ctleveltimes[0].Id;
    }
    if (this.ctleveltasks) {
      this.cvtxservice.model.LevelTaskId = this.ctleveltasks[0].Id;
    }
    this.modaldata.show();
  }
  RefreshData() {

  }
}
