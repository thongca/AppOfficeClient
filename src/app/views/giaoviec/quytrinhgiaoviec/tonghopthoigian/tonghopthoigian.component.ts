import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-tonghopthoigian',
  templateUrl: './tonghopthoigian.component.html',
  styleUrls: ['./tonghopthoigian.component.css']
})
export class TonghopthoigianComponent implements OnInit {
  totalErrorhead = 0;
  listError = [];
  listKpis = [];
  TotalPoint = 0;
  listTotalTime: [];
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
      const date = new Date();
      const model = {
        dates: new Date(date.setDate(1)),
        datee: new Date()
      };
      this._apiService.r1_List_Data_Model_General(model, 'api/MyWorkReport/r1EvalueReportTotalTime').subscribe(res => {
          if (res === undefined) {
            return;
          }
          if (res['error'] === 1) {
            return;
          }
          this.listTotalTime = res['data'];
        });
    }
}
