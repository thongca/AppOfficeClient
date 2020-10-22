import { CommonService } from './../../../../common/common.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CVQTMyWork } from '../../../../models/giaoviec/congviecmoi.model';
import { WorkdetailService } from '../../../../shared/workdetail.service';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { HistoryWorkFlow } from '../../../../models/giaoviec/congvieccuatoi.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from '../../../../common/option';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.css']
})
export class WorkflowDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('treediagram', { static: false }) public treediagram: TreeDiagramComponent;
  @ViewChild('modalAddCV', { static: false }) public modalAddCV: ModalDirective;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  modelSchedule: KeHoachCV = {
    Id: 0,
    TaskName: '',
    StartDate: new Date,
    EndDate: new Date,
    TimeStart: new Date,
    TimeEnd: new Date,
    UserDeliverId: null,
    StatusWork: 0,
    MyWorkId: '',
    Predecessor: 0,
  };
  modelView: CVQTMyWork = new CVQTMyWork();
  modelPre: CVQTMyWork = new CVQTMyWork();
  filesView: [];
  listWorks = [];
  listSupporters = [];
  listHistory: HistoryWorkFlow[] = [];
  listWorkFlows: [];
  listWorkFlowPres = [];
  listErrors: [];
  pdfSrc: string = '';
  step = 0;
  stepschedule = 0;
  constructor(
    private _workFlowDetail: WorkdetailService,
    private _commonService: CommonService,
    private _apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._workFlowDetail.infoWorkFlow$.subscribe(data => {
      this.modelView = data;
    });
    this._workFlowDetail.predecWork$.subscribe(data => {
      this.modelPre = data;
    });
    this._workFlowDetail.listsupporter$.subscribe(data => {
      this.listSupporters = data;
    });
    this._workFlowDetail.historyWorkFlow$.subscribe(data => {
      this.listHistory = data;
    });
    this._workFlowDetail.myworkFlow$.subscribe(data => {
      this.listWorkFlows = data;
      this.treediagram.getStartWorkFlow(this.listWorkFlows);
    });
    this._workFlowDetail.myworkFlowPre$.subscribe(data => {
      this.listWorkFlowPres = data;
    });
    this._workFlowDetail.fileWorkFlow$.subscribe(data => {
      if (data[0] !== null) {
        this.pdfSrc = this._commonService.replaceUrlImage(data[0].Path);
      }
    });
    this._workFlowDetail.errorForMyWorks$.subscribe(data => {
      this.listErrors = data;
    });
  }
  r2AddScheduleWork() {
    this.modelSchedule.StartDate =
    this._commonService.setTimeToDateAndChangeTimeZone(this.modelSchedule.StartDate, this.modelSchedule.TimeStart);
    this.modelSchedule.EndDate = this._commonService.setTimeToDateAndChangeTimeZone(this.modelSchedule.EndDate, this.modelSchedule.TimeEnd);
    if (this.modelSchedule.UserDeliverId == null) {
      this.modelSchedule.UserDeliverId = this.userlogin.Id;
    }
      this._apiService.r2_Add_Data_Model(this.modelSchedule, 'api/MyWork/r2AddScheduleMyWork')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
         this.toastr.error(res['ms'], 'Thông báo');
         return;
        }
          // tải lại danh sách kế hoạch công việc
        const workFlow = {
          Id: '12',
          MyWorkId: res['data']
        };
        this.modalAddCV.hide();
        this._workFlowDetail.r1_ChangeScheduleWork(workFlow);
          // tải lại danh sách kế hoạch công việc
      this.toastr.success('Thêm mới kế hoạch thành công!', 'Thông báo');
        return;
      });
  }
  showModal(value) {
    this.modelSchedule.MyWorkId = value.MyWorkId;
    this.modelSchedule.Predecessor = value.Id;
    this.modalAddCV.show();
  }
  dateSelectbd(value) {
    this.modelSchedule.StartDate = value;
  }
  dateSelectkt(value) {
    this.modelSchedule.EndDate = value;
  }
  setStep(index: number) {
    this.step = index;
  }
  setStepSche(index: number) {
    this.stepschedule = index;
  }
  nextStep() {
    this.step++;
  }
  nextStepSchedule() {
    this.stepschedule++;
  }

  prevStep() {
    this.step--;
  }
  prevStepSchedule() {
    this.stepschedule--;
  }
}
export class KeHoachCV {
  Id: number;
  TaskName: String;
  UserDeliverId: number;
  StartDate: Date;
  TimeStart: Date;
  TimeEnd: Date;
  EndDate: Date;
  WorkTime?: number;
  Predecessor: number;
  MyWorkId: String;
  StatusWork: number;

}
