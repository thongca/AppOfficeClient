import { async } from '@angular/core/testing';
import { CommonService } from './../common/common.service';
import { Menu } from './../common/menu';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../shared/search.service';
import { MenuService } from '../common/menu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private sub: Subscription;
  private listMenu:  Menu[];
  private listMenuFake:  Menu[];
  constructor(
    private _menuService: MenuService,
    private _commonService: CommonService,
    private router: Router,
    private _ssearchService: SearchService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const dt = new Date();
      if (this._commonService.getTimeCheckLogOut() <= dt) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
        return false;
      }
      if (localStorage.getItem('token') != null || localStorage.length !== 0) {
        this._ssearchService.SearchRoot('');
         return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.listMenu =  this._commonService.getListQuyen();
    const dt = new Date();
    if (this._commonService.getTimeCheckLogOut() <= dt) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
    if (this.listMenu.filter(x => x.RouterLink === state.url).length === 0) {
      this.router.navigate(['/trangchu']);
      return false;
    } else {
      this._ssearchService.SearchRoot('');
      return true;
    }
  }
}
