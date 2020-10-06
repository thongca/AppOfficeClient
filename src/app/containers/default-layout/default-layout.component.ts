import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../shared/api.service';
import { CommonService } from './../../common/common.service';
import { SignalRealTimeService } from './../../shared/signal-real-time.service';
import { MenuService } from './../../common/menu.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/search.service';
import { UserNhanThongBao } from '../../models/usernhantb.interface';
import { DefaultServiceService } from './default-service.service';
import { NotificationModel } from '../../models/systems/notifi/Notifi.model';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit {
  public sidebarMinimized = false;
  public navItems = [];
  public listThongbaos: NotificationModel[] = [];
  userNhanTbs: UserNhanThongBao[] = [];
  s: string;
  total = 0;
  fullName = '';
  cthongbao: string;
  load = false;
  userLoginId: number = this._commonService.getUserId();
  todos$ = this.search.$search;
  constructor(
    private _signalSer: SignalRealTimeService,
    private _commonService: CommonService,
    private _apiService: ApiService,
    private _menuService: MenuService,
    public search: SearchService,
    private _defaultService: DefaultServiceService,
    private router: Router) {
    this.navItems = this._menuService.getDataMenu();
  }
  ngOnInit(): void {
    this.fullName = this._commonService.getUserFullName();
    this._signalSer.signal$.pipe(
      map(res => {
        const listUserNhans = JSON.parse(res) as UserNhanThongBao[];
        const isValue = listUserNhans.filter(x => x.NguoiNhanId === this.userLoginId);
        if (isValue && isValue.length > 0) {
          return true;
        } else {
          return false;
        }
      })
    ).subscribe(data => {
      if (data === true) {
        this._defaultService.getNotify();
      }
    });
    this._defaultService.getNotify();
    this.todos$.subscribe(res => {
      let ss = '';
      if (res === undefined || res === '') {
        ss = '';
      } else {
        ss = res;
      }
      this.s = ss;
    });
  }
  ngAfterViewInit() {
    this._defaultService.listnotifis$.subscribe(res => {
      this.listThongbaos = res;
    });
    this._defaultService.total$.subscribe(res => {
      this.total = res;
    });
  }
  updateDaXemThongBao(Id) {
    const op = {
      'Id': Id
    };
    this._apiService.r2_Add_Data_Model(op, 'api/Common/r1PostUpdateThongBao').subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        return;
      }
      this._defaultService.getNotify();
    });
  }
  LogOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  Search() {
    const _s = this.s as unknown as string;
    this.search.SearchRoot(_s);
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
