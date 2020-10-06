import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemcategoryRoutingModule } from './systemcategory-routing.module';
import { CompanyComponent } from './company/company.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from '../../../shared/shared.module';
import { GrouproleComponent } from './grouprole/grouprole.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [CompanyComponent, DepartmentsComponent, GrouproleComponent, UserComponent],
  imports: [
    CommonModule,
    SystemcategoryRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule,
  ]
})
export class SystemcategoryModule { }
