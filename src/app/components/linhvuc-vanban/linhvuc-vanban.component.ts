import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { LinhVuc } from '../../models/vanban/quytrinhvanban/quytrinh.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-linhvuc-vanban',
  templateUrl: './linhvuc-vanban.component.html',
  styleUrls: ['./linhvuc-vanban.component.css']
})
export class LinhvucVanbanComponent implements OnInit {
  @Input() isShowLinhVuc: string;
  @Input() isShowLVb: string;
  @Output() changeLinhVuc = new EventEmitter();
  @Output() changeLoaiVb = new EventEmitter();
  listLinhVucs: LinhVuc[] = [];
  listLoaiVbs: LinhVuc[] = [];
  LinhVucId = 0;
  LoaiVbId = 0;
  constructor(
    private _apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1GetListLoaiVb();
  }
  r1GetListLinhVuc() {
    this._apiService.r1_Get_List_Data('api/VanBanCommon/r1GetListLinhVuc')
      .subscribe(res => {
        this.spinner.hide();
        if (res === undefined) {
          return;
        }
        this.listLinhVucs = res['data'];
        this.LinhVucId = this.listLinhVucs[0].Id;
        this.changeLinhVuc.emit(this.LinhVucId);
      });
  }
  r1GetListLoaiVb() {
    this._apiService.r1_Get_List_Data('api/VanBanCommon/r1GetListLoaiVanBan')
      .subscribe(res => {
        this.spinner.hide();
        if (res === undefined) {
          return;
        }
        this.listLoaiVbs = res['data'];
        this.LoaiVbId = this.listLoaiVbs[0].Id;
        this.changeLoaiVb.emit(this.LoaiVbId);
      });
  }
  ChangeLoaiVb(value) {
    this.changeLoaiVb.emit(value);
  }
  ChangeLinhVuc(value) {
    this.changeLinhVuc.emit(value);
  }

}
