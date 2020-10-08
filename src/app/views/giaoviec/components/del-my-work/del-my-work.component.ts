import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-del-my-work',
  templateUrl: './del-my-work.component.html',
  styleUrls: ['./del-my-work.component.css']
})
export class DelMyWorkComponent implements OnInit {
  MyWorkId: string;
@Input() set setMyWorkId(myWorkId: string) {
this.MyWorkId = myWorkId;
}
@Output() xacNhanXoa = new EventEmitter();
@ViewChild('delModal', { static: false }) public delModal: ModalDirective;
  constructor(
    private _apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  r4_DelMyWork() {
      this.delModal.show();
  }
  XacNhan() {
    const workFlow = {
      Id: '',
      MyWorkId: this.MyWorkId
    };
    this._apiService.r4DelListDataForcheckBox(workFlow, 'api/MyWork/r4RemoveMyWork').subscribe(res => {
      this.delModal.hide();
      if (res['error'] === 1) {
        this.toastr.error(res['ms'], 'Thông báo');
        return;
      }
      this.toastr.success(res['ms'], 'Thông báo');
      this.xacNhanXoa.emit(1);
      return;
    });
  }
}
