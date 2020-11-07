import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { WorkdetailService } from '../../../../shared/workdetail.service';

@Component({
  selector: 'app-work-overtime',
  templateUrl: './work-overtime.component.html',
  styleUrls: ['./work-overtime.component.css']
})
export class WorkOvertimeComponent implements OnInit {
  listDateOverTime: [] = [];
  perUser: number = this._commonService.getUser().Permission;
  constructor(
    private _workFlowDetail: WorkdetailService,
    private _commonService: CommonService,
    private _apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this._workFlowDetail.workovertime$.subscribe(data => {
      this.listDateOverTime = data;
    });
  }
  r2_DuyetOverTime(item) {
    this._apiService.r2_Add_Data_Model(item, 'api/MyWork/r2duyetOverTime').subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 0) {
        this.toastr.success('Duyệt thời hạn làm ngoài giờ thành công!', 'Thông báo');
        return;
      }
    });
  }
  r2_KhongDuyetOverTime(item) {
    this._apiService.r2_Add_Data_Model(item, 'api/MyWork/r2KhongduyetOverTime').subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 0) {
        this.toastr.success('Duyệt thời hạn làm ngoài giờ thành công!', 'Thông báo');
        return;
      }
    });
  }
}
