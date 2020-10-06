import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApifileService } from '../../../../shared/apifile.service';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { CVQTMyWork, CVQTFlowWork } from '../../../../models/giaoviec/congviecmoi.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { SelectLenhComponent } from '../../../../components/select-lenh/select-lenh.component';
import { TreeScheduleComponent } from '../../components/tree-schedule/tree-schedule.component';
import { UserLogin } from '../../../../common/option';
import { OptionsCV } from '../../../../models/giaoviec/optionscv.model';
import { SelectCommandComponent } from '../../components/select-command/select-command.component';
import { WorkdetailService } from '../../../../shared/workdetail.service';
import { SharedmyworksService } from '../../sharedmyworks/sharedmyworks.service';
import { SelectlenhsharedService } from '../../sharedmyworks/selectlenhshared.service';

@Component({
  selector: 'app-congvieccuatoi',
  templateUrl: './congvieccuatoi.component.html',
  styleUrls: ['./congvieccuatoi.component.css']
})
export class CongvieccuatoiComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  @ViewChild('treediagram', { static: false }) public treediagram: TreeDiagramComponent;
  @ViewChild('selectLenh', { static: false }) public selectLenh: SelectCommandComponent;
  @ViewChild('treeSchedule', { static: false }) public treeSchedule: TreeScheduleComponent;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  optionsCV: OptionsCV = { Id: '', MyWorkId: '', p: 0, pz: 100 };
  step = 0;
  pdfSrc: string;
  customSelected: any;
  WorkFlowId = '';
  MyWorkId = '';
  isShowPrecedor = false;
  timeTQ = new Date;
  model: CVQTMyWork = {
    Id: null,
    Code: 0,
    TaskId: null,
    TaskName: '',
    StartDate: new Date,
    PauseTime: 0.0,
    WorkTime: 0.0,
    EndDate: new Date,
    TimeStart: new Date,
    TimeEnd: new Date,
    UserTaskId: this.userlogin.Id,
    UserTaskName: this.userlogin.fullName,
    TypeTask: 1,
    PointTask: 0,
    PointTime: 0,
    DepartmentId: this.userlogin.departmentId,
    ExpectedDate: new Date
  };
  nameBtn = 'Bắt đầu';
  nextCycleWorks = 0;
  modelView: CVQTMyWork = new CVQTMyWork();
  listCongViecs: CVQTFlowWork[];
  listTypeFlows = [];
  filesView: [];
  listWorks = [];
  listHistory: [];
  listWorkFlows: [];
  vbattach: File = null;
  dcfile: File = null;
  url = '';
  keywordl = 'Name';
  typeTasks = [
    {
      Id: 1,
      Name: 'Công việc thường xuyên'
    },
    {
      Id: 2,
      Name: 'Công việc đột xuất'
    }
  ];

  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _apiFileService: ApifileService,
    private _workFlowDetail: WorkdetailService,
    public _sharedmyWork: SharedmyworksService,
    public _apiSharedService: SelectlenhsharedService,
  ) {
    this.model.TypeTask = 1;
  }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1ListUser();
    this.r1GetListMyWorks();
  }
  ngAfterViewInit(): void {
    this._apiSharedService.reloadListMyWorks$.subscribe(res => {
      if (res === true) {
        this.r1GetListMyWorks();
      }
    });
  }
  r1GetListMyWorks() {
    this._apiService.r1_Get_List_Data('api/MyWork/r1GetListMyWorks')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listCongViecs = res['data'];
        this.listTypeFlows = res['TypeFlows'];
        // tam thoi su dung 2 danh sách để thực hiện where trong html sau này sẽ chỉnh lại trong backend
      });
  }
ChangeDV(value) {
console.log(value);
}
  SelectIDEditModel(item: CVQTFlowWork) {
    const workFlow = {
      Id: item.Id,
      MyWorkId: item.MyWorkId
    };
    this._workFlowDetail.r1_GetDetailMyWork(workFlow);
    this.selectaRow(item.Id, item.MyWorkId);
    this.MyWorkId = item.MyWorkId;
    this.optionsCV.MyWorkId = item.MyWorkId;
    this.changeCycleWork(item.CycleWork, item.TypeComplete);
  }
  selectaRow(Id, MyWorkId) {
    const workFlow = {
      MyWorkId: MyWorkId,
      Id: Id
    };
    this.WorkFlowId = Id;
    this.selectLenh.showBtn(true, workFlow);
  }
  changeCycleWork(CycleCurrent, TypeComplete) {
    if (TypeComplete === 0 || TypeComplete === 2) { // bắt đầu công việc hoặc công việc bị trả lại
      switch (CycleCurrent) {
        case 0:
          this.url = 'api/MyWork/r2StartMyWork';
          this.nameBtn = 'Bắt đầu';
          this.nextCycleWorks = 1;
          break;
        case 1:
          this.url = 'api/MyWork/r2PauseMyWork';
          this.nameBtn = 'Tạm dừng';
          this.nextCycleWorks = 2;
          break;
        case 2:
          this.url = 'api/MyWork/r2ContineuMyWork';
          this.nameBtn = 'Tiếp tục';
          this.nextCycleWorks = 3;
          break;
        case 3:
          this.url = 'api/MyWork/r2PauseMyWork';
          this.nameBtn = 'Tạm dừng';
          this.nextCycleWorks = 2;
          break;
        default:
          this.url = '';
          this.nameBtn = '';
          this.nextCycleWorks = 0;
          return;
      }
    } else {
      this.url = '';
      this.nameBtn = '';
      this.nextCycleWorks = 0;
      return;
    }

  }
  ThayDoiTrangThai() {
    const model = {
      Id: this.MyWorkId
    };
    this._apiService.r1_List_Data_Model_General(model, this.url).subscribe(res => {
      if (res !== undefined) {
        if (res['error'] === 1) {
          this.toastr.error(res['ms'], 'Thông báo');
          return;
        }
        this.toastr.success(res['ms'], 'Thông báo');
        this.r1GetListMyWorks();
        this.changeCycleWork(this.nextCycleWorks, 0);
        return;
      }
    });
  }
  ChangePredecessor(event) {
    if (event !== null) {
      this.isShowPrecedor = true;
    } else {
      this.isShowPrecedor = false;
    }
  }
  r3_AddQTCongViecMoi() {
    this.model.Code = 0;
    const models = {
      CV_QT_MyWork: this.model,
      CV_QT_MySupportWorks: this.selectedItems
    };
    this.model.ExpectedDate = this._commonService.setTimeToDateAndChangeTimeZone(this.model.ExpectedDate, this.model.TimeStart);
    this.model.EndDate = this._commonService.setTimeToDateAndChangeTimeZone(this.model.EndDate, this.model.TimeEnd);
    this.model.PreWorkDeadline = this._commonService.setTimeToDateAndChangeTimeZone(this.model.PreWorkDeadline, this.timeTQ);
    if (this.model.Id === null) {

      this._apiFileService.r2_addFileModel(this.vbattach, models, 'api/MyWork/r2AddDataMywork')
        .subscribe(next => {
          if (next.type === HttpEventType.Response) {
            if (next === undefined) {
              this.toastr.error('Lỗi khi trình phê duyệt thời hạn hoàn thành!', 'Thông báo');
              return;
            }
            if (next['body']['error'] === 1) {
              this.toastr.error(next['body']['ms'], 'Thông báo');
              return;
            }
            this.toastr.success('Tạo công việc mới thành công!', 'Thông báo');
            this.hideModal();
            this.r1GetListMyWorks();
            return;
          }
        });
    } else {
      // this._apiFileService.r2_addFileModel(this.vbattach, this.model, '/api/Tco_Dm_UnitCode/r2updateObjUnitCode')
      //   .subscribe(next => {
      //     if (next.type === HttpEventType.Response) {
      //       this.toastr.success('Cập nhật văn bản thành công!', 'Thông báo');
      //       this.hideModal();
      //       this.r1GetListVanBan();
      //       return;
      //     }
      //   });
    }
  }

  r1ListUser() {
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
        this.dropdownList = res['data'];
        this.selectedItems = [
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'UserId',
          textField: 'FullName',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      });
  }
  r1GetListLinhVuc() {
    this._apiService.r1_Get_List_Data('api/MyWorkCommon/r1GetListWorks')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listWorks = res['data'];
      });
  }

  refreshList() {
    this.r1GetListMyWorks();
  }
  changeUrlpdf(pathDb) {
    this.pdfSrc = this._commonService.replaceUrlImage(pathDb);
  }
  onSelectFile(fileInput: any) {
    this.vbattach = fileInput;
  }

  hideModal() {
    this.modaldata.hide();
  }
  dateSelectbb(date) {
    this.model.PreWorkDeadline = date;
  }
  radioKichHoat(value) {
    this.model.PreWorkType = value;
  }
  dateSelectbd(value) {
    this.model.ExpectedDate = value;
  }
  dateSelectkt(value) {
    this.model.EndDate = value;
  }
  selectLMyWork(value) {
    this.model.TaskId = value.Id;
    this.model.TaskName = value.Name;
  }
  onChangeMyWork(value) {
    this.model.TaskName = value;
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  showModal() {
    this.modaldata.show();
  }
  RefreshData() {

  }
}
