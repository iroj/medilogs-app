import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/Operator';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Auth {
  static get parameters() {
    return [
      [Http]
    ];
  }

  constructor(http) {
    this.http = http;
    this.storage = new Storage(SqlStorage, { name: 'mediLogs' });

    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    this.storage.get('server').then(server => {
      this.serverAdd = JSON.parse(server);
      console.log(this.serverAdd);
    });
  }

  login(loginCred) {
    let link = this.serverAdd + "api/getInfo";
    let cred = 'userName=' + loginCred.userName + '&password=' + loginCred.password;
    return this.http.post(link, cred, this.options)
      .map(res => res.json())
      .do(res => {
        if (loginCred.stayConnected && res.user) {
          loginCred.id = res.user._id
          this.storage.set('user', loginCred);
        }
      })
  };
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  signup(userCred) {
    let link = this.serverAdd + "api/register";
    let body = 'userName=' + userCred.userName + '&password=' + userCred.password + '&email=' + userCred.email + '&faculty=' + userCred.faculty;
    return this.http.post(link, body, this.options)
      .map(res => res.json())
      .do(res => {
        if (userCred.stayConnected && res.user) {
          userCred.id = res.user._id
          this.storage.set('user', userCred);
        }
      })
  }

  logout(item) {
    this.storage.remove('user');
  }
}
