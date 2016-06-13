import { Component} from '@angular/core';
import { AccountsPage } from '../accounts/accounts';
import { DocumentsPage } from '../documents/documents';
import { AnalysisPage } from '../analysis/analysis';
import { Data } from '../../providers/data/data';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [
      [Data]
    ];
  }
  constructor(dataService) {
    this.dataService = dataService;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.documents = DocumentsPage;
    this.accounts = AccountsPage;
    this.analysis = AnalysisPage;

    
  }
}
