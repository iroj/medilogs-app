import { Page, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { Global } from '../../providers/global/global';
import { LoginPage } from '../login/login';


@Page({
  templateUrl: 'build/pages/accounts/accounts.html'
})
export class AccountsPage {
  static get parameters() {
    return [
      [Data],
      [NavController],
      [Global]
    ];
  }

  constructor(dataService, nav, global) {
    this.dataService = dataService;
    this.nav = nav;
    this.global = global;
    this.loginPage = LoginPage;
    this.user = this.global.getUser()
  }
  
  logout() {
    this.dataService.remove('user');
    this.nav.pop().then(res => {
      if (res)
        console.log(res)
      else
        this.nav.setRoot(this.loginPage);
    })
  }

}
