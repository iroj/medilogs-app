import { Storage, SqlStorage } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../global/global';

import 'rxjs/add/operator/map';
import 'rxjs/Operator';
@Injectable()
export class Data {
  static get parameters() {
    return [
      [Http],
      [Global]
    ];
  }
  constructor(http, global) {
    this.storage = new Storage(SqlStorage, { name: 'mediLogs' });
    this.data = null;
    this.http = http;
    this.global = global;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });

  }

  getData(item) {
    return this.storage.get(item);
  }
  save(item, data) {
    let newData = JSON.stringify(data);
    this.storage.set(item, newData);
  }
  remove(item) {
    this.storage.remove(item);
  }

  getStudents() {
    let link = this.global.getServer() + "api/getStudents";
    console.log('getting students')
    return this.http.get(link, this.options)
      .map(res => res.json())
      .do(res => {
        console.log(res)
      })
  }


  getAnalysis(user) {
    let link = ''
    console.log(user);
    if (user.faculty === false) {
      link = this.global.getServer() + 'api/studentEvaluations';
    } else {
      link = this.global.getServer() + 'api/facultyEvaluations';
    }
    console.log(link);
    return this.http.post(link, JSON.stringify(user), this.options)
      .map(res => res.json())
      .do(res => {
        console.log(res)

      })
  }



}
