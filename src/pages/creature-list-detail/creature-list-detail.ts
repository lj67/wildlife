import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingsForCreaturePage } from '../sightings-for-creature/sightings-for-creature';
import { ImagesForCreaturePage } from '../images-for-creature/images-for-creature';
import { SightingsForCreatureStatsPage } from '../sightings-for-creature-stats/sightings-for-creature-stats';
import { FlightTimesPage } from '../flight-times/flight-times';

/**
 * Generated class for the CreatureListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-creature-list-detail',
  templateUrl: 'creature-list-detail.html',
})
export class CreatureListDetailPage {

  creature;
  descriptionMaxLength = 200;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider) {

    this.creature = navParams.get('creature');
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CreatureListDetailPage');
  }

  viewStats(creature){

    this.navCtrl.push(SightingsForCreatureStatsPage, {
      creature: creature
    });

  }

  viewSightings(creature){

    this.navCtrl.push(SightingsForCreaturePage, {
      creature: creature
    });

  }

  viewImages(creature){
    this.navCtrl.push(ImagesForCreaturePage, {
      creature: creature
    });
  }

  viewFlight(creature){
    this.navCtrl.push(FlightTimesPage, {
      creature: creature
    });
  }

}
