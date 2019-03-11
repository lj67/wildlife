import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, App, LoadingController } from 'ionic-angular';
import { Sightings } from '../../objects/sightings';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingPage } from '../sighting/sighting';
import { TabsPage } from '../tabs/tabs';
import { Location } from '../../objects/location';

/**
 * Generated class for the SightingExtraDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-sighting-extra-detail',
  templateUrl: 'sighting-extra-detail.html',
})
export class SightingExtraDetailPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  mode: number = 1;
  sightings: Sightings;
  query: string = '';
  searchDisabled: boolean;
  autocompleteService: any;
  placesService: any;
  places: any = [];
  location: any;  
  lat: string = "";
  long: string = "";
  currentMarker: any;
  savingIndicator;
  locations: Location[] = [];
  currentLocationLatLng = "";


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation, 
    public viewCtrl: ViewController, 
    public wildlifeProvider: WildlifeProvider,
    private toast: Toast,
    public toastController: ToastController,
    public zone: NgZone,
    public appCtrl: App,
    public loadingController: LoadingController) {

    this.sightings = navParams.get('sightings');
    this.mode = navParams.get('mode'); //1 = new, 2 = update, 3 = view-only
    this.searchDisabled = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingExtraDetailPage');
    //this.getPosition();
    this.loadMap();
    this.getLocations();

    if (this.sightings.trip.date === undefined){ this.sightings.trip.date = (new Date()).toISOString().substring(0, 10);}
    if (this.sightings.trip.time === undefined){ this.sightings.trip.time = (new Date()).getHours() + ":" + new Date().getMinutes() ;}
  }

  getLocations(){
    this.wildlifeProvider.getLocations().subscribe(
      (locations: any[]) => {
          this.locations = locations;
          console.log(locations);
          this.findClosestLocations(this.map);
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  findClosestLocations(map){

    //let map = new google.maps();

    this.locations.forEach(location => {
      let latLng = new google.maps.LatLng(location.latitude, location.longitude);
      console.log(latLng.lat() + " " + latLng.lng());
      location.distance = google.maps.geometry.spherical.computeDistanceBetween (latLng, this.currentLocationLatLng);
      
    });

    this.sortLocations("distance", "ASC");
    
  }

  sortLocations<T>(propName: keyof Location, order: "ASC" | "DESC"): void {
    this.locations.sort((a, b) => {
        if (a[propName] < b[propName])
            return -1;
        if (a[propName] > b[propName])
            return 1;
        return 0;
    });
  } 
  

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = "";

      if (this.sightings.trip.latitude && this.sightings.trip.longitude){
        latLng = new google.maps.LatLng(this.sightings.trip.latitude, this.sightings.trip.longitude);
      }
      else{
        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      }

      this.currentLocationLatLng = latLng;

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // this.currentMarker = new google.maps.Marker({
      //   position: position,
      //   map: this.map,
      //   title: 'Click to zoom'
      // });

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.map);
      this.searchDisabled = false;
      this.placeMarkerAndPanTo(latLng, this.map);
      this.getLocations();
      // this.map.addListener('center_changed', function() {
      //   // 3 seconds after the center of the map has changed, pan back to the
      //   // marker.
      //   window.setTimeout(function() {
      //     map.panTo(marker.getPosition());
      //   }, 3000);
      // });

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
    console.log(latLng);
    this.sightings.trip.latitude = latLng.lat();
    this.sightings.trip.longitude = latLng.lng();
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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

  tempClick(id){
    this.sightings.trip.tempId = id;
  }

  weatherClick(id){
    this.sightings.trip.weatherId = id;
  }

  cancel(){
      this.viewCtrl.dismiss();
  }

  addTotal(creature){
    creature.total ++;
  }

  decTotal(creature){
    creature.total--;
    if (creature.total < 1) creature.total = 0;
  }

  async showToast(){
    
    const toast = await this.toastController.create({
      message: 'Saved sightings',
      showCloseButton: true,
      position: 'center',
      closeButtonText: 'Done',
      duration: 5000
    });
    toast.present();
  }

  canSave(){
    return this.mode != 3;
  }

  save(){
    this.presentLoading();
    if (this.mode == 1){
      this.wildlifeProvider.saveSightings(this.sightings).subscribe(
        data => {     
            console.log(data);
            this.showToast();
            this.sightings.creatures.length = 0;
            this.cancel();
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();
            this.savingIndicator.dismiss();
        },
        err => {
            // Log errors if any
            console.log(err);
        })
      }
    else {
      this.wildlifeProvider.updateSightings(this.sightings).subscribe(
        data => {   
            console.log(data);
            this.showToast();
            this.cancel();
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();
            this.savingIndicator.dismiss();
        },
        err => {
            // Log errors if any
            console.log(err);
        })
      }
    }
  
    async presentLoading() {
      this.savingIndicator = await this.loadingController.create({
        content: 'Saving...'
      });
      await this.savingIndicator.present();
    }
    
}
