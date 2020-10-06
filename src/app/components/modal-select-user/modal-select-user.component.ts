import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OptionLenhSelect } from '../../models/vanban/quytrinhvanban/quytrinh.model';
import { CommonService } from '../../common/common.service';
import { ApiService } from '../../shared/api.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MoHinhToChuc } from '../../models/systems/systemcategory/congty.model';
import { OptionUser } from '../../common/option';
import { User } from '../../models/systems/systemcategory/user.model';

@Component({
  selector: 'app-modal-select-user',
  templateUrl: './modal-select-user.component.html',
  styleUrls: ['./modal-select-user.component.css'],

})
export class ModalSelectUserComponent implements OnInit {
  _buocLenhGroupId: number;
  @Input() NameBtn: string;
  @Input() set BuocLenhGroupId(value) {
    this._buocLenhGroupId = value;
  }
  @Output() user = new EventEmitter();
  @ViewChild('modalSelectUser', { static: false }) public modalSelectUser: ModalDirective;
  @ViewChild('tree') tree;
  ModalTitle = 'Chọn người nhận';
  listUser: User[];
  treeControl = new NestedTreeControl<MoHinhToChuc>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MoHinhToChuc>();
  options: OptionUser = {
    companyId: 0,
    departmentId: 0,
    nestId: 0,
    s: ''
  };
  nameDanhSach = 'Danh sách nhân sự';
    constructor(
    private _apiService: ApiService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  showModal() {
    this.r1GetDataMoHinhTC();
    this.modalSelectUser.show();
  }
  hideModal() {
    this.modalSelectUser.hide();
  }
  hideModalPassData(row) {
    this.user.emit(row);
    this.modalSelectUser.hide();
  }
  hasChild = (_: number, node: MoHinhToChuc) => !!node.children && node.children.length > 0;
  r1GetDataMoHinhTC() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    const op = {
      'GroupRoleId': Number(this._commonService.getGroupUser()),
      'BuocLenhGroupId': this._buocLenhGroupId
    };
    this._apiService.r1_List_Data_Model_General(op, 'api/Common/r1GetListDataMohinhToChuc')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.dataSource.data = res['data'];
        this.treeControl.dataNodes = res['data'];
        this.treeControl.expandAll();
      });
  }
  getListUserByComId(Loai, Id: number, Name) {
    this.nameDanhSach = 'Danh sách nhân sự của ' + Name;
    switch (Loai) {
      case 0:
        this.options.companyId = Id;
        this.options.departmentId = 0;
        this.options.nestId = 0;
        this.r1GetDataUser();
        break;
      case 1:
        this.options.companyId = 0;
        this.options.departmentId = Id;
        this.options.nestId = 0;
        this.r1GetDataUser();
        break;
      default:
        this.options.companyId = 0;
        this.options.departmentId = 0;
        this.options.nestId = Id;
        this.r1GetDataUser();
        break;
    }
  }
  r1GetDataUser() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_List_Data_Model_General(this.options, 'api/Common/r1GetListUser')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listUser = res['data'];
      });
  }
}
