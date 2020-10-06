import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OptionHeader } from '../../common/option';
import { ICompany } from '../../models/systems/systemmanagement/company.model';
import { ApiService } from '../../shared/api.service';
import { CommonService } from '../../common/common.service';
import { VbBuoc, IVbQuyTrinh, OptionQuyTrinh } from '../../models/vanban/quytrinhvanban/quytrinh.model';

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
    BuocId: 0,
    CompanyId: 0,
    LenhTuongTacId: 0,
    QuyTrinhId: 0
  };
  QuyTrinhId: number;
  BuocId: number;
  listCompanys: ICompany[] = [];
  listBuocs: VbBuoc[] = [];
  listQuyTrinhs: IVbQuyTrinh[] = [];
  constructor(
    private _apiService: ApiService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.permission = this._commonService.getPermissionUser();
    if (this.permission === 0) {
      this.listCompanys = this._commonService.getCongtys();
      if (this.listCompanys.length > 0) {
        this.options.CompanyId = this._commonService.getDefaultCompanyId();
        this.changeCongtys.emit(this.listCompanys[0].Id);
      }
    } else {
      this.listCompanys = [];
      this.options.CompanyId = Number(this._commonService.getCompanyUser());
    }
    this.r1GetQuyTrinh();
  }
  r1GetQuyTrinh() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
        this._apiService.r1_Get_List_Data('api/QuyTrinhVanBan/r1GetListDataQT')
          .subscribe(res => {
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
              this.changeQuyTrinhs.emit(0);
            }
            this.r1GetSteps();
          });
  }
  r1GetSteps() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
        this._apiService.r1_List_Data_Model_General(this.options, 'api/Common/r1GetListDataBuoc')
          .subscribe(res => {
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
              this.changeSteps.emit(0);
            }
          });
  }
  ChangeCongty(value) {
    this.options.CompanyId = Number(value);
    this.changeCongtys.emit(value);
    this.r1GetQuyTrinh();
  }
  ChangeQuyTrinh(value) {
    this.options.QuyTrinhId = Number(value);
    this.changeQuyTrinhs.emit(value);
    this.r1GetSteps();
  }
  ChangeBuoc(value) {
    this.options.BuocId = value;
    this.changeSteps.emit(value);
  }
}
