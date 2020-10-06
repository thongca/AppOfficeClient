import { BaseUrlService } from './../../common/base-url.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { HashCodeService } from '../../common/hashCode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  User = {
    Username: '',
    Password: ''
  };
  public loading = false;
  // khai báo string
  errormodal: string;
  modeltitle: string;
  constructor(
    private login: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private _hashCode: HashCodeService,
  ) {
  }
  ngOnInit() {
    if (localStorage.getItem('token') !== null || localStorage.length !== 0) {
      this.router.navigateByUrl('/trangchu');
    }
  }

  QuenMatKhau() {
    this.toastr.info('Vui lòng liên hệ với quản trị viên, để được cấp lại mật khẩu!', 'Thông báo');
  }
  LoginClick() {
    this.loading = true;
    if (this.User.Password === '' || this.User.Password === null || this.User.Username === '' || this.User.Username === null) {
      this.toastr.error('Tên đăng nhập hoặc mật khẩu không được để trống. Vui lòng kiểm tra lại!', 'Thông báo');
      this.loading = false;
      return false;
    }
    this.login.CheckLogin(this.User).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        if (res !== undefined) {

          if (res['error'] === 1) {
            this.errormodal = res['ms'];
            this.toastr.warning(res['ms'], 'Thông báo');
            return false;
          } else if (res['error'] === 2) {
            this.toastr.warning(res['ms'], 'Thông báo');
            this.errormodal = res['ms'];
            return false;
          } else {
            const dt = new Date();
            localStorage.setItem('listQuyen', this._hashCode.encrypt(JSON.stringify(res._listQuyen)));
            localStorage.setItem('listNhomQuyen', this._hashCode.encrypt(JSON.stringify(res._listNhomQuyen)));
            localStorage.setItem('user', this._hashCode.encrypt(JSON.stringify(res.u)));
            localStorage.setItem('groupUserId', res.u.GroupRoleDeFault);
            localStorage.setItem('congty', this._hashCode.encrypt(JSON.stringify(res.congTys)));
            localStorage.setItem('companyIdDefault', this._hashCode.encrypt(JSON.stringify(res.u.CompanyIdDefault)));
            localStorage.setItem('token', res.token);
            localStorage.setItem('listMenu', JSON.stringify(res.data));
            localStorage.setItem('keyc', this._hashCode.encrypt(JSON.stringify(res.congTys)));
            dt.setHours(dt.getHours() + 8).toString();
            localStorage.setItem('timecheck', this._hashCode.encrypt(dt.toString()));
            this.toastr.success('Đăng nhập thành công', 'Thông báo');
            this.router.navigateByUrl('/trangchu');
          }
        } else {
          this.toastr.warning('Tài khoản hoặc mật khẩu không chính xác, Vui lòng kiểm tra lại!', 'Thông báo');
          return false;
        }
      },
      err => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        if (err.status === 500) {
          this.toastr.error('Mất kết nối máy chủ, vui lòng kiểm tra lại đường dẫn!', 'Thông báo');
          return false;
        } if (err.status === 502) {
          this.toastr.error('Không có phản hồi từ máy chủ hoặc mất kết nối tới máy chủ, vui lòng kiểm tra lại đường dẫn!', 'Thông báo');
          return false;
        }
      }
    );
  }
}
