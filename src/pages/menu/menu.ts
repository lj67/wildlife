import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsPage } from '../locations/locations';
import { LocationDetailPage } from '../location-detail/location-detail';
import { ButterflySearchPage } from '../butterfly-search/butterfly-search';
import { ImageTaggerPage } from '../image-tagger/image-tagger';
import { FlightTimesListPage } from '../flight-times-list/flight-times-list';
import { StatsPage } from '../stats/stats';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  menu: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.menu = [
                  {name: "Locations"},
                  {name: "Menu 2"},
                  {name: "Menu 3"},
                  {name: "Menu 4"}
                ]
  }

  expandItem(item){

    this.menu.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  } 
  
  viewLocations(){

    this.navCtrl.push(LocationsPage, {
      location: location
    });

  }

  viewButterflySearch(){

    this.navCtrl.push(ButterflySearchPage, {
      
    });

  }

  viewStats(){

    this.navCtrl.push(StatsPage, {
      
    });

  }

  viewImageTagger(){

    this.navCtrl.push(ImageTaggerPage, {
      
    });

  }

  viewFlightTimes(){

    this.navCtrl.push(FlightTimesListPage, {
      
    });

  }

}
