import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/Operator';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../global/global';

@Injectable()
export class Auth {
  static get parameters() {
    return [
      [Http],
      [Global]
    ];
  }

  constructor(http, global) {
    this.http = http;
    this.storage = new Storage(SqlStorage, { name: 'mediLogs' });
    this.global = global;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });

  }

  login(loginCred) {
    let link = this.global.getServer() + "api/getInfo";
    return this.http.post(link, JSON.stringify(loginCred), this.options)
      .map(res => res.json())
      .do(res => {
        if (loginCred.stayConnected && res.user) {
          loginCred = res.user
          this.storage.set('user', JSON.stringify(loginCred));

        }
      })
  };

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  signup(userCred) {
    let link = this.global.getServer() + "api/register";
    return this.http.post(link, JSON.stringify(userCred), this.options)
      .map(res => res.json())
      .do(res => {
        if (userCred.stayConnected && res.user) {
          userCred = res.user
          this.storage.set('user', JSON.stringify(userCred));
        }
      })
  }

  submit(apple) {
    console.log(apple);
    let link = this.global.getServer() + "api/articles";
    return this.http.post(link, JSON.stringify(apple), this.options)
      .map(res => res.json())
      .do(res => {
        console.log(res)
      })
  };

  logout(item) {
    this.storage.remove('user');
  }

  edit(user) {
    console.log(user);
    let link = this.global.getServer() + "api/edit";
    return this.http.post(link, JSON.stringify(user), this.options)
      .map(res => res.json())
      .do(res => {
        console.log(res)
          this.storage.set('user', JSON.stringify(res.user));        
      })
  }
}
