import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';
import { SightingExtraDetailPage } from '../sighting-extra-detail/sighting-extra-detail';

/**
 * Generated class for the SightingsForCreaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sightings-for-creature',
  templateUrl: 'sightings-for-creature.html',
})
export class SightingsForCreaturePage {

  loadingIndicator;
  sightings: any[] = [];
  creature: Creature;
  filter: string;
  month: 0;
  year: 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.creature = navParams.get('creature');
      this.filter = navParams.get('filter');
      this.month = navParams.get('month');
      this.year = navParams.get('year');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingsForCreaturePage');
    this.getSightings();
  }

  getSightings(){
    this.presentLoading();
    this.wildlifeProvider.getSightingsForCreature(this.creature.id).subscribe(
      (sightings: any[]) => {
          this.sightings = sightings;
          console.log(sightings);
          if (this.filter && this.filter == "month"){
            this.filterByMonth(this.month);
          }
          else if (this.filter && this.filter == "year"){
            this.filterByYear(this.year);
          }
          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  filterByMonth(month){

    let filtered = [];

    this.sightings.forEach(sighting => {
      if (sighting.trip.date.split("-")[1] == month){
        filtered.push(sighting);
      }
    });

    this.sightings = filtered;

  }

  filterByYear(year){

    let filtered = [];

    this.sightings.forEach(sighting => {
      if (sighting.trip.date.split("-")[0] == year){
        filtered.push(sighting);
      }
    });

    this.sightings = filtered;

  }
  
  getTotalSightings(){
    let total  = 0;
    this.sightings.forEach(sighting => {
      total += sighting.total;
    });

    return total;
  }

  getTotalSightingsForYear(){
    let total  = 0;
    this.sightings.forEach(sighting => {
      if (new Date().getFullYear() == new Date(sighting.trip.date).getFullYear()){
        total += sighting.total;
      }
      
    });

    return total;
  }

  getCurrentYear(){
    return new Date().getFullYear();
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting sightings...'
    });
    await this.loadingIndicator.present();
  }

  viewInfo(sighting){
    this.navCtrl.push(SightingExtraDetailPage, {
      sightings: sighting,
      mode: 3
    });
  }

}
