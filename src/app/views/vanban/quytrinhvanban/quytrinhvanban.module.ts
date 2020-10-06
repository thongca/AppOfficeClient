import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuytrinhvanbanRoutingModule } from './quytrinhvanban-routing.module';
import { SohoavanbanComponent } from './sohoavanban/sohoavanban.component';
import { SharedModule } from '../../../shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { VanbanchopheduyetComponent } from './vanbanchopheduyet/vanbanchopheduyet.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { VanbandapheduyetComponent } from './vanbandapheduyet/vanbandapheduyet.component';
import { VanbanminhdaduyetComponent } from './vanbanminhdaduyet/vanbanminhdaduyet.component';
import { VanbanbitralaiComponent } from './vanbanbitralai/vanbanbitralai.component';
import { VanbannhanthongbaoComponent } from './vanbannhanthongbao/vanbannhanthongbao.component';
@NgModule({
  declarations: [SohoavanbanComponent, VanbanchopheduyetComponent, VanbandapheduyetComponent, VanbanminhdaduyetComponent,
    VanbanbitralaiComponent,
    VanbannhanthongbaoComponent],
  imports: [
    CommonModule,
    QuytrinhvanbanRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    NgMultiSelectDropDownModule,
    NgxDocViewerModule
  ]
})
export class QuytrinhvanbanModule { }
