import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SightingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sighting',
  templateUrl: 'sighting.html',
})
export class SightingPage {

  classes: Observable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingPage');

    this.getClasses();
  }

  getClasses(){
    this.classes = this.wildlifeProvider.getClasses();
  }


}
