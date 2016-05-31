import { App, Platform, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { provide } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { TabsPage } from './pages/tabs/tabs';
import { SettingsPage } from './pages/settings/settings';
import { ClinicEncounterPage } from './pages/clinic-encounter/clinic-encounter';
import { LabEncounterPage } from './pages/lab-encounter/lab-encounter';
import { LabEvaluationPage } from './pages/lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from './pages/clinic-evaluation/clinic-evaluation';

@App({
  templateUrl: 'build/app.html',
  config: {
    iconMode: 'md',
    menuType: 'push'
  },
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig, http);
      },
      deps: [Http]
    })
  ]
})
export class MyApp {
  static get parameters() {
    return [
      [IonicApp],
      [Platform],
      [MenuController]
    ];
  }
  constructor(app, platform, menu) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();
    this.pages = [
      { title: 'Home',icon: 'home', component: TabsPage },
      { title: 'Settings',icon: 'settings' , component: SettingsPage },
      { title: 'Lab Encounter',icon: 'flask' , component: LabEncounterPage },
      { title: 'Clinic Encounter',icon: 'medkit' , component: ClinicEncounterPage },
      { title: 'Lab Evaluation',icon:'card' , component: LabEvaluationPage },
      { title: 'Clinic Evaluation',icon:'clipboard' , component: ClinicEvaluationPage }
    ];
    this.rootPage = TabsPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.rootPage = page;

  }
}
