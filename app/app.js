import { Component, provide, Type } from '@angular/core';
import { Platform, App, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { SettingsPage } from './pages/settings/settings';
import { ClinicEncounterPage } from './pages/clinic-encounter/clinic-encounter';
import { LabEncounterPage } from './pages/lab-encounter/lab-encounter';
import { LabEvaluationPage } from './pages/lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from './pages/clinic-evaluation/clinic-evaluation';
import { Http, Headers, RequestOptions, JSONP_PROVIDERS, Jsonp } from '@angular/http';

import { Data } from './providers/data/data';
import { Auth } from './providers/auth/auth';
import { Global } from './providers/global/global';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts'

@Component({
  templateUrl: 'build/app.html',
})

export class MyApp {
  static get parameters() {
    return [
      [App],
      [Platform],
      [Data],
      [Auth],
      [Global]
    ];
  }
  constructor(app, platform, dataService, authService, global) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.dataService = dataService;
    this.authService = authService;
    this.global = global;
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsPage },
      { title: 'Clinic Evaluation', icon: 'clipboard', component: ClinicEvaluationPage }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.global.setServer('http://localhost:3000/');
      this.global.setServer('https://medilogs.herokuapp.com/');
      console.log(this.global.getServer());
      this.dataService.getData('user').then(user => {
        if (user) {
          this.global.setUser(JSON.parse(user));
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
ionicBootstrap(MyApp, [Data,
  Auth,
  Global,
  JSONP_PROVIDERS,
  CHART_DIRECTIVES
], {
  tabbarPlacement: 'bottom',
  iconMode: 'md',
  menuType: 'push'
});
