import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  public baseUrl: string = 'http://localhost:63893/';
}
