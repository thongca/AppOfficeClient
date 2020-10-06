import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemmanagementRoutingModule } from './systemmanagement-routing.module';
import { ModulecompanyComponent } from './modulecompany/modulecompany.component';
import { ModuledepartmentComponent } from './moduledepartment/moduledepartment.component';
import { ModulenestComponent } from './modulenest/modulenest.component';
import { PermissionmoduleComponent } from './permissionmodule/permissionmodule.component';
import { SharedModule } from '../../../shared/shared.module';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { QuytrinhvanbanComponent } from './quytrinhvanban/quytrinhvanban.component';
import { CauhinhnguoinhanComponent } from './cauhinhnguoinhan/cauhinhnguoinhan.component';

@NgModule({
  declarations: [ModulecompanyComponent, ModuledepartmentComponent, ModulenestComponent, PermissionmoduleComponent,
    QuytrinhvanbanComponent,
    CauhinhnguoinhanComponent],
  imports: [
    CommonModule,
    SystemmanagementRoutingModule,
    SharedModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule
  ]
})
export class SystemmanagementModule { }
