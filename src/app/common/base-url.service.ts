import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  public baseUrl: string = 'http://localhost:63893/';
}
// ip backend deploy
// public baseUrl: string = 'http://172.16.10.2:4646/';
