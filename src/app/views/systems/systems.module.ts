import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';


@NgModule({
  imports: [
    CommonModule,
    SystemsRoutingModule
  ],
  declarations: [SystemsComponent],
})
export class SystemsModule { }
