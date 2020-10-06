import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getDataMenu() {
    const list = JSON.parse(localStorage.getItem('listMenu'));
    return list;
  }

}
