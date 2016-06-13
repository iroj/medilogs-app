import { Alert, NavController, Loading } from 'ionic-angular';
import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { Auth } from '../../providers/auth/auth';
import { Global } from '../../providers/global/global';
import { TabsPage } from '../tabs/tabs';
@Component({
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
    this.loading = Loading.create({
      content: 'Logging in'
    });

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
      this.nav.present(this.loading);
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
          this.loading.dismiss();
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
    this.nav.present(this.loading);
    this.authService.login(loginCred).subscribe(
      data => {
        this.loading.dismiss();

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
