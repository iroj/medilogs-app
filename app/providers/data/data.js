import { Storage, SqlStorage } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {
  constructor() {
    this.storage = new Storage(SqlStorage, { name: 'mediLogs' });
    this.data = null;
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
}
