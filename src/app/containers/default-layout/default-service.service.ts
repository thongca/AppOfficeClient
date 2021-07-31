import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from '../../models/systems/notifi/Notifi.model';
import { ApiService } from '../../shared/api.service';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import { NotifyContent } from '../../shared/signal-real-time.service';

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
    private _pushNotificationService: PushNotificationService
  ) { }
  getNotify() {
    this._apiService.r1_Get_List_Data('api/Common/r1GetListThongBao').subscribe(res => {
      this._apiService.hidespinner();
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
  requirePushNotify() {
    this._pushNotificationService.requestPermission();
  }
  PushNotifyToWindows(data: NotifyContent) {
    let title = 'Thông báo';
    const options = new PushNotificationOptions();
    options.body = 'Thông báo dòng chảy công việc!';
    if (data !== null) {
      if (data.tenNguoiGui != null) {
        options.body = '(' + data.tenNguoiGui + ') ' + 'ND: ' + data.noiDung;
      }
      if (data.trangThai != null) {
        title = data.trangThai;
      }
    }
    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        setTimeout(() => {
          notif.notification.close();
        }, 30000);
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
