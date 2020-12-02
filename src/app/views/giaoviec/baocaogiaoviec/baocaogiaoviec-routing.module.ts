import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { HieuquacongviecComponent } from './hieuquacongviec/hieuquacongviec.component';
import { NhatkycongviecComponent } from './nhatkycongviec/nhatkycongviec.component';
import { TonghopthoigianComponent } from './tonghopthoigian/tonghopthoigian.component';


const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'hieuquacongviec',
    component: HieuquacongviecComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'nhatkycongviec',
    component: NhatkycongviecComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'tonghopthoigian',
    component: TonghopthoigianComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaocaogiaoviecRoutingModule { }
