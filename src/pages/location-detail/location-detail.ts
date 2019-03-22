import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Location } from '../../objects/location';
import { SightingsForLocationPage } from '../sightings-for-location/sightings-for-location';
import { SightingsForCreatureStatsPage } from '../sightings-for-creature-stats/sightings-for-creature-stats';
import { ImagesForCreaturePage } from '../images-for-creature/images-for-creature';
import { FlightTimesPage } from '../flight-times/flight-times';
import { CreatureListDetailPage } from '../creature-list-detail/creature-list-detail';
import { LocationStatsPage } from '../location-stats/location-stats';
import { MapPage } from '../map/map';
import { LocationEditPage } from '../location-edit/location-edit';


/**
 * Generated class for the LocationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  location: Location;
  locationStats = {creatures: []};
  mapModal;
  locationModal;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController) {

    this.location = navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetailPage');
    this.getLocationStats();
  }

  viewMap(location){
    this.mapModal = this.modalCtrl.create(MapPage,{location: this.location});
    this.mapModal.present();
  }

  getLocationStats(){
    this.wildlifeProvider.getLocationStats(this.location.id).subscribe(
      (stats: any[]) => {
          this.locationStats = stats[0];
          console.log(stats);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  viewStats(){

    this.navCtrl.push(LocationStatsPage, {
      locationStats: this.locationStats
    });

  }

  viewSightings(location){

    this.navCtrl.push(SightingsForLocationPage, {
      location: location
    });

  }

  viewImages(creature){
    this.navCtrl.push(ImagesForCreaturePage, {
      creature: creature
    });
  }

  viewCreature(creature, e){
    e.stopPropagation();
    this.navCtrl.push(CreatureListDetailPage, {
      creature: creature
    });
  }

  showEditModal(location){

    this.locationModal = this.modalCtrl.create(LocationEditPage,{location: location});
    this.locationModal.present();

    this.locationModal.onDidDismiss(data => {
      console.log(data);
      if (data){
        this.location = data.location;
      }
      
    });
  }

}
