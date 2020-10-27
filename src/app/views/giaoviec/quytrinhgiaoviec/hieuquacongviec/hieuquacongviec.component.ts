import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { map } from 'rxjs/internal/operators/map';
import { ParseError } from '@angular/compiler';
import { ExportExcelService } from '../../../../shared/export-excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-hieuquacongviec',
  templateUrl: './hieuquacongviec.component.html',
  styleUrls: ['./hieuquacongviec.component.css']
})
export class HieuquacongviecComponent implements OnInit {
  @ViewChild('TableBody', { static: false }) TableBody: ElementRef;
  totalErrorhead = 0;
listError = [];
listKpis = [];
TotalPoint = 0;
TotalKpi = 0;
  constructor(
    private _apiService: ApiService,
    private _exportService: ExportExcelService,
  ) { }

  ngOnInit(): void {
    this.r1GetDataError();
    this.r1GetReportKpi();
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
  r1GetReportKpi() {
    this._apiService.r1_Get_List_Data('api/MyWorkReport/r1EvalueKPIOneUser').pipe(
      map(preres => {
          this.TotalPoint =  preres['data'].reduce(((accumulator, currentValue) => {// toong diem lam viec cua mot cong viec
            currentValue.ChildrenError = JSON.parse(currentValue.ChildrenError);
            currentValue.TotalPointE = currentValue.ChildrenError.reduce(((acc, curr) => {// toong diem loi cua mot cong viec
              if ( Number(curr.Point) !== NaN) { // phải là số thì mới cộng dồn điểm lỗi
                acc +=  Number(curr.Point) * 0.5; // sum tong diem loi
              }
              return acc;
            }), 0);
            accumulator += currentValue.Point; // sum tong diem lam viec
            currentValue.KpiPoint = currentValue.TotalPointE * 0.5;
            return accumulator;
        }), 0);
        preres['data'].forEach(element => {
          element.PercentPoint = (element.Point * 100) / this.TotalPoint; // tính phần trăm lương
          element.KpiPoint = ((element.Point * 100) / this.TotalPoint) - element.TotalPointE; // tính phần trăm lương sau khi đã bị trừ lỗi
          this.TotalKpi += element.KpiPoint;
        });
        return preres;
      })
    ).subscribe(res => {
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
  this._exportService.exportExcel(this.TableBody.nativeElement, moment(new Date()).format('yyyy_MM_DD_HH_mm') + '_Kpi', 1);
  }
  RefreshData() {

  }
}
