import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingExtraDetailPage } from '../../pages/sighting-extra-detail/sighting-extra-detail';

/**
 * Generated class for the SightingsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sightings-list',
  templateUrl: 'sightings-list.html'
})
export class SightingsListComponent {

  @Input() sightings : any[] = [];
  @Input() showImage : boolean = true;
  loadingIndicator;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingsForLocationPage');

  }



  viewInfo(sighting){
    this.navCtrl.push(SightingExtraDetailPage, {
      sightings: sighting,
      mode: 3
    });
  }

}
