import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { ExportExcelService } from '../../../../shared/export-excel.service';

@Component({
  selector: 'app-nhatkycongviec',
  templateUrl: './nhatkycongviec.component.html',
  styleUrls: ['./nhatkycongviec.component.css']
})
export class NhatkycongviecComponent implements OnInit {
  @ViewChild('TableBody', { static: false }) TableBody: ElementRef;
  totalErrorhead = 0;
  listError = [];
  listKpis = [];
  TotalPoint = 0;
  perUser: number = this._commonService.getUser().Permission;
  userId: number = 0;
  listUser: [];
  constructor(
    private _apiService: ApiService,
    private _exportService: ExportExcelService,
    private _commonService: CommonService
  ) { }
  ngOnInit(): void {
    this.r1GetDataError();
    this.r1GetReportKpi();
    this.r1GetDataUser();
  }
  r1GetDataError() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Get_List_Data('api/MyWorkCommon/r1GetListErrorCTG')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.totalErrorhead = res['total'];
        this.listError = res['data'];
      });
  }
  r1GetDataUser() {
    const op = {
      'GroupRoleId': Number(this._commonService.getGroupUser()),
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/Common/r1GetListDataUserForDepartment')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listUser = res['data'];
      });
  }
  ChangUser() {
    this.r1GetReportKpi();
  }
  r1GetReportKpi() {
    const op = {
      UserId: this.userId
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/MyWorkReport/r1ReportNoteWorks').subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        return;
      }
      this.listKpis = res['data'];
    });
  }
  ExportKpiClick() {
    this._exportService.exportExcel(this.TableBody.nativeElement,
      moment(new Date()).format('yyyy_MM_DD_HH_mm_ss') + '_NKCV', 2, this.userId);
  }
  RefreshData() {

  }
}
