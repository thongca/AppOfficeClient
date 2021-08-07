import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlService } from '../../common/base-url.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private rootURL = environment.apiUrl;

  constructor(
    private http: HttpClient
    ) {
     }

  CheckLogin(User) {
    return this.http.post(this.rootURL + 'api/login/checkLogin', User);
   }
}
