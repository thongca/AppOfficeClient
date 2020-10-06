import { VanbanComponent } from './vanban.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: VanbanComponent,
    children: [
      {
        canActivateChild: [AuthGuard],
        path: '',
        loadChildren: () => import('./quytrinhvanban/quytrinhvanban.module').then(m => m.QuytrinhvanbanModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'danhmucvanban',
        loadChildren: () => import('./danhmucvanban/danhmucvanban.module').then(m => m.DanhmucvanbanModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'quytrinhvanban',
        loadChildren: () => import('./quytrinhvanban/quytrinhvanban.module').then(m => m.QuytrinhvanbanModule)
      },
      {
        path: '**',
        component: VanbanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanbanRoutingModule { }
