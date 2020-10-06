import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserInfo } from '../models/shared/signalrealtime/userinfo.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  private users: BehaviorSubject<Array<UserInfo>>;
  public users$: Observable<Array<UserInfo>>;
  constructor() { }
}
