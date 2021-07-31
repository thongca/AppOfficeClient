import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/internal/operators/map';
import { CommonService } from '../../../../common/common.service';
import { ReportDate } from '../../../../models/giaoviec/reportdate.model';
import { ApiService } from '../../../../shared/api.service';
import { ExportExcelService } from '../../../../shared/export-excel.service';
@Component({
  selector: 'app-tonghopthoigian',
  templateUrl: './tonghopthoigian.component.html',
  styleUrls: ['./tonghopthoigian.component.css']
})
export class TonghopthoigianComponent implements OnInit {
  @ViewChild('tablereport', { static: false }) tablereport: ElementRef;
  totalErrorhead = 0;
  listError = [];
  listKpis = [];
  TotalPoint = 0;
  listTotalTime: [];
  userId: number = 0;
  report: ReportDate = new ReportDate();
  constructor(
    private _exportService: ExportExcelService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private toarts: ToastrService
  ) { }
  ngOnInit(): void {
    this.report.TotalHourLk = 0;
    this.report.TotalHour = 0;
    this.r1GetDataError();
    this.r1GetReportKpi();
  }
  r1GetDataError() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
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
  r1GetReportKpi() {
    this.report.TotalHourLk = 0;
    this.report.TotalHour = 0;
    this._apiService.r1_List_Data_Model_General(this.report, 'api/MyWorkReport/r1EvalueReportTotalTime')
      .pipe(
        map(pre => {
          pre['data'].reduce((acc, cur) => {
            this.report.TotalHourLk += cur.TongLk;
            this.report.TotalHour += cur.Tong;
            return acc;
          });
          return pre;
        })
      )
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.toarts.success('Tải báo cáo thành công!', 'Thông báo');
        this.listTotalTime = res['data'];
      });
  }
  fromDateClick(date: Date) {
    this.report.dates = this._commonService.FromDateToDouble(date);
  }
  toDateClick(date) {
    this.report.datee = this._commonService.FromDateToDouble(date);
  }
  RefreshData() {

  }
  ExportTotalClick() {
    const date = new Date();
    const model = {
      dates: new Date(date.setDate(1)),
      datee: new Date()
    };
    this._exportService.exportExcel(this.tablereport.nativeElement,
      moment(new Date()).format('yyyy_MM_DD_HH_mm_ss') + '_SumTime', 3, this.report.UserId, this.report);
  }
}

