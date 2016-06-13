import { NavController, Alert, Loading } from 'ionic-angular';
import { Component} from '@angular/core';
import { Data } from '../../providers/data/data';
import { Auth } from '../../providers/auth/auth';
import { FORM_DIRECTIVES } from '@angular/common';
import { Global } from '../../providers/global/global';
import * as _ from 'lodash';
/*
  Generated class for the ClinicEncounterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/clinic-evaluation/clinic-evaluation.html',
  directives: [FORM_DIRECTIVES]
})

export class ClinicEvaluationPage {
  static get parameters() {
    return [
      [NavController],
      [Data],
      [Auth],
      [Global]
    ];
  }

  constructor(nav, dataService, authService, global, form) {
    this.nav = nav;
    this.authService = authService;
    this.dataService = dataService;
    this.global = global;
    this.faculty = this.global.getUser();
    console.log(this.faculty);
    this.searchQuery = '';
    this.initializeItems();
    this.loading = Loading.create({
      content: 'Submitting Evaluation'
    });

  }

  initializeItems() {
    this.dataService.getStudents().subscribe(
      data => {
        if (data.students) {
          console.log(data.students);
          this.students = data.students;
          this.studentNames = _.map(data.students, function(s) {
            return s.fullName
          })
          console.log(this.students)
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
  submit(data) {
    if (!data.date || !data.clinic || !data.encounter) {
      let alert = Alert.create({
        title: 'Please complete the form',
        buttons: ['Dismiss']
      });
      this.nav.present(alert);
    } else {
      this.nav.present(this.loading);
      this.eval = {
        date: data.date,
        clinicType: data.clinic,
        encounterType: data.encounter,
        performance: {
          cchpi: +data.cc_hpi || 5,
          history: +data.history || 5,
          entrance: +data.entrance || 5,
          slit: +data.slit || 5,
          iop: +data.iop || 5,
          fundus: +data.fundus || 5,
          anp: +data.anp || 5
        },
        special: {
          atlas: +data.atlas || 0,
          bscan: +data.bscan || 0,
          fdt: +data.fdt || 0,
          gonio: +data.gonio || 0,
          hvf: +data.hvf || 0,
          moct: +data.moct || 0,
          ovf: +data.ovf || 0,
          onoct: +data.onoct || 0,
          optos: +data.optos || 0,
          orbscan: +data.orbscan || 0,
          pachymeter: +data.pachymeter || 0,
          spectralis: +data.spectralis || 0,
          visucam: +data.visucam || 0,
          zeiss: +data.zeiss || 0
        },
        student: this.selectedStudent,
        faculty: this.faculty

      };
      // console.log(this.eval)
      this.authService.submit(this.eval).subscribe(
        data => {
          this.nav.pop();
          this.loading.dismiss();
        })

    }
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.value;
    console.log(q);
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }
    this.filteredStudents = this.studentNames.filter((v) => {
      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
  onCancel(searchbar) {
    this.filteredStudents = [];
  }
  selectStudent(student) {
    this.filteredStudents = [];
    this.selectedStudent = _.find(this.students, function(o) {
      return o.fullName === student;
    });
    console.log(this.selectedStudent);
  }

}
