import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { UserInfo } from '../models/shared/signalrealtime/userinfo.interface';
import {  HubConnection } from '@aspnet/signalr';
import { UserNhanThongBao } from '../models/usernhantb.interface';
import { CommonService } from '../common/common.service';
import { BaseUrlService } from '../common/base-url.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRealTimeService {
  userlgId = this._common.getUserId();
  messageReceived = new EventEmitter<string>();
  connectionEstablished = new EventEmitter<Boolean>();
  private hubConnection: HubConnection;
  connectionId: string;
  private newPeer = new Subject<UserInfo>();
  public newPeer$ = this.newPeer.asObservable();
  private helloAnswer = new Subject<UserInfo>();
  public helloAnswer$ = this.helloAnswer.asObservable();
  usergetTb: UserNhanThongBao[] = [];
  private disconnectedPeer = new Subject<UserInfo>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();
  private connectionIsEstablished = false;
  private signal = new Subject<NotifyContent>();
  public signal$ = this.signal.asObservable();
  private typeflow = new Subject<number[]>();
  public typeflow$ = this.typeflow.asObservable();
  constructor(
    private _common: CommonService
  ) {
    this.createConnection();
  }
  private async createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + 'signalrtc')
      .build();

    await this.hubConnection
      .start()
      .then(() => this.getConnectionId())
      .catch(err => console.log('Error while starting connection: ' + err));
    this.hubConnection.on('SendSignal', (data: NotifyContent) => {
      this.signal.next(data);
    });
    this.hubConnection.on('SenNotifySign', (data: number[]) => {
      this.typeflow.next(data);
    });
  }
  // public async startConnection(): Promise<void> {

  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('http://localhost:63893/signalrtc')
  //     .build();

  //   await this.hubConnection.start();
  //   console.log('Connection started');

  //   this.hubConnection.on('NewUserArrived', (data) => {
  //     this.newPeer.next(JSON.parse(data));
  //   });

  //   this.hubConnection.on('SendActionToClient', (data) => {
  //     this.helloAnswer.next(JSON.parse(data));
  //   });

  //   this.hubConnection.on('UserDisconnect', (data) => {
  //     this.disconnectedPeer.next(JSON.parse(data));
  //   });
  //   this.hubConnection.on('SendData', (data: any) => {
  //     this.signal.next(data);
  //     this.messageReceived.emit(data);
  //   });
  // }
  public getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid', this.userlgId.toString()).then(
      (data) => {
        console.log(data);
        this.connectionId = data;
      }
    );
  }
  sendDataSignal(value: string) {
    this.hubConnection.invoke('SendData', value, this.connectionId);
  }
  GetNguoiNhanThongBao(users) {
    if (users !== undefined) {
      if (users !== '') { // khi users khác '' thì mới convert to string
        this.sendDataSignal(JSON.stringify(users));
      } else {
        this.sendDataSignal(users);
      }
    }
  }
}
export class NotifyContent {
  tenNguoiGui: string;
  noiDung: string;
  trangThai: string;
  ngay: Date;
}
