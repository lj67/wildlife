import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';

/**
 * Generated class for the FlightTimesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-times-list',
  templateUrl: 'flight-times-list.html',
})
export class FlightTimesListPage {

  creatures: Creature[] = [];
  showLegend = false;
  showTitle = false;
  showAxis = false;
  weeks: any[] = [];
  currentWeek = 0;
  low: any[] = [];
  medium: any[] = [];
  high: any[] = [];
  activeSegment = "active";
  activeWeek = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wildlifeProvider: WildlifeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightTimesListPage');
    this.getCreatures();
    for (var i=4;i<48;i++){
      this.weeks.push(i);
    }
    this.currentWeek = this.getWeekNumber();
    this.activeWeek = this.currentWeek;
  }

  getCreatures(){
    this.wildlifeProvider.getAllFlightTimes().subscribe(
      (creatures: any[]) => {
          this.creatures = creatures;
          console.log(creatures);
          this.processFlightTimes();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  processFlightTimes(){
    this.creatures.forEach(creature => {
      creature.flightTimes.forEach(flight => {
        if (flight.rangeStart <= this.currentWeek && flight.rangeEnd >= this.currentWeek){
          if (flight.level == 1){
            this.low.push(creature);
          }
          if (flight.level == 2){
            this.medium.push(creature);
          }
          if (flight.level == 3){
            this.high.push(creature);
          }
        }
      
      });
      
    });
  }

  getWeekNumber() {
    let d = new Date();
    var date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.value;
    console.log(ev);
  }

}
