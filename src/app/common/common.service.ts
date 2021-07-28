import { waitForAsync } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HashCodeService } from './hashCode.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models/systems/systemmanagement/iuser.model';
import { UserLogin } from './option';
import { BaseUrlService } from './base-url.service';
import { Menu } from './menu';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userlogin: UserLogin = { // các giá trị của user đang đăng nhập
    Id: 0,  groupId: 0, departmentId: 0, nestId: 0, rankrole: 4
  };
  private nameMenu = new Subject<string>();
  public nameMenu$ = this.nameMenu.asObservable();
  constructor(
    private router: Router,
    private _baseUrl: BaseUrlService,
    private toastr: ToastrService,
    private _hashCode: HashCodeService,
  ) {
  }
  getTimeCheckLogOut(): Date {
    if (localStorage.getItem('timecheck') != null) {
      const timeCheckLogOut = new Date(this._hashCode.decrypt(localStorage.getItem('timecheck')));
      return timeCheckLogOut;
    } else {
      return new Date();
    }
  }
  setTimeToDateAndChangeTimeZone(date: Date, time: Date ): Date {
    if (date === null || date === undefined) {
      return null;
    } else {
      const dates = new Date(new Date(date.setHours(time.getHours())).setMinutes(time.getMinutes()));
      const dateresult = new Date(dates.getTime() - (dates.getTimezoneOffset() * 60000));
       return dateresult;
    }
    }
    setTimeToDate(date: Date, time: Date ): Date {
      const hour = time.getHours();
      if (date === null || date === undefined) {
        return null;
      } else {
        const dates = new Date(new Date(date.setHours(time.getHours())).setMinutes(time.getMinutes()));
         return dates;
      }
      }
    FromDateToDouble(date: Date): number {
      if (date == null) {
        return null;
      } else {
        const dateDouble: number = date.getTime() - new Date(1970, 0, 1).getTime();
        return dateDouble / 1000;
      }
    }
    FromDoubleToDate(date: number): Date {
      if (date == null) {
        return null;
      } else {
        const dateTime: Date = new Date(new Date(1970, 0, 1).setSeconds(date));
        return dateTime;
      }
    }
  getListQuyen(): Menu[] {
    if (localStorage.getItem('listQuyen') != null) {
      const listQuyen =  JSON.parse(this._hashCode.decrypt(localStorage.getItem('listQuyen')));
      return listQuyen;
    } else {
      return [];
    }
  }
  getUser(): IUser {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user'))) as IUser;
      return user;
    } else {
      return {} as IUser;
    }
  }
  getUserFullName(): string {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user')));
      return user.FullName;
    } else {
      return '';
    }
  }
  getUserId(): number {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user')));
      return user.Id;
    } else {
      return -1;
    }
  }
  getPermissionUser() {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user'))) as IUser;
      return user.Permission;
    } else {
      return 4;
    }
  }
  getCompanyUser() {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user'))) as IUser;
      return user.CompanyIdDefault;
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
      this.toastr.error('Gặp lỗi khi tải thông tin công ty của bạn, Vui lòng đăng nhập lại!');
      return -1;
    }
  }
  getCongtys() {
    if (localStorage.getItem('congty') != null) {
      const congtys = JSON.parse(this._hashCode.decrypt(localStorage.getItem('congty')));
      return congtys;
    } else {
      return [];
    }
  }
  getDepartmentUser() {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(this._hashCode.decrypt(localStorage.getItem('user'))) as IUser;
      return user.DepartmentId;
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
      this.toastr.error('Gặp lỗi khi tải thông tin công ty của bạn, Vui lòng đăng nhập lại!');
      return -1;
    }
  }
  getValueUserLogin(): UserLogin {
    this.userlogin = {
      Id: this.getUserId(),  groupId: this.readDataTokenGroupRoleId(), departmentId: this.getDepartmentUser(),
      nestId: this.getDepartmentUser(), rankrole: this.getPermissionUser(), fullName: this.getUserFullName()
    };
    return this.userlogin;
  }
  getDefaultCompanyId() {
    if (localStorage.getItem('companyIdDefault') === null || localStorage.getItem('companyIdDefault') === undefined) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
      this.toastr.error('Gặp lỗi khi tải thông tin công ty của bạn, Vui lòng đăng nhập lại!');
      return -1;
    } else {
      const companyId = Number(this._hashCode.decrypt(localStorage.getItem('companyIdDefault')));
      return companyId;
    }
  }
      /** Đọc dữ liệu token */
      readDataTokenGroupRoleId(): number {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        const data = jwtHelper.decodeToken(token);
        if (data) {
          const user = JSON.parse(data.User);
          if (user) {
            return Number(user.GroupRoleId);
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
    /** Đọc dữ liệu token */
    readDataTokenCompanyId(): number {
      const token = localStorage.getItem('token');
      // Check whether the token is expired and return
      // true or false
      const data = jwtHelper.decodeToken(token);
      if (data) {
        const user = JSON.parse(data.User);
        if (user) {
          return Number(user.CompanyId);
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  getMenuId(url) {
    if (localStorage.getItem('listQuyen') != null) {
      const listMenu = JSON.parse(this._hashCode.decrypt(localStorage.getItem('listQuyen')));
      const MenuId = listMenu.filter(item => item.RouterLink === url)[0].Id;
      return MenuId;
    } else {
      return '/';
    }
  }
    // update
    replaceUrlImage(url): string {
      if (url === null) {
        url = 'assets/logo/picture-size.svg';
        return url;
      }
      url = url.split('\\').join('/');
      return this._baseUrl.baseUrl + url;
    }
        // update
        showNameMenu(Name) {
          this.nameMenu.next(Name);
        }
}
