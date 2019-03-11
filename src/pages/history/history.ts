import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingExtraDetailPage } from '../sighting-extra-detail/sighting-extra-detail';

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

    sightings: any[] = [];
    modal;
    loadingIndicator;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    
    this.getSightings();
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting sightings...'
    });
    await this.loadingIndicator.present();
  }

  getSightings(){
    this.presentLoading();
    this.wildlifeProvider.getSightings().subscribe(
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

  viewInfo(sighting){
    this.modal = this.modalCtrl.create(SightingExtraDetailPage,{sightings: sighting, mode: 2});
    this.modal.present();
  }

}
