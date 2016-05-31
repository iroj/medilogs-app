import {Page} from 'ionic-angular';
import {AccountsPage} from '../accounts/accounts';
import {DocumentsPage} from '../documents/documents';
import {AnalysisPage} from '../analysis/analysis';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.accounts = AccountsPage;
    this.documents = DocumentsPage;
    this.analysis = AnalysisPage;
  }
}
