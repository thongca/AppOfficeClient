import { TreeDiagramComponent } from './../../../../components/tree-diagram/tree-diagram.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VbMoiSoHoa } from '../../../../models/vanban/quytrinhvanban/vbmoisohoa.model';
import { ApiService } from '../../../../shared/api.service';
import { ApifileService } from '../../../../shared/apifile.service';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../models/systems/systemcategory/user.model';
import { CommonService } from '../../../../common/common.service';
import { SelectLenhComponent } from '../../../../components/select-lenh/select-lenh.component';

@Component({
  selector: 'app-sohoavanban',
  templateUrl: './sohoavanban.component.html',
  styleUrls: ['./sohoavanban.component.css']
})
export class SohoavanbanComponent implements OnInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  @ViewChild('treediagram', { static: false }) public treediagram: TreeDiagramComponent;
  @ViewChild('selectLenh', { static: false }) public selectLenh: SelectLenhComponent;
  model: VbMoiSoHoa = new VbMoiSoHoa();
  modelView: VbMoiSoHoa = new VbMoiSoHoa();
  step = 0;
  nguoiKys: User[] = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [];
  listSoHoaVbs: VbMoiSoHoa[];
  pdfSrc: string;
  listLcvb: [];
  IdVb: string;
  filesView: [];
  vbattach: File = null;
  dcfile: File = null;
  constructor(
    private toastr: ToastrService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _apiFileService: ApifileService,
  ) { }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1GetListVanBan();
  }
  r1GetListVanBan() {
    this._apiService.r1_Get_List_Data('api/SoHoaVanBan/r1GetListDanhSachVBSoHoa')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        this.listSoHoaVbs = res['data'];
      });
  }
  SelectIDEditModel(item: VbMoiSoHoa) {
    this._apiService.r1_GetDataByID(item.Id, 'api/SoHoaVanBan').subscribe(res => {
      this._apiService.hidespinner();
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
    this.selectaRow(item.Id, item.NgayXuLy);
  }
  selectaRow(Id, NgayXuLy: Date) {
    console.log(NgayXuLy);
    this.IdVb = Id;
    if (NgayXuLy == null) {
      this.selectLenh.showBtn(true);
    } else {
      this.selectLenh.showBtn(false);
    }

  }
  r3_AddinfoUnitCode() {
    if (this.selectedItems !== undefined) {
      this.model.NguoiKyId = this.selectedItems[0].Id;
    }
    if (this.model.Id === undefined) {
      this.model.Id = 0;
      this._apiFileService.r2_addMulFileModel(this.vbattach, this.dcfile, this.model, 'api/SoHoaVanBan/r2addObjvanBan')
        .subscribe(next => {
          if (next.type === HttpEventType.Response) {
            this.toastr.success('Số hóa văn bản thành công!', 'Thông báo');
            this.hideModal();
            this.r1GetListVanBan();
            return;
          }
        });
    } else {
      this._apiFileService.r2_addFileModel(this.vbattach, this.model, '/api/Tco_Dm_UnitCode/r2updateObjUnitCode')
        .subscribe(next => {
          if (next.type === HttpEventType.Response) {
            this.toastr.success('Cập nhật văn bản thành công!', 'Thông báo');
            this.hideModal();
            this.r1GetListVanBan();
            return;
          }
        });
    }
  }
  r1GetListLinhVuc() {
    this._apiService.r1_Get_List_Data('api/VanBanCommon/r1GetListNhanSu')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        this.nguoiKys = res['data'];
        this.dropdownList = this.nguoiKys;
        this.selectedItems = [
        ];
        this.dropdownSettings = {
          singleSelection: true,
          idField: 'Id',
          textField: 'FullName',
          selectAllText: 'Chọn tất cả',
          unSelectAllText: 'Bỏ chọn tất cả',
          itemsShowLimit: 1,
          allowSearchFilter: true
        };
      });
  }
  refreshList() {
    this.r1GetListVanBan();
  }
  RefreshData() {

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
  dateSelect(value) {
    this.model.NgayBanHanh = value;
  }
  setStep(index: number) {
    this.step = index;
  }
  selectLoaiVb(value) {
    this.model.LoaiVanBanId = value;
  }
  selectLinhVuc(value) {
    this.model.LinhVucId = value;
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
}
