import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectlenhsharedService {
  private listCommands = new Subject<any>();
  public listCommands$ = this.listCommands.asObservable();
  private reloadListMyWorks = new Subject<boolean>();
  public reloadListMyWorks$ = this.reloadListMyWorks.asObservable();
  constructor(
    private _apiService: ApiService,
  ) {

   }
   reloadMyWorkByChangeData() {
    this.reloadListMyWorks.next(true);
   }
  r1_getListLenhs(options) {
    this._apiService.r1_List_Data_Model_General(options, 'api/MyWorkCommon/r1GetListDataLenhTheoUser')
    .subscribe(res => {
      if (res === undefined) {
        return;
      }
      if (res['error'] === 1) {
        return;
      }
      this.listCommands.next(res['data']);
    });
  }
}

