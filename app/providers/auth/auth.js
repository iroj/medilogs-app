// import { Storage, LocalStorage } from 'ionic-angular';
// import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// // Avoid name not found warnings
// // declare var Auth0Lock:any;


// @Injectable()
// export class Auth {
//   constructor() {
//     this.authHttp = AuthHttp;
//     this.jwtHelper = new JwtHelper();
//     this.lock = new Auth0Lock('zTcQcD0rb48nBKSqtQWPGEYmMTSB0hBB', 'iroj.auth0.com');
//     this.local = new Storage(LocalStorage);
//     this.user = Object;
//     // If there is a profile saved in local storage
//     this.local.get('profile').then(profile => {
//       this.user = JSON.parse(profile);
//     }).catch(error => {
//       console.log(error);
//     });
//   }

//   authenticated() {
//     // Check if there's an unexpired JWT
//     return tokenNotExpired();
//   }

//   login() {
//     // Show the Auth0 Lock widget
//     this.lock.show({
//       authParams: {
//         scope: 'openid offline_access',
//         device: 'Mobile device'
//       }
//     }, (err, profile, token, accessToken, state, refreshToken) => {
//       if (err) {
//         alert(err);
//       }
//       // If authentication is successful, save the items
//       // in local storage
//       this.local.set('profile', JSON.stringify(profile));
//       this.local.set('id_token', token);
//       this.local.set('refresh_token', refreshToken);
//       this.user = profile;
//     });
//   }

//   logout() {
//     this.local.remove('profile');
//     this.local.remove('id_token');
//     this.local.remove('refresh_token');
//     this.user = null;
//   }
// }
