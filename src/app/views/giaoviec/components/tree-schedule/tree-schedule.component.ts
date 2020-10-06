import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeSchedule } from '../../../../models/giaoviec/congviecmoi.model';
import { ApiService } from '../../../../shared/api.service';
import { CommonService } from '../../../../common/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserLogin } from '../../../../common/option';
import { WorkdetailService } from '../../../../shared/workdetail.service';
@Component({
  selector: 'app-tree-schedule',
  templateUrl: './tree-schedule.component.html',
  styleUrls: ['./tree-schedule.component.css']
})
export class TreeScheduleComponent implements OnInit, AfterViewInit {

  @Input() MenuId: string;
  @Output() outshowModal = new EventEmitter();
  treeControl = new NestedTreeControl<TreeSchedule>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeSchedule>();
  listTTs: TrangThaiCv[] = [{
    Id: 1,
    Name: 'Chưa thực hiện',
  },
  {
    Id: 2,
    Name: 'Đang thực hiện',
  },
  {
    Id: 3,
    Name: 'Đã thực hiện',
  }];
  list: TreeSchedule[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  listNhoms = [];
  keyword = 'Name';
  userlogin: UserLogin = this._commonService.getValueUserLogin();
  constructor(
    private toarst: ToastrService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _workdetailService: WorkdetailService
  ) { }

  ngOnInit(): void {
    this.r1ListUser();
  }
  ngAfterViewInit(): void {
    this._workdetailService.listSchedule$.subscribe(res => {
     this.list = res;
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
        idField: 'Id',
        textField: 'FullName',
        selectAllText: 'Chọn tất cả',
        unSelectAllText: 'Bỏ chọn tất cả',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    });
  }
  r4RemoveSchedule(Id, MyWorkId) {
    const model = {
      Id: Id
    };
    this._apiService.r4DelListDataForcheckBox(model, 'api/MyWork/r4RemoveScheduleMyWork')
    .subscribe(res => {
      if (res === undefined) {
        this.toarst.error('Lỗi khi xóa kế hoạch công việc!', 'Thông báo');
        return;
      }
      if (res['error'] === 1) {
        this.toarst.error(res['ms'], 'Thông báo');
        return;
      }
        // tải lại danh sách kế hoạch công việc
      const workFlow = {
        Id: '12',
        MyWorkId: MyWorkId
      };
      this._workdetailService.r1_ChangeScheduleWork(workFlow);
        // tải lại danh sách kế hoạch công việc
      this.toarst.success(res['ms'], 'Thông báo');
      return;
    });
  }
  hasChild = (_: string, node: TreeSchedule) => !!node.children && node.children.length > 0;

  showModal(value) {
    this.outshowModal.emit(value);
  }
  ChangeTrangThai(item: TreeSchedule) {
    if (!isNaN(item.StatusWork)) {
      item.StatusWork = Number(item.StatusWork);
    }
    this._apiService.r1_List_Data_Model_General(item, 'api/MyWork/r2TrangThaiScheduleMyWork')
    .subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        this.toarst.error('Cập nhật trạng thái công việc không thành công!', 'Thông báo');
      return;
      }
      // tải lại danh sách kế hoạch công việc
      const workFlow = {
        Id: '12',
        MyWorkId: item.MyWorkId
      };
      this._workdetailService.r1_ChangeScheduleWork(workFlow);
      // tải lại danh sách kế hoạch công việc
      this.toarst.success('Cập nhật trạng thái công việc thành công!', 'Thông báo');
      return;
    });
  }
}

export class TrangThaiCv {
  Id: number;
  Name: string;
}


