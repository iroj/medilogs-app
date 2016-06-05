import { App, Platform, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { provide, Type } from '@angular/core';

import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { SettingsPage } from './pages/settings/settings';
import { ClinicEncounterPage } from './pages/clinic-encounter/clinic-encounter';
import { LabEncounterPage } from './pages/lab-encounter/lab-encounter';
import { LabEvaluationPage } from './pages/lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from './pages/clinic-evaluation/clinic-evaluation';

import { Data } from './providers/data/data';
import { Auth } from './providers/auth/auth';

@App({
    templateUrl: 'build/app.html',
    config: {
      iconMode: 'md',
      menuType: 'push'
    },
    providers: [
      [Data],
      [Auth]
    ]
  })
  // bootstrap(AppComponent, [Data]);
export class MyApp {
  static get parameters() {
    return [
      [IonicApp],
      [Platform],
      [MenuController],
      [Data],
      [Auth]
    ];
  }
  constructor(app, platform, menu, dataService, authService) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.dataService = dataService;
    this.authService = authService;
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      { title: 'Lab Encounter', icon: 'flask', component: LabEncounterPage },
      { title: 'Clinic Encounter', icon: 'medkit', component: ClinicEncounterPage },
      { title: 'Lab Evaluation', icon: 'card', component: LabEvaluationPage },
      { title: 'Clinic Evaluation', icon: 'clipboard', component: ClinicEvaluationPage }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.dataService.save('server', 'http://localhost:3000/');
      this.dataService.save('server', 'https://medilogs.herokuapp.com/');
      this.dataService.getData('user').then(user => {
        console.log(user);
        if (user) {
          this.rootPage = TabsPage;
        } else
          this.rootPage = LoginPage;
      });
    });
  };

  openPage(page) {
    this.menu.close();
    this.rootPage = page;
  }
}
