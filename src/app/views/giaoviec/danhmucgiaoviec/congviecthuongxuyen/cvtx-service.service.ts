import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from '../../../../common/common.service';
import { OptionHeader, UserLogin } from '../../../../common/option';
import { ApiService } from '../../../../shared/api.service';
import { CongViecThuongXuyen } from '../models/congviecthuongxuyen.model';

@Injectable({
  providedIn: 'root'
})
export class CvtxServiceService {
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '',  groupId: 0,
    departmentId: 0, nestId: 0, rankrole: 0
  };
  CheckLength = 0;
  listData: CongViecThuongXuyen[] = [];
  listVois =
  [
   { Id: 0, Name: '----- Chọn độ vội -----' },
   { Id: 1, Name: 'Bình thường' },
   { Id: 2, Name: 'Vội' },
   { Id: 3, Name: 'Rất vội' },
 ];
 listKhos = [
   { Id: 0, Name: '----- Chọn độ khó -----' },
   { Id: 1, Name: 'Dễ' },
   { Id: 2, Name: 'Trung bình' },
   { Id: 3, Name: 'Khó' },
   { Id: 4, Name: 'Rất khó' },
 ];
  constructor(
    private _commonService: CommonService,
    private _apiService: ApiService,
    private _toarst: ToastrService
  ) { }
  userlogin: UserLogin = this._commonService.getValueUserLogin();
model: CongViecThuongXuyen = {
Id: '',
Code: '',
Name: '',
GroupTaskId: 0,
CreateDate: new Date,
LevelTask: 0,
LevelTime: 0,
PointTime: 0,
PointTask: 0,
DepartmentId: this.userlogin.departmentId ?? 0
};
r1getListCVtx() {
  this._apiService.r1_Post_List_Data(this.options, 'api/MyWorkCommon/r1getListWorkDefault').subscribe(res => {
    if (res['error'] === 1) {
    this._toarst.error(res['ms'], 'Thông báo');
      return;
    }
    this.listData = res['data'];
  });
}
r1_getDataById(Id) {
  this._apiService.r1_GetDataByID(Id, 'api/MyWorkCommon').subscribe(res => {
    if (res !== undefined) {
      if (res['error'] === 1) {
        return;
      }
      this.model = res['data'];
    }
  });
}
r2_AddDataService() {
  this._apiService.r2_Add_Data_Model(this.model, 'api/MyWorkCommon/r1PostAddWorkDefault').subscribe(res => {
    if (res['error'] === 1) {
    this._toarst.error(res['ms'], 'Thông báo');
      return;
    }
    this.r1getListCVtx();
  });
}
r3_UpdateDataService() {
  this._apiService.r3_Put_Data(this.model, 'api/MyWorkCommon').subscribe(res => {
    if (res['error'] === 1) {
    this._toarst.error(res['ms'], 'Thông báo');
      return;
    }
    this.r1getListCVtx();
  });
}
r4DelData(datas) {
  this._apiService.r4DelListDataForcheckBox(datas, 'api/MyWorkCommon/r4DelCV_DM_DefaultTask')
    .subscribe(res => {
      if (res['error'] === 2) {
        this._toarst.error(res['ms'], 'Thông báo');
        return;
      }
      if (res['error'] === 1) {
        this._toarst.error('Xóa danh sách dữ liệu không thành công!', 'Thông báo');
        return;
      }
      this.CheckLength = 0;
      this._toarst.success('Xóa danh sách dữ liệu thành công!', 'Thông báo');
      this.r1getListCVtx();
    });
}
}
