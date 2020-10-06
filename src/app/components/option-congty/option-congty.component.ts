import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ICompany } from '../../models/systems/systemmanagement/company.model';
import { CommonService } from '../../common/common.service';
import { ApiService } from '../../shared/api.service';
import { OptionHeader } from '../../common/option';
import { IDepartment } from '../../models/systems/systemmanagement/iDepartment.model';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-option-congty',
  templateUrl: './option-congty.component.html',
  styleUrls: ['./option-congty.component.css']
})
export class OptionCongtyComponent implements OnInit {
  @Input() isShowDepartment: string;
  @Input() isShowNest: string;
  @Output() changeCongtys = new EventEmitter();
  @Output() changeDepartments = new EventEmitter();
  @Output() changeNests = new EventEmitter();
  options: OptionHeader = {
    s: '', p: 1, pz: 100, totalpage: 0, total: 1000, paxpz: 0, mathP: 0, userName: '', companyId: 3, groupId: 0,
    departmentId: 0, nestId: 0
  };
  listCompanys: ICompany[] = [];
  listPhongBans: IDepartment[] = [];
  listNests: IDepartment[] = [];
  permission: number;

  constructor(
    private _apiService: ApiService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.permission = this._commonService.getPermissionUser();
    if (this.permission === 0) {
      this.listCompanys = this._commonService.getCongtys();
      if (this.listCompanys.length > 0) {
        this.options.companyId = this._commonService.getDefaultCompanyId();
        this.changeCongtys.emit(this.listCompanys[0].Id);
      }
    } else {
      this.listCompanys = [];
      this.options.companyId = Number(this._commonService.getCompanyUser());
    }
    this.r1GetDepartment();
  }
  r1GetDepartment() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
      if (this.isShowDepartment === '1' && this.permission <= 1) {
        this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataCommonDep')
          .subscribe(res => {
            if (res === undefined) {
              return;
            }
            if (res['error'] === 1) {
              return;
            }
            this.listPhongBans = res['data'];
            if (this.listPhongBans.length > 0) {
              this.changeDepartments.emit(this.listPhongBans[0].Id);
              this.options.departmentId = this.listPhongBans[0].Id;
            } else {
              this.changeDepartments.emit(0);
            }
            this.r1GetDataNest();
          });
      } else {
        this.changeDepartments.emit(this._commonService.getDepartmentUser());
        this.options.departmentId = this._commonService.getDepartmentUser();
        this.r1GetDataNest();
      }

  }
  // r1GetDepartment() {
  //   // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
  //     if (this.isShowDepartment === '1' && this.permission <= 1) {
  //       this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataCommonDep').pipe(
  //         mergeMap((character) => this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataNest').subscribe)
  //       ).subscribe();
  //     } else {
  //       this.changeDepartments.emit(this._commonService.getDepartmentUser());
  //       this.options.departmentId = this._commonService.getDepartmentUser();
  //       this.r1GetDataNest();
  //     }

  // }
 r1GetDataNest() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
      if (this.isShowDepartment === '1' && this.isShowNest === '1' && this.permission <= 2) {
        this._apiService.r1_Post_List_Data(this.options, 'api/Common/r1GetListDataNest')
          .subscribe(res => {
            if (res === undefined) {
              return;
            }
            if (res['error'] === 1) {
              return;
            }
            this.listNests = res['data'];
            if (this.listNests.length > 0) {
              this.changeNests.emit(this.listNests[0].Id);
              this.options.nestId = this.listNests[0].Id;
            } else {
              this.changeNests.emit(0);
            }
          });
      } else {
        this.changeNests.emit(this._commonService.getDepartmentUser());
      }
  }
  ChangeCongty(value) {
    this.changeCongtys.emit(Number(value));
    this.options.companyId = Number(value);
    this.r1GetDepartment();
  }
  ChangeDepartment(value) {
    this.changeDepartments.emit(Number(value));
    this.options.departmentId = Number(value);
    this.r1GetDataNest();
  }
  ChangeNest(value) {
    this.changeNests.emit(Number(value));
    this.options.nestId = Number(value);
  }
}
