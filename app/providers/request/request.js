import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/Operator';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Request {
  static get parameters() {
    return [
      [Http]
    ];
  }
  
  constructor(http) {
    this.http = http;
    this.storage = new Storage(SqlStorage, { name: 'mediLogs' });
    this.headers = new Headers({
      'Content-Type': 'application/json'
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
    let cred = 'userName=' + 'fasdfdsf' + '&password=' + 'password';
    return this.http.post(link, cred, this.options)
      .map(res => res.json())
      .do(res => {
        if (loginCred.stayConnected && res.user) {
          loginCred.id = res.user._id
          this.storage.set('user', JSON.stringify(loginCred));

        }
      })
  };

  submit(apple) {
    console.log(JSON.stringify(apple));
    let link = this.serverAdd + "api/articles";
    return this.http.post(link, JSON.stringify(apple), { headers: this.headers })
      .map(res => res.json())
      .do(res => {
        console.log(res)
      })
  };

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  };
}
