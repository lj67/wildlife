import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { CreatureListDetailPage } from '../creature-list-detail/creature-list-detail';
import { Creature } from '../../objects/creature';

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
  filteredClasses;
  searchStr: string = '';

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
            this.setFilteredCreatures();
            
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

    setFilteredCreatures(){

      this.filteredClasses = Object.assign([], this.classes);
      this.filteredClasses = this.filterClasses(this.searchStr);

      this.filteredClasses.forEach(clazz => {
        clazz.creatures = this.filterCreatures(clazz, this.searchStr);
      });
  
    }
  
    filterClasses(searchTerm){

      let searchString = searchTerm.toLowerCase();                       // do this only once instead of calling toLowerCase over and over again, besides we are using a regular function (not an arrow one) so "this" will be messed up anyways
      return this.filteredClasses.filter(function search(row) {                        // name the function so we can use recursion (thus we can't use an arrow function)
        return Object.keys(row).some((key) => {                               // ...
            if(typeof row[key] === "string") {                                // if the current property is a string
                return row[key].toLowerCase().indexOf(searchString) > -1;     // then check if it contains the search string
            } else if(row[key] && typeof row[key] === "object") {             // oterwise, if it's an object
                return search(row[key]);                                      // do a recursive check
            }
            return false;                                                     // return false for any other type (not really necessary as undefined will be returned implicitly)
        });
      });

      // return this.classes.filter((clazz: any) => {
      //   return clazz.creatures.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      // });  
  
      // location.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      // return this.classes.filter(clazz => value.includes(clazz.id));
    }

    filterCreatures(clazz, searchTerm){
      return clazz.creatures.filter((creature: Creature) => {
        return creature.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }); 

    }
  
    viewDetail(creature, e){
      e.stopPropagation();
      this.navCtrl.push(CreatureListDetailPage, {
        creature: creature
      });
    }



}
