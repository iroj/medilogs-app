import { Page, Alert, NavController } from 'ionic-angular';
import { FORM_DIRECTIVES } from '@angular/common';
import { Auth } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})
export class LoginPage {
  static get parameters() {
    return [
      [NavController],
      [Auth]
    ];
  }

  constructor(nav, authService) {
    this.nav = nav;
    this.authService = authService;
    this.TabsPage = TabsPage;
  }

  logout() {
    this.authService.logout();
  }

  signup(userCred) {
    console.log(userCred);
    this.authService.signup(userCred).subscribe(
      data => {
        if (data.user)
          this.nav.push(this.TabsPage);
        else {
          let alert = Alert.create({
            title: 'Error',
            subTitle: data.msg,
            buttons: ['Dismiss']
          });
          this.nav.present(alert);
          console.log(data)
        }
      }
    );
  }

  login(loginCred) {
    console.log(loginCred);
    this.authService.login(loginCred).subscribe(
      data => {
        if (data.user)
          this.nav.push(this.TabsPage);
        else {
          let alert = Alert.create({
            title: 'Error',
            subTitle: data.msg,
            buttons: ['Dismiss']
          });
          this.nav.present(alert);
          console.log(data)
        }
      }
    );
  }
}
