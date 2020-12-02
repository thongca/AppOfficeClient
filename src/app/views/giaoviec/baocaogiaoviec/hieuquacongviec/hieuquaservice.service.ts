import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { reduce, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RePortKpi } from '../../../../models/giaoviec/hieuquacongviec.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../../../../common/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class HieuquaserviceService {
  listKpis = [];
  constructor(
    private _apiService: ApiService,
    private http: HttpClient,
    private _baseURLService: BaseUrlService,
  ) { }

}
