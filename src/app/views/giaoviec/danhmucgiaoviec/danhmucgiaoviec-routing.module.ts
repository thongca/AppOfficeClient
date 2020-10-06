import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { CongviecthuongxuyenComponent } from './congviecthuongxuyen/congviecthuongxuyen.component';
import { LoidanhgiaComponent } from './loidanhgia/loidanhgia.component';


const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'congviecthuongxuyen',
    component: CongviecthuongxuyenComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'loidanhgia',
    component: LoidanhgiaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucgiaoviecRoutingModule { }
