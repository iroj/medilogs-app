import { Alert, NavController, Loading, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Data } from '../../providers/data/data';
import { Global } from '../../providers/global/global';
import { ChartsPage } from '../charts/charts'
/*
  Generated class for the AnalysisPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/analysis/analysis.html',
})
export class AnalysisPage {
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
    this.global = global;
  }

  ionViewDidEnter() {
    this.loading = Loading.create({
      content: 'Fetching Evaluations'
    });
    this.nav.present(this.loading);
    this.dataService.getAnalysis(this.global.getUser()).subscribe(
      data => {
        this.loading.dismiss();
        if (data.evaluations) {
          this.evaluations = data.evaluations;
          console.log(this.evaluations)
        } else {
          let alert = Alert.create({
            title: 'Error',
            subTitle: data.msg,
            buttons: ['Dismiss']
          });
          this.nav.present(alert);
          console.log(data)
        }
      })
  }

  showAnalysis(item) {
    this.nav.push(ChartsPage, { data: item })
  }
}
