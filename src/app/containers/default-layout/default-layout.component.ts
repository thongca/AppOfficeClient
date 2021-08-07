import { ApiService } from './../../shared/api.service';
import { CommonService } from './../../common/common.service';
import { SignalRealTimeService } from './../../shared/signal-real-time.service';
import { MenuService } from './../../common/menu.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/search.service';
import { UserNhanThongBao } from '../../models/usernhantb.interface';
import { DefaultServiceService } from './default-service.service';
import { NotificationModel } from '../../models/systems/notifi/Notifi.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OptionHeader, UserLoginFromToken } from '../../common/option';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('modaldata', { static: false }) public modaldata: ModalDirective;
  public sidebarMinimized = false;
  public navItems = [];
  public listThongbaos: NotificationModel[] = [];
  userNhanTbs: UserNhanThongBao[] = [];
  changPass: ChangePass = new ChangePass();
  userLogin: UserLoginFromToken = this._commonService.readDataTokenUser();
  s: string;
  total = 0;
  fullName = '';
  cthongbao: string;
  load = false;
  userLoginId: number = 0;
  menuName: string;
  ctcompanies = [];
  ctdepartments = [];
  modelgl: GlobalData = new GlobalData();
  constructor(
    private _signalSer: SignalRealTimeService,
    private _commonService: CommonService,
    private _toastr: ToastrService,
    private _apiService: ApiService,
    private _menuService: MenuService,
    public search: SearchService,
    private _defaultService: DefaultServiceService,
    private router: Router) {
    this.navItems = this._menuService.getDataMenu();
  }
  ngOnInit(): void {
    this.userLoginId = this.userLogin.UserID;
    this.fullName = this.userLogin.FullName;
    this.modelgl.CompanyId = this.userLogin.CompanyId;
    this.modelgl.DepartmentId = this.userLogin.DepartmentId;
    this._defaultService.getNotify();
    this.search.DataSearch$.subscribe(res => {
      let ss = '';
      if (res === undefined || res === '') {
        ss = '';
      } else {
        ss = res;
      }
      this.s = ss;
    });
    this._defaultService.requirePushNotify();
    this.getCongtys();
    this.r1GetDepartment();
  }
  ngAfterViewInit() {
    this._signalSer.signal$.subscribe(data => {
      this._defaultService.getNotify();
      this._defaultService.PushNotifyToWindows(data);
    });
    this._defaultService.listnotifis$.subscribe(res => {
      this.listThongbaos = res;
    });
    this._defaultService.total$.subscribe(res => {
      this.total = res;
    });
    this._commonService.nameMenu$.subscribe(res => {
      this.menuName = res;
    });
  }
  getCongtys() {
    this.ctcompanies = this._commonService.getCongtys();
    this.modelgl.CompanyId = this._commonService.readDataTokenCompanyId();
  }
  r1GetDepartment() {
    // neu fresh = 1 thì gửi request vào server, không thì gọi từ trên store xuống
    const options = new OptionHeader();
    this._apiService.r1_Post_List_Data(options, 'api/Common/r1GetListDataCommonDep')
      .subscribe(res => {
        this._apiService.hidespinner();
        if (res === undefined) {
          return;
        }
        if (res['error'] === 1) {
          return;
        }
        this.ctdepartments = res['data'];
      });
  }
  updateDaXemThongBao(Id) {
    const op = {
      'Id': Id
    };
    this._apiService.r2_Add_Data_Model(op, 'api/Common/r1PostUpdateThongBao').subscribe(res => {
      this._apiService.hidespinner();
      if (res === undefined) {
        return;
      }
      this.total = this.total - 1 > 0 ? this.total - 1 : 0;
      if (res['error'] === 1) {
        return;
      }
    });
  }
  updateAllDaXem() {
    this._apiService.r1_Get_List_Data('api/Common/r1GetUpdateAllThongBao').subscribe(res => {
      this._apiService.hidespinner();
      if (res === undefined) {
        return;
      }
      this.total = 0;
      if (res['error'] === 1) {
        return;
      }
    });
  }
  ShowModalDoiMatKhau() {
    this.modaldata.show();
  }
  DoiMatKhau() {
    this._apiService.r2_Add_Data_Model(this.changPass, 'api/login/ChangePassword').subscribe(res => {
      this._apiService.hidespinner();
      this.modaldata.hide();
      if (res['error'] === 1) {
        this._toastr.error('Đổi mật khẩu không thành công!', 'Thông báo');
        return;
      }
      this._toastr.success('Đổi mật khẩu thành công!', 'Thông báo');
      return;
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
  onChange_Company(companyId: string): void {
    // goi vao server de lau token
    this.r1_onChange_Token();
    this.r1GetDepartment();
  }
  onChange_Department(data): void {
    this.modelgl.DepartmentId = data;
    this.r1_onChange_Token();
  }
  r1_onChange_Token() {
    this._apiService.r2_Add_Data_Model(this.modelgl, 'api/Login/ChangeTokenAdmin').subscribe(res => {
      this._apiService.hidespinner();
      if (res === undefined) {
        return;
      }
      this.total = 0;
      if (res['error'] === 1) {
        return;
      }
      localStorage.setItem('token', res['data']);
      location.reload();
      return;
    });
  }
}
export class ChangePass {
  constructor() {
    this.PassConfirm = null;
    this.PassOld = null;
    this.PassNew = null;
  }
  PassOld: string;
  PassNew: string;
  PassConfirm: string;
}

class GlobalData {
  CompanyId: number;
  DepartmentId: number;
}
