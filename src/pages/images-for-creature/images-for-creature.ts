import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';

/**
 * Generated class for the ImagesForCreaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-images-for-creature',
  templateUrl: 'images-for-creature.html',
})
export class ImagesForCreaturePage {

  creature;
  loadingIndicator;
  images: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.creature = navParams.get('creature');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesForCreaturePage');

    this.getImages();
  }

  getImages(){
    this.presentLoading();
    this.wildlifeProvider.getImagesForCreature(0,0,0,this.creature.id).subscribe(
      (images: any[]) => {
          this.images = images;
          console.log(images);
          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting images...'
    });
    await this.loadingIndicator.present();
  }

}
