import { Injectable } from '@angular/core';
//import * as CryptoJS from 'crypto-js';

declare let CryptoJS: any;

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  constructor() { }

  
  getSHA256(value: string) {
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
  }

  //The set method is use for encrypt the value.
  set(keys: string, value: string) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys: string, value: string) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}