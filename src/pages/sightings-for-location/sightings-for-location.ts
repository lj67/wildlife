import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Location } from '../../objects/location';
import { SightingExtraDetailPage } from '../sighting-extra-detail/sighting-extra-detail';

/**
 * Generated class for the SightingsForLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sightings-for-location',
  templateUrl: 'sightings-for-location.html',
})
export class SightingsForLocationPage {

  loadingIndicator;
  sightings: any[] = [];
  location: Location = new Location;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.location = navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingsForLocationPage');

    this.getSightings();
  }

  getSightings(){
    this.presentLoading();
    this.wildlifeProvider.getSightingsForLocation(this.location.id).subscribe(
      (sightings: any[]) => {
          this.sightings = sightings;
          console.log(sightings);

          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting sightings...'
    });
    await this.loadingIndicator.present();
  }


}
