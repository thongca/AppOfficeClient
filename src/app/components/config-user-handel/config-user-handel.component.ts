import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OptionHeader } from '../../common/option';
import { ICompany } from '../../models/systems/systemmanagement/company.model';
import { ApiService } from '../../shared/api.service';
import { CommonService } from '../../common/common.service';
import { VbBuoc, IVbQuyTrinh, OptionQuyTrinh } from '../../models/vanban/quytrinhvanban/quytrinh.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-config-user-handel',
  templateUrl: './config-user-handel.component.html',
  styleUrls: ['./config-user-handel.component.css']
})
export class ConfigUserHandelComponent implements OnInit {
  @Output() changeCongtys = new EventEmitter();
  @Output() changeQuyTrinhs = new EventEmitter();
  @Output() changeSteps = new EventEmitter();
  permission: number;
  options: OptionQuyTrinh = {
    BuocId: null,
    LenhTuongTacId: null,
    QuyTrinhId: null
  };
  QuyTrinhId: number;
  BuocId: number;
  listCompanys: ICompany[] = [];
  listBuocs: VbBuoc[] = [];
  listQuyTrinhs: IVbQuyTrinh[] = [];
  constructor(
    private _apiService: ApiService,
    private spinner: NgxSpinnerService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.permission = this._commonService.getPermissionUser();
    if (this.permission === 0) {
      this.listCompanys = this._commonService.getCongtys();
      if (this.listCompanys.length > 0) {
        this.changeCongtys.emit(this.listCompanys[0].Id);
      }
    } else {
      this.listCompanys = [];
    }
    this.r1GetQuyTrinh();
  }
  r1GetQuyTrinh() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_Get_List_Data('api/QuyTrinhVanBan/r1GetListDataQT')
      .subscribe(res => {
        this.spinner.hide();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listQuyTrinhs = res['data'];
        if (this.listQuyTrinhs.length > 0) {
          this.changeQuyTrinhs.emit(this.listQuyTrinhs[0].Id);
          this.options.QuyTrinhId = this.listQuyTrinhs[0].Id;
        } else {
          this.changeQuyTrinhs.emit('');
        }
        this.r1GetSteps();
      });
  }
  r1GetSteps() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    this._apiService.r1_List_Data_Model_General(this.options, 'api/Common/r1GetListDataBuoc')
      .subscribe(res => {
        this.spinner.hide();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.listBuocs = res['data'];
        if (this.listBuocs.length > 0) {
          this.changeSteps.emit(this.listBuocs[0].Id);
          this.options.BuocId = this.listBuocs[0].Id;
        } else {
          this.changeSteps.emit('');
        }
      });
  }
  ChangeQuyTrinh(value: string) {
    this.options.QuyTrinhId = value;
    this.changeQuyTrinhs.emit(value);
    this.r1GetSteps();
  }
  ChangeBuoc(value: string) {
    this.options.BuocId = value;
    this.changeSteps.emit(value);
  }
}
