import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ModalController, NavParams, ToastController, Slides } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { ImageDetailPage } from '../../pages/image-detail/image-detail';
import { Creature } from '../../objects/creature';
import { Trip } from '../../objects/trip';

/**
 * Generated class for the ImageListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-list',
  templateUrl: 'image-list.html'
})
export class ImageListComponent {

  @ViewChild('mySlider') slider:  Slides;
  @Input() images: any[] = [];
  @Input() editMode = false;
  modal;
  slideOpts = {
  };
  creatures: Creature[] = [];
  trips: Trip[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController, public toastController: ToastController) {

      
    
  }

  viewDetail(image){
    this.modal = this.modalCtrl.create(ImageDetailPage,{image: image});
    this.modal.present();
  }

  ngAfterViewInit() {
    if (this.editMode){
      this.getCreatures();
      this.getTrips();
    }
  }

  slideChanged(){
    this.slider.getActiveIndex() ;
  }

  getTrips(){
    this.wildlifeProvider.getTrips().subscribe(
      (trips: any[]) => {
          this.trips = trips;
          console.log(trips);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  updateImage(image){
    this.wildlifeProvider.updateImage(image).subscribe(
      (data: any[]) => {
        this.showToast("Image Details Updated", "toast-success");
          
      },
      err => {
          this.showToast("Errors updating image", "toast-warning");
          console.log(err);
      })
  }

  addImage(image){
    this.wildlifeProvider.addImage(image).subscribe(
      (data: any[]) => {
        this.showToast("Image Details Updated", "toast-success");
          
      },
      err => {
          this.showToast("Errors updating image", "toast-warning");
          console.log(err);
      })
  }

  getCreatures(){
    this.wildlifeProvider.getAllCreatures().subscribe(
      (creatures: any[]) => {
          this.creatures = creatures;
          console.log(creatures);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async showToast(message, classToAdd){
    
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'center',
      closeButtonText: 'Done',
      cssClass: classToAdd,
      duration: 3000
    });
    toast.present();
  }

  save(image){
    if (image.id){
      this.updateImage(image);
    }
    else {
      this.addImage(image);
    }

  }

  

}
