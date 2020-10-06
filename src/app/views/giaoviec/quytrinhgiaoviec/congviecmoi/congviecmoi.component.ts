import { TreeScheduleComponent } from './../../components/tree-schedule/tree-schedule.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApifileService } from '../../../../shared/apifile.service';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { SelectLenhComponent } from '../../../../components/select-lenh/select-lenh.component';
import { CVQTMyWork, CVQTFlowWork, TreeSchedule } from '../../../../models/giaoviec/congviecmoi.model';
import { WorkdetailService } from '../../../../shared/workdetail.service';


@Component({
  selector: 'app-congviecmoi',
  templateUrl: './congviecmoi.component.html',
  styleUrls: ['./congviecmoi.component.css']
})
export class CongviecmoiComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  @ViewChild('treediagram', { static: false }) public treediagram: TreeDiagramComponent;
  @ViewChild('selectLenh', { static: false }) public selectLenh: SelectLenhComponent;
  @ViewChild('treeSchedule', { static: false }) public treeSchedule: TreeScheduleComponent;
  model: CVQTMyWork = new CVQTMyWork();
  modelView: CVQTMyWork = new CVQTMyWork();
  step = 0;
  listCongViecs: TreeSchedule[];
  pdfSrc: string;
  listLcvb: [];
  IdVb: string;
  filesView: [];
  vbattach: File = null;
  dcfile: File = null;
  keywordl = 'Name';
  listNhoms = [];
  listLinhVucs = [];
  listDays: number[];
  listResult = [];
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _apiFileService: ApifileService
    ) { }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1GetListVanBan();
  }
  r1GetListVanBan() {
    this._apiService.r1_Get_List_Data('api/CongViecMoi/r1GetListCongViecMoi')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listCongViecs = res['data'];
      });
}
SelectIDEditModel(item: CVQTFlowWork) {
 this._apiService.r1_GetDataByID(item.Id, 'api/CongViecMoi').subscribe(res => {
    if (res !== undefined) {
      if (res['error'] === 1) {
        return;
      }
      this.modelView = res['data'];
      this.filesView = res['files'];
      this.listLcvb = res['lcvbs'];
      this.treediagram.getStart(this.listLcvb);
    this.pdfSrc = this._commonService.replaceUrlImage(res['files'][0].Path);
    }
  });
  this.selectaRow(item.Id);
}
selectaRow(Id) {
this.IdVb = Id;
this.selectLenh.showBtn(true);


}
  r3_AddQTCongViecMoi() {

    if (this.model.Id === undefined) {
      this._apiFileService.r2_addMulFileModel(this.vbattach, this.dcfile, this.model, 'api/CongViecMoi/r2addCongViecMoi')
        .subscribe(next => {
          if (next.type === HttpEventType.Response) {
            this.toastr.success('Tạo công việc mới thành công!', 'Thông báo');
            this.hideModal();
            this.r1GetListVanBan();
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
  r1GetListLinhVuc() {
    this._apiService.r1_Get_List_Data('api/CongViecMoi/r1GetListDataLinhVucCV')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listLinhVucs = res['data'];
      });
}
r1GetListNhomCV() {
  this._apiService.r1_Get_List_Data('api/CongViecMoi/r1GetListDataNhomCV')
    .subscribe(res => {
      if (res === undefined) {
        return;
      }
      this.listNhoms = res['data'];
    });
}
refreshList() {
  this.r1GetListVanBan();
}
changeUrlpdf(pathDb) {
  this.pdfSrc = this._commonService.replaceUrlImage(pathDb);
}
  onSelectFile(fileInput: any) {
    this.vbattach = fileInput;
  }
  onSelectFileDinhKem(fileInput: any) {
    this.dcfile = fileInput;
  }
  hideModal() {
    this.modaldata.hide();
  }
  dateSelectbd(value) {
    this.model.StartDate = value;
  }
  dateSelectkt(value) {
    this.model.EndDate = value;
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
