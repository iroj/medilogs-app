import { NavController, Alert } from 'ionic-angular';
import { Component } from '@angular/core';
import { Data } from '../../providers/data/data';
import { Auth } from '../../providers/auth/auth';
import { Global } from '../../providers/global/global';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'build/pages/accounts/accounts.html'
})
export class AccountsPage {
  static get parameters() {
    return [
      [Data],
      [Auth],
      [NavController],
      [Global]
    ];
  }

  constructor(dataService, authService, nav, global) {

    this.dataService = dataService;
    this.authService = authService;
    this.nav = nav;
    this.global = global;
    this.loginPage = LoginPage;
    this.user = this.global.getUser();
    console.log(this.user);
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
  confirmPassword() {
    let alert = Alert.create({
      title: 'Enter you password',
      inputs: [{
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Login',
        handler: data => {
          if (data.password == this.user.password) {
            this.edit = true;
          } else {

            alert.setTitle("Incorrect Password")
            return false
          }
        }
      }]
    });
    this.nav.present(alert);
  }


  change(user) {

    this.authService.edit(user).subscribe(
      data => {
        if (data.user) {
          console.log(data.user)
          this.global.setUser(data.user)
          this.edit = false;
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
