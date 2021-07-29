import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApifileService } from '../../../../shared/apifile.service';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { CVQTMyWork, CVQTFlowWork } from '../../../../models/giaoviec/congviecmoi.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { TreeScheduleComponent } from '../../components/tree-schedule/tree-schedule.component';
import { UserLogin, UserLoginFromToken } from '../../../../common/option';
import { OptionsCV } from '../../../../models/giaoviec/optionscv.model';
import { SelectCommandComponent } from '../../components/select-command/select-command.component';
import { WorkdetailService } from '../../../../shared/workdetail.service';
import { SharedmyworksService } from '../../sharedmyworks/sharedmyworks.service';
import { SelectlenhsharedService } from '../../sharedmyworks/selectlenhshared.service';
import { SearchService } from '../../../../shared/search.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserTask } from '../../../../models/giaoviec/congvieccuatoi.model';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

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
  userlogin: UserLoginFromToken = this._commonService.readDataTokenUser();
  optionsCV: OptionsCV = { Id: '', MyWorkId: '', p: 1, pz: 100, totalItem: 100, startPage: 0, endPage: 100 };
  step = 0;
  pdfSrc: string;
  customSelected: any;
  WorkFlowId = '';
  MyWorkId = '';
  isShowPrecedor = false;
  Predecessor: number; // mã code của công việc tiên quyết
  timeTQ = new Date;
  ctassignusers: UserTask[] = [];
  model: CVQTMyWork = new CVQTMyWork();
  nameBtn = 'Bắt đầu';
  nextCycleWorks = 0;
  modelView: CVQTMyWork = new CVQTMyWork();
  listTotals: CVQTFlowWork[];
  listCongViecs: CVQTFlowWork[];
  listTypeFlows = [];
  listDepartments = [];
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
  typeUserTasks = [
    {
      Id: 1,
      Name: 'Chủ trì'
    },
    {
      Id: 2,
      Name: 'Phối hợp'
    }
  ];
  selectedItems = [];
  selectedItemPHs = [];
  dropdownList = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'UserId',
    textField: 'FullName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  /** Phòng ban select setting */
  dropdownSettingPHs = {
    singleSelection: false,
    idField: 'DepartmentId',
    textField: 'DepartmentName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _apiFileService: ApifileService,
    private _workFlowDetail: WorkdetailService,
    public _sharedmyWork: SharedmyworksService,
    public _apiSharedService: SelectlenhsharedService,
    private _searchService: SearchService
  ) {
    this.model.TypeTask = 1;
  }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1ListUser();
    this.r1GetListMyWorks();
    this.r1GetDepartment();
    this.r1GetDataUser();
  }
  ngAfterViewInit(): void {
    this._apiSharedService.reloadListMyWorks$.subscribe(res => {
      if (res === true) {
        this.r1GetListMyWorks();
      }
    });
    this._searchService.DataSearch$.subscribe(res => {
      this.searchData(res);
    });
  }
  r1GetListMyWorks() {
    this._apiService.r1_Get_List_Data('api/MyWork/r1GetListMyWorks')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['data'] !== undefined) {
          this.listTotals = res['data'];
          this.listCongViecs = res['data'].slice(this.optionsCV.startPage, this.optionsCV.endPage);
          this.listTypeFlows = res['TypeFlows'];
          this.optionsCV.totalItem = res['total'];
        }
        // tam thoi su dung 2 danh sách để thực hiện where trong html sau này sẽ chỉnh lại trong backend
      });
  }
  r1GetDataUser() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Get_List_Data('api/Common/r1GetListUserByGroup')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.ctassignusers = res['data'];
      });
  }
  r1GetDepartment() {
    this._apiService.r1_Get_List_Data('api/Common/r1GetListDataDepforUser')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['data'] !== undefined) {
          this.listDepartments = res['data'];
        }
      });
  }
  ChangeDV(value) {
  }
  SelectIDEditModel(item: CVQTFlowWork) {
    const workFlow = {
      Id: item.Id,
      MyWorkId: item.MyWorkId
    };
    this._workFlowDetail.r1_GetDetailMyWork(workFlow);
    // ma cong viec khi chon 1 cong viec
    this.MyWorkId = item.MyWorkId;
    this.WorkFlowId = item.Id;
    this.optionsCV.MyWorkId = item.MyWorkId;
    this.Predecessor = item.Predecessor; // mã code của công việc tiên quyết
    this.changeCycleWork(item.CycleWork, item.TypeComplete); // thay đổi trạng thái nút bắt đầu, tiếp tuc, ...
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
      Id: this.MyWorkId,
      Predecessor: this.Predecessor // khi công việc tiên quyết chưa hoàn thành thì không được bắt đầu công việc sau
    };
    this._apiService.r1_List_Data_Model_General(model, this.url).subscribe(res => {
      if (res !== undefined) {
        if (res['error'] === 1) {
          this.toastr.error(res['ms'], 'Thông báo');
          return;
        }
        this.r1GetListMyWorks();
        if (res['error'] === 2) {
          this.toastr.error(res['ms'], 'Thông báo');
          this.changeCycleWork(2, 0);
          return;
        } else {
          this.toastr.success(res['ms'], 'Thông báo');
          this.changeCycleWork(this.nextCycleWorks, 0);
        }
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
      CV_QT_MySupportWorks: this.selectedItems,
      CV_QT_DepartmentSupporter: this.selectedItemPHs, /** Có thể xóa */
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
  onBlur(event: TypeaheadMatch) {
    console.log(event);
  }
  onSelect_AssignUser(event: TypeaheadMatch): void {
    if (event && event.item) {
      const user: UserTask = event.item;
      this.model.UserTaskId = user.Id;
      this.model.UserTaskName = user.FullName;
    }
    console.log(event);
  }
  r1ListUser() {
    const op = {
      'GroupRoleId': Number(this._commonService.readDataTokenGroupRoleId()),
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
  searchData(data: string) {
    this.listCongViecs = this.listTotals.filter(x => x.TaskName.toUpperCase().includes(data.toUpperCase())
      || x.Code.toString().includes(data)
    );
  }
  pageChanged(event: PageChangedEvent) {
    this.optionsCV.startPage = (event.page - 1) * event.itemsPerPage;
    this.optionsCV.endPage = event.page * event.itemsPerPage;
    this.listCongViecs = this.listTotals.slice(this.optionsCV.startPage, this.optionsCV.endPage);
  }
  showModal() {
    this.modaldata.show();
    this.selectedItemPHs = [];
    this.selectedItems = [];
    this.model = new CVQTMyWork();
    this.onSet_initDataModal(this.model);
  }
  onSet_initDataModal(model: CVQTMyWork): void {
    model.UserTaskId = this.userlogin.UserID;
    model.UserTaskName = this.userlogin.FullName;
    model.DepartmentId = this.userlogin.DepartmentId;
  }
  RefreshData() {

  }
}
