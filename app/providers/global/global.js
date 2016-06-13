import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Global provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {
  static get parameters() {
    return [
      [Http]
    ]
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }
  setUser(user) {
    console.log(user)
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setServer(server) {
    this.server = server;
  }

  getServer() {
    return this.server;
  }

}
