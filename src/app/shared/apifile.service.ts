import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { BaseUrlService } from '../common/base-url.service';
@Injectable({
  providedIn: 'root'
})
export class ApifileService {
  private _baseUrl: string;
  constructor(
    private _baseURLService_: BaseUrlService,
    private http: HttpClient,
  ) {
    this._baseUrl = this._baseURLService_.baseUrl;
   }

    // request file to serve
    r2_addFileModel(files, model, childUrl) {
      const tokenHeader = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      const formData = new FormData();
      let uploadReq;
      // tslint:disable-next-line:max-line-length
      if (files !== null) {
        for (const file of files) {
          formData.append(file.name, file);
        }
      }

      formData.append('model', JSON.stringify(model));
      uploadReq = new HttpRequest('POST', this._baseUrl + childUrl,
      formData, { reportProgress: true, headers: tokenHeader });
      return this.http.request(uploadReq).pipe();
    }
       // request file to serve
       r2_addMulFileModel(files1, files2, model, childUrl) {
        const tokenHeader = new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        const formData = new FormData();
        let uploadReq;
        if (files2 !== null) {
          for (const file of files2) {
            formData.append(file.name, file);
          }
        }
        // tslint:disable-next-line:max-line-length
        if (files1 !== undefined ) {
          for (const file of files1) {
            formData.append(file.name, file);
          }
          formData.append('model', JSON.stringify(model));
          uploadReq = new HttpRequest('POST', this._baseUrl + childUrl,
            formData, { reportProgress: true, headers: tokenHeader });
        } else {
          formData.append('model', JSON.stringify(model));
          uploadReq = new HttpRequest('POST', this._baseUrl + childUrl,
            formData, { reportProgress: true, headers: tokenHeader });
        }
        return this.http.request(uploadReq).pipe();
      }
}
