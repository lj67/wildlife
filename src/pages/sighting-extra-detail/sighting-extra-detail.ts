import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

/**
 * Generated class for the SightingExtraDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sighting-extra-detail',
  templateUrl: 'sighting-extra-detail.html',
})
export class SightingExtraDetailPage {

  sightings: Sightings;
  map: GoogleMap;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation, 
    public viewCtrl: ViewController, 
    public wildlifeService: WildlifeProvider,
    private toast: Toast) {

    this.sightings = navParams.get('sightings');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingExtraDetailPage');
    this.getPosition();

    if (this.sightings.Date === undefined){ this.sightings.Date = (new Date()).toISOString().substring(0, 10);}
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.sightings.lat = resp.coords.latitude;
      this.sightings.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  tempClick(id){
    this.sightings.TempId = id;
  }

  weatherClick(id){
    this.sightings.WeatherId = id;
  }

  cancel(){
      this.viewCtrl.dismiss();
  }

  showToast(){
    this.toast.show(`Saved sightings`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
  }

  save(){
    this.wildlifeService.saveSightings(this.sightings).subscribe(
        data => {
            
            console.log(data);
            this.showToast();


            
        },
        err => {
            // Log errors if any
            console.log(err);
        })
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}