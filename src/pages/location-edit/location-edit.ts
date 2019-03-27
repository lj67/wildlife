import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-location-edit',
  templateUrl: 'location-edit.html',
})
export class LocationEditPage {

  @ViewChild('map') mapElement: ElementRef;
  private locationForm : FormGroup;
  location;
  locationTypes: any[] = [];
  savingIndicator;
  map: any;
  marker;
  currentMarker;
  autocompleteService: any;
  placesService: any;
  places: any = [];
  query: string = '';
  searchDisabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, public viewCtrl: ViewController,
    public wildlifeProvider: WildlifeProvider, public loadingController: LoadingController,
    public toastController: ToastController, private geolocation: Geolocation,
    public zone: NgZone,) {

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
    this.loadMap();
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

    if (this.location.id){
      this.wildlifeProvider.updateLocation(this.location).subscribe(
        locationId => {     
            console.log(locationId);
            this.location.id = locationId;
            this.showToast("Location Updated", "toast-success");
            this.savingIndicator.dismiss();
            this.viewCtrl.dismiss({location : this.location});
        },
        err => {
            // Log errors if any
            this.showToast("Location Not Updated", "toast-warning");
            console.log(err);
        })
    }
    else {
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
            this.showToast("Location Not Saved", "toast-warning");
            console.log(err);
        })
    }
      
    
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(this.location.latitude, this.location.longitude);
      


      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.map);

      this.placeMarkerAndPanTo(latLng, this.map);

      this.map.addListener('click', (e) => {
        this.placeMarkerAndPanTo(e.latLng, this.map);
      });

    }, (err) => {
      console.log(err);
    });

  }

  placeMarkerAndPanTo(latLng, map) {
    if (!this.currentMarker){
      this.currentMarker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
    else {
      this.currentMarker.setPosition(latLng);
    }
     
    map.panTo(latLng);
    console.log("new location: " + latLng);
    this.location.latitude = latLng.lat();
    this.location.longitude = latLng.lng();

  }

  selectPlace(place){

    this.places = [];

    let location = {
        lat: null,
        lng: null,
        name: place.name
    };

    this.placesService.getDetails({placeId: place.place_id}, (details) => {

        this.zone.run(() => {

            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();


            this.map.setCenter({lat: location.lat, lng: location.lng}); 

            this.location = location;

        });

    });

  }

searchPlace(){

  if(this.query.length > 0 && !this.searchDisabled) {

      let config = {
          types: ['geocode'],
          input: this.query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

          if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

              this.places = [];

              predictions.forEach((prediction) => {
                  this.places.push(prediction);
              });
          }

      });

  } else {
      this.places = [];
  }

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
