import { CauhinhnguoinhanComponent } from './cauhinhnguoinhan/cauhinhnguoinhan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { ModulecompanyComponent } from './modulecompany/modulecompany.component';
import { ModuledepartmentComponent } from './moduledepartment/moduledepartment.component';
import { ModulenestComponent } from './modulenest/modulenest.component';
import { PermissionmoduleComponent } from './permissionmodule/permissionmodule.component';
import { QuytrinhvanbanComponent } from './quytrinhvanban/quytrinhvanban.component';



const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'modulecongty',
    component: ModulecompanyComponent
  },
  {
    path: 'modulephongban',
    component: ModuledepartmentComponent
  },
  {
    path: 'moduleto',
    component: ModulenestComponent
  },
  {
    path: 'phanquyen',
    component: PermissionmoduleComponent
  },
  {
    path: 'quytrinhvanban',
    component: QuytrinhvanbanComponent
  },
  {
    path: 'cauhinhnguoinhan',
    component: CauhinhnguoinhanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemmanagementRoutingModule { }
