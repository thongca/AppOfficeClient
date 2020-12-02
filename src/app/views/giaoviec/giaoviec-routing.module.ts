import { GiaoviecComponent } from './giaoviec.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: GiaoviecComponent,
    children: [
      {
        canActivateChild: [AuthGuard],
        path: '',
        loadChildren: () => import('./quytrinhgiaoviec/quytrinhgiaoviec.module').then(m => m.QuytrinhgiaoviecModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'danhmucgiaoviec',
        loadChildren: () => import('./danhmucgiaoviec/danhmucgiaoviec.module').then(m => m.DanhmucgiaoviecModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'quytrinhgiaoviec',
        loadChildren: () => import('./quytrinhgiaoviec/quytrinhgiaoviec.module').then(m => m.QuytrinhgiaoviecModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'baocao',
        loadChildren: () => import('./baocaogiaoviec/baocaogiaoviec.module').then(m => m.BaocaogiaoviecModule)
      },
      {
        path: '**',
        component: GiaoviecComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiaoviecRoutingModule { }
