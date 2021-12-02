import { Injectable } from '@angular/core';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:any;

  constructor() { }
  public test(){
    //SecureStoragePlugin.set();
    //const message, nonce, path, privateKey; // ...
    //const hashDigest = sha256(nonce + message);
    //const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  }
  public isLogged():boolean{
    if(this.user) return true; else return false;
  }
}
