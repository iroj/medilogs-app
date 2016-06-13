import { NavController, NavParams } from 'ionic-angular';
import { Component} from '@angular/core';
import * as c3 from 'c3';
/*
  Generated class for the ChartsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/charts/charts.html',
})
export class ChartsPage {
  static get parameters() {
    return [
      [NavController],
      [NavParams]
    ];
  }

  constructor(nav, params) {
    this.nav = nav;
    this.params = params;
    this.detail = this.params.get('data');
    console.log(this.detail);
  }

  ngAfterViewInit() {
    this.performanceData = _.map(this.detail.performance, function(x, y) {
      return x
    })
    this.specialData = _.map(this.detail.special, function(x, y) {
      return x
    })
    this.average = Math.floor(_.reduce(this.performanceData, function(memo, num) {
      return memo + num;
    }, 0) / 7);

    if (this.average >= 8)
      this.color = '#00ee00'
    else if (8 > this.average >= 4)
      this.color = '#0000ee'
    else if (this.average < 4)
      this.color = '#ee0000'
    console.log(this.color)

    this.performanceData.unshift(this.average)
    this.performanceData.unshift('Score')
    this.specialData.unshift('Score')
    this.performanceLabels = _.map(this.detail.performance, function(x, y) {
      return y
    });
    this.specialLabels = _.map(this.detail.special, function(x, y) {
      return y
    });
    this.performanceLabels.unshift('Overall')

    console.log(this.specialData)
    console.log(this.specialLabels);
    var performance = c3.generate({
      bindto: '#performance',
      data: {
        columns: [
          this.performanceData
        ],
        type: 'bar',
        labels: true,
        colors: {
          Score: this.color
        }
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories: this.performanceLabels
        },
        y: {
          min: 0,
          max: 10
        }
      },
      onclick: function(d, i) { console.log("onclick", d, i); },
      onmouseover: function(d, i) { console.log("onmouseover", d, i); },
      onmouseout: function(d, i) { console.log("onmouseout", d, i); }

    });
    var special = c3.generate({
      bindto: '#special',
      data: {
        columns: [
          this.specialData
        ],
        type: 'bar',
        labels: true
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories: this.specialLabels
        },
        y: {
          min: 0,
          max: 1
        }
      },
      onclick: function(d, i) { console.log("onclick", d, i); },
      onmouseover: function(d, i) { console.log("onmouseover", d, i); },
      onmouseout: function(d, i) { console.log("onmouseout", d, i); }

    });
  }
}
