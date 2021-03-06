import { Injectable } from '@angular/core';
import { BaseUrlService } from '../common/base-url.service';
import { forkJoin, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { HistoryWorkFlow } from '../models/giaoviec/congvieccuatoi.model';
import { CVQTMyWork } from '../models/giaoviec/congviecmoi.model';
import { WorkOverTime } from '../views/giaoviec/components/work-overtime/work-overtime.component';

@Injectable({
  providedIn: 'root'
})
export class WorkdetailService {
  private historyWorkFlow = new Subject<HistoryWorkFlow[]>();
  public historyWorkFlow$ = this.historyWorkFlow.asObservable();
  private infoWorkFlow = new Subject<CVQTMyWork>();
  public infoWorkFlow$ = this.infoWorkFlow.asObservable();
  private predecWork = new Subject<CVQTMyWork>();
  public predecWork$ = this.predecWork.asObservable();
  private myworkFlow = new Subject<any>();
  public myworkFlow$ = this.myworkFlow.asObservable();
  private myworkFlowPre = new Subject<any>();
  public myworkFlowPre$ = this.myworkFlowPre.asObservable();
  private fileWorkFlow = new Subject<any>();
  public fileWorkFlow$ = this.fileWorkFlow.asObservable();
  private errorForMyWorks = new Subject<any>();
  public errorForMyWorks$ = this.errorForMyWorks.asObservable();
  private listsupporter = new Subject<any>();
  public listsupporter$ = this.listsupporter.asObservable();
  private workovertime = new Subject<WorkOverTime[]>();
  public workovertime$ = this.workovertime.asObservable();

  private listSchedule = new Subject<any>();
  public listSchedule$ = this.listSchedule.asObservable();

  private typeFlowDuyets = new Subject<any>();
  public typeFlowDuyets$ = this.typeFlowDuyets.asObservable();
  constructor(
    private _apiService: ApiService,
  ) {
  }
     // GET: lấy thông tin danh sách dữ liệu
     r1_GetDetailMyWork(workFlow) {
     const myWorkDetail = this._apiService.r1_List_Data_Model_General(workFlow, 'api/MyWork/r1GetMyWorkById');
     const scheduleList = this._apiService.r1_List_Data_Model_General(workFlow, 'api/MyWork/r1PostMyScheduleWork');
     const typeFlows = this._apiService.r1_List_Data_Model_General(workFlow, 'api/MyWork/r1GetStateSignOfMyWork');
     forkJoin([myWorkDetail, scheduleList, typeFlows])
      .subscribe(
        res => {
          this.historyWorkFlow.next(res[0]['history']);
          this.infoWorkFlow.next(res[0]['data']);
          this.predecWork.next(res[0]['predecWork']);
          this.myworkFlow.next(res[0]['workFlows']);
          this.myworkFlowPre.next(res[0]['workFlowPres']);
          this.fileWorkFlow.next(res[0]['files']);
          this.errorForMyWorks.next(res[0]['errors']);
          this.listsupporter.next(res[0]['supports']);
          this.workovertime.next(res[0]['workOvertime']);
          this.listSchedule.next(res[1]['listRecursives']);
          this.typeFlowDuyets.next(res[2]['data']);
        },
      );
     }
     r1_ChangeScheduleWork(workFlow) {
     this._apiService.r1_List_Data_Model_General(workFlow, 'api/MyWork/r1PostMyScheduleWork').subscribe(
         res => {
           this.listSchedule.next(res['listRecursives']);
         },
       );
      }
}
