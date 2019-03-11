import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Sightings } from '../../objects/sightings';

import { SightingExtraDetailPage } from '../sighting-extra-detail/sighting-extra-detail';
import { Sighting } from '../../objects/sighting';

/**
 * Generated class for the SightingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sighting-detail',
  templateUrl: 'sighting-detail.html',
})
export class SightingDetailPage {

  creatures: any[] = [];
  classId: number;
  sightings: Sightings = new Sightings;
  modal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController) {

    this.classId = navParams.get('classId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingDetailPage');

    this.getCreatures();
  }

  getCreatures(){
    this.wildlifeProvider.getCreaturesForClass(this.classId).subscribe(
      (creatures: any[]) => {
          this.creatures = creatures;
          console.log(creatures);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  canSave(){
    let canSave = false;
    this.creatures.forEach(creature => {
      if (creature.total > 0){
        canSave = true;
      }
    });

    return canSave;

  }

  addSighting(creature){
    if (creature.total == undefined) creature.total = 0;
    creature.total ++;
  }

  removeSighting(creature){
    if (creature.total > 0) creature.total--;
  }

  addCreaturesToSightings(){
    this.sightings.creatures = [];
    this.creatures.forEach(creature => {
      if (creature.total > 0){
        this.sightings.creatures.push(creature);
      }
    });

  }

  save(){ 
    this.addCreaturesToSightings();
    this.modal = this.modalCtrl.create(SightingExtraDetailPage,{sightings: this.sightings, mode: 1});
    this.modal.present();
    
  }


}
