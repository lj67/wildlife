import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';

/**
 * Generated class for the LocationEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-edit',
  templateUrl: 'location-edit.html',
})
export class LocationEditPage {

  private locationForm : FormGroup;
  location;
  locationTypes: any[] = [];
  savingIndicator;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, public viewCtrl: ViewController,
    public wildlifeProvider: WildlifeProvider, public loadingController: LoadingController,
    public toastController: ToastController) {

    this.location = navParams.get('location');

    this.locationForm = this.formBuilder.group({
      name: [this.location.name, Validators.required],
      type: [this.location.typeId, Validators.required],
      latitude: [this.location.latitude],
      longitude: [this.location.longitude],
      description: [''],
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationEditPage');
    this.getLocationTypes();
  }

  getLocationTypes(){
    this.wildlifeProvider.getLocationTypes().subscribe(
      (locationTypes: any[]) => {
          this.locationTypes = locationTypes;
          console.log(locationTypes);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async presentLoading() {
    this.savingIndicator = await this.loadingController.create({
      content: 'Saving...'
    });
    await this.savingIndicator.present();
  }

  async showToast(message, classToAdd){
    
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'center',
      closeButtonText: 'Done',
      cssClass: classToAdd,
      duration: 2000
    });
    toast.present();
  }

  saveToDb(){
    this.presentLoading();
      
    this.wildlifeProvider.saveLocation(this.location).subscribe(
      locationId => {     
          console.log(locationId);
          this.location.id = locationId;
          this.showToast("Location Saved", "toast-success");
          this.savingIndicator.dismiss();
          this.viewCtrl.dismiss({location : this.location});
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }


  save(){
    this.location.name = this.locationForm.value.name;
    this.location.description = this.locationForm.value.description;
    this.location.typeId = this.locationForm.value.type;
    this.location.latitude = this.locationForm.value.latitude;
    this.location.longitude = this.locationForm.value.longitude;

    this.saveToDb();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
