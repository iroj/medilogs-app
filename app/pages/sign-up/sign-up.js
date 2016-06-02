import { Page, NavController } from 'ionic-angular';
import {Data} from '../../providers/data/data';

/*
  Generated class for the SignUpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/sign-up/sign-up.html',
})
export class SignUpPage {
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

  signUp() {
    let data = {
      user: {
        username: 'iroj',
        password: 'gurung'
      }
    }
    this.dataService.save(data);
  }
}
