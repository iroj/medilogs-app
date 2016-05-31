import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ClinicEvaluationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/clinic-evaluation/clinic-evaluation.html',
})
export class ClinicEvaluationPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
