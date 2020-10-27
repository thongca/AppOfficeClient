import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { BaseUrlService } from '../common/base-url.service';
import { OptionHeader } from '../common/option';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl: string;
  constructor(
    private base: BaseUrlService,
    private http: HttpClient,
  ) {
    this._baseUrl = this.base.baseUrl;
  }
   // GET: lấy thông tin danh sách dữ liệu
   r1_Get_List_Data(url: string) {
    const options_: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(this._baseUrl + url, options_);
  }
   // POST: lấy thông tin danh sách dữ liệu
   r1_Post_List_Data(options: OptionHeader, url: string) {
    const options_: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this._baseUrl + url, options, options_);
  }
  // GET: lấy model theo id truyển vào
  r1_GetDataByID(Id, url) {
    let url_ = this._baseUrl + url + '/' + Id;
    url_ = url_.replace(/[?&]$/, '');
    const options_: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(url_, options_);
  }
    // POST: add dữ liệu
    r1_List_Data_Model_General(model_: object, url) {
      let url_ = this._baseUrl + url;
      url_ = url_.replace(/[?&]$/, '');
      const options_: any = {
        ContentType: 'application/json',
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      return this.http.post(url_, model_, options_);
    }
  // POST: add dữ liệu
  r2_Add_Data_Model(model_: object, url) {
    let url_ = this._baseUrl + url;
    url_ = url_.replace(/[?&]$/, '');
    const options_: any = {
      ContentType: 'application/json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(url_, model_, options_);
  }
  // PUT: Cập nhật Data
  r3_Put_Data(model_, url) {
    let url_ = this._baseUrl + url + '/' + model_.Id;
    url_ = url_.replace(/[?&]$/, '');
    const options_: any = {
      ContentType: 'application/json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(url_, model_, options_);
  }
  // xóa danh sách theo check box
  r4DelListDataForcheckBox(models, url) {
    let url_ = this._baseUrl + url;
    url_ = url_.replace(/[?&]$/, '');
    const options_: any = {
      ContentType: 'application/json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(url_, models, options_);
  }
}
