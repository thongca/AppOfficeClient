import { UserComponent } from './user/user.component';
import { GrouproleComponent } from './grouprole/grouprole.component';
import { AuthGuard } from './../../../guards/auth.guard';
import { DepartmentsComponent } from './departments/departments.component';
import { CompanyComponent } from './company/company.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'congty',
    component: CompanyComponent
  },
  {
    path: 'phongban',
    component: DepartmentsComponent
  },
  {
    path: 'nhomquyen',
    component: GrouproleComponent
  },
  {
    path: 'nguoidung',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemcategoryRoutingModule { }
