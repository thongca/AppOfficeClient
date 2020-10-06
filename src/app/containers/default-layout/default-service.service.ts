import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from '../../models/systems/notifi/Notifi.model';
import { ApiService } from '../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultServiceService {
  private listnotifis = new Subject<NotificationModel[]>();
  public listnotifis$ = this.listnotifis.asObservable();
  private total = new Subject<number>();
  public total$ = this.total.asObservable();
  constructor(
    private _apiService: ApiService,
  ) { }
  getNotify() {
    this._apiService.r1_Get_List_Data('api/Common/r1GetListThongBao').subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        return;
      }
      this.listnotifis.next(res['data']);
      this.total.next(res['total']);
    });
  }
}
