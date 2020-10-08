import { HanCongViecPipe } from './../../../pipes/myworks/han-cong-viec.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { QuytrinhgiaoviecRoutingModule } from './quytrinhgiaoviec-routing.module';
import { CongviecmoiComponent } from './congviecmoi/congviecmoi.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CongvieccuatoiComponent } from './congvieccuatoi/congvieccuatoi.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TreeScheduleComponent } from '../components/tree-schedule/tree-schedule.component';
import { VongDoiCongViecPipe } from '../../../pipes/myworks/vong-doi-cong-viec.pipe';
import { MatCardModule } from '@angular/material/card';
import { TypeflowPipe } from '../../../pipes/myworks/typeflow.pipe';
import { SelectCommandComponent } from '../components/select-command/select-command.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChophethoihanComponent } from './chophethoihan/chophethoihan.component';
import { WorkflowDetailComponent } from '../components/workflow-detail/workflow-detail.component';
import { DangthuchienComponent } from './dangthuchien/dangthuchien.component';
import { ChophehoanthanhcongviecComponent } from './chophehoanthanhcongviec/chophehoanthanhcongviec.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { HieuquacongviecComponent } from './hieuquacongviec/hieuquacongviec.component';
import { NhatkycongviecComponent } from './nhatkycongviec/nhatkycongviec.component';
import { TrangthaiSchedulePipe } from '../../../pipes/myworks/trangthai-schedule.pipe';
import { CongviectoiphoihopComponent } from './congviectoiphoihop/congviectoiphoihop.component';
import { DelMyWorkComponent } from '../components/del-my-work/del-my-work.component';
import { TonghopthoigianComponent } from './tonghopthoigian/tonghopthoigian.component';
@NgModule({
  declarations: [CongviecmoiComponent, CongvieccuatoiComponent, TreeScheduleComponent, VongDoiCongViecPipe, TypeflowPipe, HanCongViecPipe,
    SelectCommandComponent, WorkflowDetailComponent,
    ChophethoihanComponent,
    DangthuchienComponent,
    ChophehoanthanhcongviecComponent,
    HieuquacongviecComponent,
    NhatkycongviecComponent,
    TrangthaiSchedulePipe,
    CongviectoiphoihopComponent,
    DelMyWorkComponent,
    TonghopthoigianComponent
  ],
  imports: [
    CommonModule,
    QuytrinhgiaoviecRoutingModule,
    SharedModule,
    NgbModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    NgMultiSelectDropDownModule,
    NgxDocViewerModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    MatCardModule,
    TimepickerModule.forRoot()
  ]
})
export class QuytrinhgiaoviecModule { }
