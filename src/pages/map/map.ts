import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../objects/location';
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
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  location: Location;
  map: any;
  marker;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, public viewCtrl: ViewController) {

      this.location = navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
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

      this.placeMarkerAndPanTo(latLng, this.map);

      this.map.addListener('click', (e) => {
        this.placeMarkerAndPanTo(e.latLng, this.map);
      });

    }, (err) => {
      console.log(err);
    });

  }

  placeMarkerAndPanTo(latLng, map) {
    this.marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    
    map.panTo(latLng);

  }

  back(){
    this.viewCtrl.dismiss();
  }

}
