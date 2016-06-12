import { Page, Alert, NavController } from 'ionic-angular';
import { FORM_DIRECTIVES } from '@angular/common';
import { Auth } from '../../providers/auth/auth';
import { Global } from '../../providers/global/global';
import { TabsPage } from '../tabs/tabs';
@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})
export class LoginPage {
  static get parameters() {
    return [
      [NavController],
      [Auth],
      [Global]
    ];
  }

  constructor(nav, authService, global) {
    this.nav = nav;
    this.authService = authService;
    this.global = global;
    this.TabsPage = TabsPage;
  }

  logout() {
    this.authService.logout();
  }

  signup(userCred) {
    if (!userCred.userName || !userCred.password || !userCred.email || !userCred.fullName) {
      let alert = Alert.create({
        title: 'Please complete the form',
        buttons: ['Dismiss']
      });
      this.nav.present(alert);
    } else {
      let user = {
        userName: userCred.userName,
        password: userCred.password,
        email: userCred.email,
        faculty: userCred.faculty || false,
        stayConnected: userCred.stayConnected || true,
        fullName: userCred.fullName
      }
      console.log(user);

      this.authService.signup(user).subscribe(
        data => {
          if (data.user) {
            this.global.setUser(data.user)
            this.nav.push(this.TabsPage);
          } else {
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
  login(loginCred) {
    console.log(loginCred);
    this.authService.login(loginCred).subscribe(
      data => {
        if (data.user) {
          this.global.setUser(data.user)
          this.nav.push(this.TabsPage);
        } else {
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
