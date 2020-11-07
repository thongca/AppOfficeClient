import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
const _sData = '';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private DataSearch = new Subject<string>();
  public DataSearch$ = this.DataSearch.asObservable();
  constructor() {
  }

  SearchRoot(s: string) {
     this.DataSearch.next(s);
  }
}
