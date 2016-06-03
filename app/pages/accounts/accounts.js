import { Page, Storage, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FORM_DIRECTIVES } from '@angular/common';
@Page({
  templateUrl: 'build/pages/accounts/accounts.html',
  directives: [FORM_DIRECTIVES]
})
export class AccountsPage {
  static get parameters() {
    return [
      [NavController],
      [Data],
      [Http]
    ];
  }

  constructor(nav, dataService, http) {
    this.nav = nav;
    this.dataService = dataService;
    this.http = http;
    this.authenticated = false;

    this.dataService.getData('user').then((data) => {
      if (data) {
        console.log(JSON.parse(data));
        this.authenticated = true;
        this.user = JSON.parse(data);
        console.log(this.user)
      }

    });
  }

  logout() {
    this.authenticated = false;
    this.dataService.remove('user');
  }

  signup(userCred) {
    console.log(userCred);
    //AJAX call to server to register==>
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    // TODO: Encode the values using encodeURIComponent().
    let body = 'userName=' + userCred.userName + '&password=' + userCred.password + '&email=' + userCred.email + '&faculty=' + userCred.faculty;
    this.http.post("http://localhost:3000/api/register", body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
        userCred.id = data.user._id

        if (userCred.stayConnected)
          this.dataService.save('user', userCred);
        else
          this.dataService.remove('user');

        console.log('New User Saved: ', userCred)
        this.user = userCred;
        this.authenticated = true;

      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }

  login(userCred) {
    console.log(user);
    //AJAX call to find user,if found==>(userdata)
    let data = {
      user: userCred
    }
    if (user.stayConnected)
      this.dataService.save('user', data);
    else
      this.dataService.remove('user');
    this.authenticated = true
      //user not found
  }
}
