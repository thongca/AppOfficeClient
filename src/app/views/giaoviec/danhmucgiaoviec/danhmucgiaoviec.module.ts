import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucgiaoviecRoutingModule } from './danhmucgiaoviec-routing.module';
import { CongviecthuongxuyenComponent } from './congviecthuongxuyen/congviecthuongxuyen.component';
import { LoidanhgiaComponent } from './loidanhgia/loidanhgia.component';
import { SharedModule } from '../../../shared/shared.module';
import { DokhocongviecComponent } from './dokhocongviec/dokhocongviec.component';
import { DouutienComponent } from './douutien/douutien.component';


@NgModule({
  declarations: [CongviecthuongxuyenComponent, LoidanhgiaComponent, DokhocongviecComponent, DouutienComponent],
  imports: [
    CommonModule,
    DanhmucgiaoviecRoutingModule,
    SharedModule,
  ]
})
export class DanhmucgiaoviecModule { }
