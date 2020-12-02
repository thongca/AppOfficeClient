import { CongvieccuatoiComponent } from './congvieccuatoi/congvieccuatoi.component';
import { CongviecmoiComponent } from './congviecmoi/congviecmoi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { ChophethoihanComponent } from './chophethoihan/chophethoihan.component';
import { DangthuchienComponent } from './dangthuchien/dangthuchien.component';
import { ChophehoanthanhcongviecComponent } from './chophehoanthanhcongviec/chophehoanthanhcongviec.component';
import { CongviectoiphoihopComponent } from './congviectoiphoihop/congviectoiphoihop.component';
import { CongviecovertimeComponent } from './congviecovertime/congviecovertime.component';
import { CvkhoitaosauComponent } from './cvkhoitaosau/cvkhoitaosau.component';
import { DuyetkhoitaosauComponent } from './duyetkhoitaosau/duyetkhoitaosau.component';


const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'congviecmoi',
    component: CongviecmoiComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congviecchophethoihan',
    component: ChophethoihanComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congvieccuatoi',
    component: CongvieccuatoiComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congviecdangthuchien',
    component: DangthuchienComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congviecchophehoanthanh',
    component: ChophehoanthanhcongviecComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congviectoiphoihop',
    component: CongviectoiphoihopComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'duyetlamthemgio',
    component: CongviecovertimeComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'congvieckhoitaosau',
    component: CvkhoitaosauComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'duyetkhoitaosau',
    component: DuyetkhoitaosauComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuytrinhgiaoviecRoutingModule { }
