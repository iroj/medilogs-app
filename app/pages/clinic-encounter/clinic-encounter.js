import { NavController} from 'ionic-angular';
import { Component} from '@angular/core';

/*
  Generated class for the ClinicEvaluationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/clinic-encounter/clinic-encounter.html',
})
export class ClinicEncounterPage  {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
