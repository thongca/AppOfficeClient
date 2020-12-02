import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaocaogiaoviecRoutingModule } from './baocaogiaoviec-routing.module';
import { TonghopthoigianComponent } from './tonghopthoigian/tonghopthoigian.component';
import { NhatkycongviecComponent } from './nhatkycongviec/nhatkycongviec.component';
import { HieuquacongviecComponent } from './hieuquacongviec/hieuquacongviec.component';
import { SharedModule } from '../../../shared/shared.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [TonghopthoigianComponent, NhatkycongviecComponent, HieuquacongviecComponent],
  imports: [
    CommonModule,
    BaocaogiaoviecRoutingModule,
    SharedModule,
    TimepickerModule.forRoot()
  ]
})
export class BaocaogiaoviecModule { }
