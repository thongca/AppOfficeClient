import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from '../../../../common/common.service';
import { ReportDate } from '../../../../models/giaoviec/reportdate.model';
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
  report: ReportDate = new ReportDate();
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
    this._apiService.r1_Get_List_Data('api/MyWorkCommon/r1GetListErrorCTG')
      .subscribe(res => {
        this._apiService.hidespinner();
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
      'GroupRoleId': Number(this._commonService.readDataTokenGroupRoleId()),
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/Common/r1GetListDataUserForDepartment')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listUser = res['data'];
      });
  }
  // ChangUser() {
  //   this.r1GetReportKpi();
  // }
  r1GetReportKpi() {
    this._apiService.r1_List_Data_Model_General(this.report, 'api/MyWorkReport/r1ReportNoteWorks').subscribe(res => {
      this._apiService.hidespinner();
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        return;
      }
      this.listKpis = res['data'];
    });
  }
  fromDateClick(date: Date) {
    this.report.dates = this._commonService.FromDateToDouble(date);
  }
  toDateClick(date) {
    this.report.datee = this._commonService.FromDateToDouble(date);
  }
  ExportKpiClick() {
    this._exportService.exportExcel(this.TableBody.nativeElement,
      moment(new Date()).format('yyyy_MM_DD_HH_mm_ss') + '_NKCV', 2, this.report.UserId, this.report);
  }
  RefreshData() {

  }
}
