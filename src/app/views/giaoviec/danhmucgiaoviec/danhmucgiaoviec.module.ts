import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucgiaoviecRoutingModule } from './danhmucgiaoviec-routing.module';
import { CongviecthuongxuyenComponent } from './congviecthuongxuyen/congviecthuongxuyen.component';
import { LoidanhgiaComponent } from './loidanhgia/loidanhgia.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [CongviecthuongxuyenComponent, LoidanhgiaComponent],
  imports: [
    CommonModule,
    DanhmucgiaoviecRoutingModule,
    SharedModule,
  ]
})
export class DanhmucgiaoviecModule { }
