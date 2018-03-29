import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sightings } from '../../objects/sightings';

/**
 * Generated class for the SightingExtraDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sighting-extra-detail',
  templateUrl: 'sighting-extra-detail.html',
})
export class SightingExtraDetailPage {

  sightings: Sightings;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.sightings = navParams.get('sightings');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingExtraDetailPage');
  }

  tempClick(id){
    this.sightings.TempId = id;
  }

  weatherClick(id){
    this.sightings.WeatherId = id;
  }

}
