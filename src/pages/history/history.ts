import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

    sightings: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

    this.getSightings();
  }

  getSightings(){
    this.wildlifeProvider.getSightings().subscribe(
      (sightings: any[]) => {
          this.sightings = sightings;
          console.log(sightings);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

}
