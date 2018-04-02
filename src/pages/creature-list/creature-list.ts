import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';

/**
 * Generated class for the CreatureListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creature-list',
  templateUrl: 'creature-list.html',
})
export class CreatureListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreatureListPage');

        this.getCreatures();
    }

    getCreatures(){

    }



}
