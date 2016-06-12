import { Page, NavController } from 'ionic-angular';
import { LabEncounterPage } from '../lab-encounter/lab-encounter';
import { ClinicEncounterPage } from '../clinic-encounter/clinic-encounter';
import { LabEvaluationPage } from '../lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from '../clinic-evaluation/clinic-evaluation';
import { Data } from '../../providers/data/data';
import { Global } from '../../providers/global/global';

@Page({
  templateUrl: 'build/pages/documents/documents.html',
})
export class DocumentsPage {
  static get parameters() {
    return [
      [NavController],
      [Data],
      [Global]
    ];
  }

  constructor(nav, dataService, global) {
    this.nav = nav;
    this.dataService = dataService;
    this.global = global
    this.encounterList = [{ title: 'Lab Encounter', icon: 'flask', component: LabEncounterPage }, { title: 'Clinic Encounter', icon: 'medkit', component: ClinicEncounterPage }]
    this.evaluationList = [{ title: 'Lab Evaluation', icon: 'card', component: LabEvaluationPage }, { title: 'Clinic Evaluation', icon: 'clipboard', component: ClinicEvaluationPage }]
    this.user= this.global.getUser();

  }

  openPage(page) {
    console.log(page);
    this.nav.push(page);

  }
}
