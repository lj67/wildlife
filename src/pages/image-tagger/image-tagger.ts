import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';

/**
 * Generated class for the ImageTaggerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-tagger',
  templateUrl: 'image-tagger.html',
})
export class ImageTaggerPage {

  images: any[] = [];
  isEditMode = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageTaggerPage');

    this.getImages();
  }

  getImages(){
    this.wildlifeProvider.getUploadedImages().subscribe(
      (images: any[]) => {
          this.images = images;
          //console.log(images);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  toggleEditMode(){
    this.isEditMode = !this.isEditMode;
  }

}
