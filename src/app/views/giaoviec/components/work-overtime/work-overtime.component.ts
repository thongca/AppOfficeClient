import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { WorkdetailService } from '../../../../shared/workdetail.service';

@Component({
  selector: 'app-work-overtime',
  templateUrl: './work-overtime.component.html',
  styleUrls: ['./work-overtime.component.css']
})
export class WorkOvertimeComponent implements OnInit {
  listDateOverTime: WorkOverTime[] = [];
  perUser: number = this._commonService.getUser().Permission;
  constructor(
    private _workFlowDetail: WorkdetailService,
    private _commonService: CommonService,
    private _apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this._workFlowDetail.workovertime$
      .pipe(
        map(pre => {
          if (pre !== undefined) {
            return pre.filter(x => x.WorkTime >= 0.5);
          }
          return pre;
        })
      )
      .subscribe(data => {
        this.listDateOverTime = data;
      });
  }
  r2_DuyetOverTime(item: WorkOverTime) {
    item.State = 1;
    this._apiService.r2_Add_Data_Model(item, 'api/MyWork/r2duyetOverTime')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 0) {
          this.toastr.success('Duyệt thời hạn làm ngoài giờ thành công!', 'Thông báo');
          return;
        }
      });
  }
  r2_KhongDuyetOverTime(item: WorkOverTime) {
    item.State = 2;
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

export class WorkOverTime {
  DateOverTime: number;
  Handle?: boolean;
  MyWorkId: string;
  State: number;
  WorkTime: number;
  check?: boolean;
}
