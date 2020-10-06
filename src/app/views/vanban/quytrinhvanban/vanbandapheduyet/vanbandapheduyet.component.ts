import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { VbMoiSoHoa } from '../../../../models/vanban/quytrinhvanban/vbmoisohoa.model';
import { User } from '../../../../models/systems/systemcategory/user.model';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/api.service';
import { CommonService } from '../../../../common/common.service';
import { SelectLenhComponent } from '../../../../components/select-lenh/select-lenh.component';

@Component({
  selector: 'app-vanbandapheduyet',
  templateUrl: './vanbandapheduyet.component.html',
  styleUrls: ['./vanbandapheduyet.component.css']
})
export class VanbandapheduyetComponent implements OnInit {
  @ViewChild('treediagram', { static: false }) public treediagram: TreeDiagramComponent;
  @ViewChild('selectLenh', { static: false }) public selectLenh: SelectLenhComponent;
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
    private _commonService: CommonService
    ) { }

  ngOnInit(): void {
    this.r1GetListLinhVuc();
    this.r1GetListVanBan();
  }
  r1GetListVanBan() {
    this._apiService.r1_Get_List_Data('api/VanBanDaPheDuyet/r1GetListVBDaPheDuyet')
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        this.listSoHoaVbs = res['data'];
      });
}
SelectIDEditModel(Id) {
 this._apiService.r1_GetDataByID(Id, 'api/SoHoaVanBan').subscribe(res => {
    if (res !== undefined) {
      if (res['error'] === 1) {
        return;
      }
      this.modelView = res['data'];
      this.filesView = res['files'];
      this.listLcvb = res['lcvbs'];
      const lcvb = res['lcvb'];
      this.treediagram.getStart(this.listLcvb);
    this.pdfSrc = this._commonService.replaceUrlImage(res['files'][0].Path);
    }
  });
  this.selectaRow(Id);
}
selectaRow(Id) {
  this.IdVb = Id;
  this.selectLenh.showBtn(true);
  }
  r1GetListLinhVuc() {
    this._apiService.r1_Get_List_Data('api/VanBanCommon/r1GetListNhanSu')
      .subscribe(res => {
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
changeUrlpdf(pathDb) {
  this.pdfSrc = this._commonService.replaceUrlImage(pathDb);
}
  onSelectFile(fileInput: any) {
    this.vbattach = fileInput;
  }
  onSelectFileDinhKem(fileInput: any) {
    this.dcfile = fileInput;
  }
  RefreshData() {

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
}
