import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the LabEncounterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/lab-encounter/lab-encounter.html',
})
export class LabEncounterPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
