import { App, Platform, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import {NgZone} from '@angular/core';
import { TabsPage } from './pages/tabs/tabs';
import { SettingsPage } from './pages/settings/settings';
import { ClinicEncounterPage } from './pages/clinic-encounter/clinic-encounter';
import { LabEncounterPage } from './pages/lab-encounter/lab-encounter';
import { LabEvaluationPage } from './pages/lab-evaluation/lab-evaluation';
import { ClinicEvaluationPage } from './pages/clinic-evaluation/clinic-evaluation';
import { SignUpPage } from './pages/sign-up/sign-up';
import {Data} from './providers/data/data';

@App({
  templateUrl: 'build/app.html',
  config: {
    iconMode: 'md',
    menuType: 'push'
  }, 
  providers: [Data]
})

export class MyApp {
  static get parameters() {
    return [
      [IonicApp],
      [Platform],
      [MenuController],
      [Data],
      [NgZone]
    ];
  }
  constructor(app, platform, menu, dataService, zone) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.dataService = dataService;
    this.zone = zone;
    this.initializeApp();
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      { title: 'Lab Encounter', icon: 'flask', component: LabEncounterPage },
      { title: 'Clinic Encounter', icon: 'medkit', component: ClinicEncounterPage },
      { title: 'Lab Evaluation', icon: 'card', component: LabEvaluationPage },
      { title: 'Clinic Evaluation', icon: 'clipboard', component: ClinicEvaluationPage }
    ];
    this.dataService.getData().then((data) => {
     let user = JSON.parse(data);
     console.log(user);
     console.log(data);
      if (user.user) {
        this.zone.run(() => {
          console.log(JSON.parse(data));
          // this.items = JSON.parse(user);
          this.rootPage = TabsPage;
        });
      } else {
        this.rootPage = SignUpPage;
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
    });
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.rootPage = page;
  }
}
