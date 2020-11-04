import { TreeDiagramComponent } from './../components/tree-diagram/tree-diagram.component';
import { ModalSelectUserComponent } from './../components/modal-select-user/modal-select-user.component';
import { SelectLenhComponent } from './../components/select-lenh/select-lenh.component';
import { ConfigUserHandelComponent } from './../components/config-user-handel/config-user-handel.component';
import { OptionGrouproleComponent } from './../components/option-grouprole/option-grouprole.component';
import { ModaladdComponent } from './../components/modaladd/modaladd.component';
import { ModaldelComponent } from './../components/modaldel/modaldel.component';
import { PermitexportDirective } from './../directives/permitexport.directive';
import { PermitdelDirective } from './../directives/permitdel.directive';
import { PermitupdateDirective } from './../directives/permitupdate.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermitaddDirective } from '../directives/permitadd.directive';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InputDateComponent } from '../components/input-date/input-date.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputFileImageComponent } from '../components/input-file-image/input-file-image.component';
import { InputRadioCheckboxComponent } from '../components/input-radio-checkbox/input-radio-checkbox.component';
import { OptionCongtyComponent } from '../components/option-congty/option-congty.component';
import { CheckAllComponent } from '../components/check-all/check-all.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { LinhvucVanbanComponent } from '../components/linhvuc-vanban/linhvuc-vanban.component';
import { UrlFileReplacePipe } from '../pipes/url-file-replace.pipe';
import { TrangThaiXuLyPipe } from '../pipes/trang-thai-xu-ly.pipe';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PermitshowDirective } from '../directives/permitshow.directive';

@NgModule({
  declarations: [PermitaddDirective, PermitupdateDirective, PermitdelDirective, PermitexportDirective,
    PaginationComponent, ModaldelComponent, ModaladdComponent, InputDateComponent, InputFileImageComponent,
  InputRadioCheckboxComponent, OptionCongtyComponent, CheckAllComponent, OptionGrouproleComponent, ConfigUserHandelComponent,
  SelectLenhComponent, ModalSelectUserComponent, LinhvucVanbanComponent, UrlFileReplacePipe, TrangThaiXuLyPipe, TreeDiagramComponent,
  PermitshowDirective],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    BsDatepickerModule,
    NgbModule,
    MatTreeModule,
    CdkTreeModule,
    MatIconModule,
    NgxGraphModule
  ],
  exports: [
    FormsModule,
    MatTreeModule,
    CdkTreeModule,
    PermitaddDirective,
    PermitupdateDirective,
    PermitdelDirective,
    PermitexportDirective,
    PermitshowDirective,
    PaginationComponent,
    ModaldelComponent,
    ModaladdComponent,
    InputDateComponent,
    InputFileImageComponent,
    InputRadioCheckboxComponent,
    OptionCongtyComponent,
    ModalModule,
    CheckAllComponent,
    OptionGrouproleComponent,
    ConfigUserHandelComponent,
    SelectLenhComponent,
    ModalSelectUserComponent,
    LinhvucVanbanComponent,
    UrlFileReplacePipe,
    TrangThaiXuLyPipe,
    TreeDiagramComponent,
  ]
})
export class SharedModule { }
