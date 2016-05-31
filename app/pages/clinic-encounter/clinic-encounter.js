import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ClinicEncounterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/clinic-encounter/clinic-encounter.html',
})
export class ClinicEncounterPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
