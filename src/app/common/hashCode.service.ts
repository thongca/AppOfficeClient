import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// url service
@Injectable({
  providedIn: 'root'
})
export class HashCodeService {
 private secretKey = '*&^^&*';
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  decrypt(textToDecrypt: string) {
    try {
      return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '';
    }
  }
}
