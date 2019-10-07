import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingDetailPage } from '../sighting-detail/sighting-detail';

/**
 * Generated class for the SightingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sighting',
  templateUrl: 'sighting.html',
})
export class SightingPage {

  classes: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingPage');

    this.getClasses();
  }

  getClasses(){
    this.wildlifeProvider.getClasses().subscribe(
      (classes: any[]) => {
          this.classes = classes;
          console.log(classes);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  viewDetail(classId){
    this.navCtrl.push(SightingDetailPage, {
      classId: classId
    });
  }


}
