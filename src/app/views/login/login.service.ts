import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlService } from '../../common/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private rootURL: string;

  constructor(
    private http: HttpClient,
    private baseUrl_: BaseUrlService,
    ) {
      this.rootURL = this.baseUrl_.baseUrl;
     }

  CheckLogin(User) {
    return this.http.post(this.rootURL + 'api/login/checkLogin', User);
   }
}
