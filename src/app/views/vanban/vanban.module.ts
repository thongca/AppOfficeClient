import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VanbanRoutingModule } from './vanban-routing.module';
import { VanbanComponent } from './vanban.component';


@NgModule({
  declarations: [VanbanComponent],
  imports: [
    CommonModule,
    VanbanRoutingModule
  ]
})
export class VanbanModule { }
