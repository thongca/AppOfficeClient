import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiaoviecRoutingModule } from './giaoviec-routing.module';
import { GiaoviecComponent } from './giaoviec.component';
import { ModaladdCvComponent } from './components/modaladd-cv/modaladd-cv.component';

@NgModule({
  declarations: [GiaoviecComponent, ModaladdCvComponent],
  imports: [
    CommonModule,
    GiaoviecRoutingModule,
  ]
})
export class GiaoviecModule { }
