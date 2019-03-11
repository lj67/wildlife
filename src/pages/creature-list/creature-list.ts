import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { SightingDetailPage } from '../sighting-detail/sighting-detail';
import { CreatureListDetailPage } from '../creature-list-detail/creature-list-detail';

/**
 * Generated class for the CreatureListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creature-list',
  templateUrl: 'creature-list.html',
})
export class CreatureListPage {

  classes: any[] = [];
  orderMode = 'name';

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreatureListPage');

        const segments = document.querySelectorAll('ion-segment')
        for (let i = 0; i < segments.length; i++) {
          segments[i].addEventListener('ionChange', (ev) => {
            console.log('Segment changed', ev);
          })
        }

        this.getClasses();
    }

    getClasses(){
      this.wildlifeProvider.getClasses().subscribe(
        (classes: any[]) => {
            this.classes = classes;
            console.log(classes);
            
        },
        err => {
            // Log errors if any
            console.log(err);
        })
    }

    expandItem(item){

      this.classes.map((listItem) => {

          if(item == listItem){
              listItem.expanded = !listItem.expanded;
          } else {
              listItem.expanded = false;
          }

          return listItem;

      });

    } 
  
    viewDetail(creature, e){
      e.stopPropagation();
      this.navCtrl.push(CreatureListDetailPage, {
        creature: creature
      });
    }



}
