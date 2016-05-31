import { Page, NavController } from 'ionic-angular';
import { LabEncounterPage } from '../lab-encounter/lab-encounter';
import { ClinicEncounterPage } from '../clinic-encounter/clinic-encounter';
import { LabEvaluationPage } from '../lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from '../clinic-evaluation/clinic-evaluation';
/*
  Generated class for the DocumentsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/documents/documents.html',
})
export class DocumentsPage {
  static get parameters() {
    return [
      [NavController]
    ];
  }

  constructor(nav) {
    this.nav = nav;
    this.encounterList = [{ title: 'Lab Encounter', icon: 'flask', component: LabEncounterPage }, { title: 'Clinic Encounter', icon: 'medkit', component: ClinicEncounterPage }]
    this.evaluationList = [{ title: 'Lab Evaluation', icon: 'card', component: LabEvaluationPage }, { title: 'Clinic Evaluation', icon: 'clipboard', component: ClinicEvaluationPage }]
  }

  openPage(page) {
    console.log(page);
    this.nav.push(page);

  }
}
