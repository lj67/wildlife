import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Location } from '@angular/common';
import { LocationDetailPage } from '../location-detail/location-detail';

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: Location[] = [];
  loadingIndicator;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public wildlifeProvider: WildlifeProvider, public loadingController: LoadingController,
    public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');

    this.getLocations();
  }

  getLocations(){
    this.presentLoading();
    this.wildlifeProvider.getLocations().subscribe(
      (locations: any[]) => {
          this.locations = locations;
          console.log(locations);
          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting Data...'
    });
    await this.loadingIndicator.present();
  }

  viewDetail(location, e){
    this.navCtrl.push(LocationDetailPage, {
      location: location
    });
  }

}
