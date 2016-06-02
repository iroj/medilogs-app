import { Page, Storage, LocalStorage, NavController, Modal, ViewController } from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/accounts/accounts.html'
})
export class AccountsPage {
  static get parameters() {
    return [
      [NavController],
      [Data]
    ];
  }

  constructor(nav, dataService) {
    this.nav = nav;
    this.dataService = dataService;


  }
  logOut() {
    this.dataService.save({});
  }
}
