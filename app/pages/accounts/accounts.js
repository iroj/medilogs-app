import { Page,NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data'
import { LoginPage } from '../login/login';


@Page({
  templateUrl: 'build/pages/accounts/accounts.html'
})
export class AccountsPage {
  static get parameters() {
    return [
      [Data],
      [NavController]
    ];
  }

  constructor(dataService, nav) {
    this.dataService = dataService;
    this.nav = nav;
    this.LoginPage = LoginPage;
  }
  logout() {
    this.dataService.remove('user');
    this.nav.push(this.LoginPage);
  }

}
