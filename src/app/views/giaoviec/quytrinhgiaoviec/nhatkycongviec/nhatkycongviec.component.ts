import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-nhatkycongviec',
  templateUrl: './nhatkycongviec.component.html',
  styleUrls: ['./nhatkycongviec.component.css']
})
export class NhatkycongviecComponent implements OnInit {
  totalErrorhead = 0;
  listError = [];
  listKpis = [];
  TotalPoint = 0;
  TotalKpi = 0;
    constructor(
      private _apiService: ApiService,
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
      this._apiService.r1_Get_List_Data('api/MyWorkReport/r1ReportNoteWorks').subscribe(res => {
          if (res === undefined) {
            return;
          }
          if (res['error'] === 1) {
            return;
          }
          this.listKpis = res['data'];
        });
    }
    RefreshData() {

    }
}
