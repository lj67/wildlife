import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';

/**
 * Generated class for the ButterflySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-butterfly-search',
  templateUrl: 'butterfly-search.html',
})
export class ButterflySearchPage {

  private butterflyForm : FormGroup;
  loadingIndicator;
  creatures: Creature[] = [];
  creatureFilter = new Creature;

  colors = ["Red", "Orange", "Yellow", "Blue", "Purple", "Green", "Brown", "Black", "White"];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder,public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.creatureFilter.size = "";

      this.butterflyForm = this.formBuilder.group({
        color1: ['', Validators.required],
        color2: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ButterflySearchPage');

    this.getButterflys();
  }

  getButterflys(){
    this.presentLoading();
    this.wildlifeProvider.getCreaturesForClass(1).subscribe(
      (creatures: any[]) => {
          this.creatures = creatures;
          console.log(creatures);

          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
          this.loadingIndicator.dismiss();
      })
  }

  setSize(size){
    this.creatureFilter.size = size;
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting sightings...'
    });
    await this.loadingIndicator.present();
  }

}
