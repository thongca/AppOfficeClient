import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanActivateChild } from '@angular/router';
import { SystemsComponent } from './systems.component';

const routes: Routes = [
  {
    path: '',
    component: SystemsComponent,
    children: [
      {
        canActivateChild: [AuthGuard],
        path: '',
        loadChildren: () => import('./systemcategory/systemcategory.module').then(m => m.SystemcategoryModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'danhmuchethong',
        loadChildren: () => import('./systemcategory/systemcategory.module').then(m => m.SystemcategoryModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'quantrihethong',
        loadChildren: () => import('./systemmanagement/systemmanagement.module').then(m => m.SystemmanagementModule)
      },
      {
        path: '**',
        component: SystemsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }
