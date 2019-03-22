import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-detail',
  templateUrl: 'image-detail.html',
})
export class ImageDetailPage {

  image;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.image = navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDetailPage');
  }

}
