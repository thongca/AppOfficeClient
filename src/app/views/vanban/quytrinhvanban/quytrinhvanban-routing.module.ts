import { VanbannhanthongbaoComponent } from './vanbannhanthongbao/vanbannhanthongbao.component';
import { VanbanbitralaiComponent } from './vanbanbitralai/vanbanbitralai.component';
import { VanbanminhdaduyetComponent } from './vanbanminhdaduyet/vanbanminhdaduyet.component';
import { VanbandapheduyetComponent } from './vanbandapheduyet/vanbandapheduyet.component';
import { VanbanchopheduyetComponent } from './vanbanchopheduyet/vanbanchopheduyet.component';
import { SohoavanbanComponent } from './sohoavanban/sohoavanban.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';


const routes: Routes = [
  {
    canActivateChild: [AuthGuard],
    path: 'sohoavanban',
    component: SohoavanbanComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'vanbanchopheduyet',
    component: VanbanchopheduyetComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'vanbandapheduyet',
    component: VanbandapheduyetComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'vanbanminhdaduyet',
    component: VanbanminhdaduyetComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'vanbanbitralai',
    component: VanbanbitralaiComponent
  },
  {
    canActivateChild: [AuthGuard],
    path: 'vanbannhanthongbao',
    component: VanbannhanthongbaoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuytrinhvanbanRoutingModule { }
