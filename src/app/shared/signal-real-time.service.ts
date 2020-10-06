import { async } from '@angular/core/testing';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { UserInfo, SignalInfo } from '../models/shared/signalrealtime/userinfo.interface';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { UserNhanThongBao } from '../models/usernhantb.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalRealTimeService {
  messageReceived = new EventEmitter<string>();
  connectionEstablished = new EventEmitter<Boolean>();
  private hubConnection: HubConnection;

  private newPeer = new Subject<UserInfo>();
  public newPeer$ = this.newPeer.asObservable();

  private helloAnswer = new Subject<UserInfo>();
  public helloAnswer$ = this.helloAnswer.asObservable();
  usergetTb: UserNhanThongBao[] = [];
  private disconnectedPeer = new Subject<UserInfo>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();
  private connectionIsEstablished = false;
  private signal = new Subject<string>();
  public signal$ = this.signal.asObservable();
  constructor(
  ) {
    this.createConnection();
  }
  private async createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:63893/signalrtc')
      .build();

      await this.hubConnection.start();
      this.hubConnection.on('SendSignal', (data: any) => {
            this.signal.next(data);
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
  sendDataSignal(value: string) {
    this.hubConnection.invoke('SendData', value);
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
