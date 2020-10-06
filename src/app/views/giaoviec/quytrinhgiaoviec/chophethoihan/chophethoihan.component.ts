import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { SelectCommandComponent } from '../../components/select-command/select-command.component';
import { TreeScheduleComponent } from '../../components/tree-schedule/tree-schedule.component';
import { UserLogin } from '../../../../common/option';
import { OptionsCV } from '../../../../models/giaoviec/optionscv.model';
import { CVQTMyWork, CVQTFlowWork } from '../../../../models/giaoviec/congviecmoi.model';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { CommonService } from '../../../../common/common.service';
import { ApifileService } from '../../../../shared/apifile.service';
import { HttpEventType } from '@angular/common/http';
import { WorkdetailService } from '../../../../shared/workdetail.service';
import { SelectlenhsharedService } from '../../sharedmyworks/selectlenhshared.service';

@Component({
  selector: 'app-chophethoihan',
  templateUrl: './chophethoihan.component.html',
  styleUrls: ['./chophethoihan.component.css']
})
export class ChophethoihanComponent implements OnInit, AfterViewInit {
  @ViewChild('selectLenh', { static: false }) public selectLenh: SelectCommandComponent;
  @ViewChild('treeSchedule', { static: false }) public treeSchedule: TreeScheduleComponent;
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  optionsCV: OptionsCV = {Id: '', MyWorkId: '', p: 0, pz: 100};
  step = 0;
  pdfSrc: string;
  WorkFlowId = '';
  MyWorkId = '';
  nameBtn = 'Bắt đầu';
  nextCycleWorks = 0;
  modelView: CVQTMyWork = new CVQTMyWork();
  listCongViecs: CVQTFlowWork[];
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
    private _apiSharedService: SelectlenhsharedService,
  ) {
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
    this._apiService.r1_Get_List_Data('api/MyWorkFlow/r1GetListWaitSignTime')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listCongViecs = res['data'];
      });
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

  r1ListUser() {
    const op = {
      'GroupRoleId': Number(this._commonService.getGroupUser()),
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/Common/r1GetListUserNhanViec')
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

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  RefreshData() {

  }
}
