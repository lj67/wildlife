import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';

/**
 * Generated class for the FlightTimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'flight-time',
  templateUrl: 'flight-time.html'
})
export class FlightTimeComponent implements OnInit {

  @Input() creature : Creature;
  @Input() showTitle : boolean = true;
  @Input() showLegend : boolean = true;
  @Input() showAxis : boolean = true;
  flightTimes: any[] = [];
  weeks = [];
  currentWeekNumber = 0;
  currentLevel = 0;


  constructor(public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

  }

  ngOnInit(){
    this.currentWeekNumber = this.getWeekNumber();
    if (this.creature.flightTimes){ 
      this.flightTimes = this.creature.flightTimes;
      this.processFlightTimes(this.flightTimes); 
    }
    else {
      this.getFlightTimes();
    }
    
    for (var i=4;i<48;i++){
      this.weeks.push(i);
    }
  }

  getFlightTimes(){

    this.wildlifeProvider.getFlightTimes(this.creature.id).subscribe(
      (flightTimes: any[]) => {
          this.flightTimes = flightTimes;
          console.log(flightTimes);
          this.processFlightTimes(flightTimes);    
      },
      err => {
          // Log errors if any
          this.getFlightTimes();
          console.log(err);
      })
  }

  processFlightTimes(flightTimes){
    let isFirst = true;
    let periods = [];
    let previousFlight;
    let startWeek = 4;
    let endWeek = 48;
    flightTimes.forEach(flight => {
      if (isFirst){
        if (flight.rangeStart != 1){
          let newFlight = {level: 0, rangeStart: 4, rangeEnd: flight.rangeStart, weeks: flight.rangeStart - startWeek};
          periods.push(newFlight);
        }
      }
      if (!isFirst && flight.rangeStart != previousFlight.rangeEnd){
        let newFlight = {level: 0, rangeStart: previousFlight.rangeEnd, rangeEnd: flight.rangeStart, weeks: flight.rangeStart - previousFlight.rangeEnd};
        periods.push(newFlight);
      }

      if (flight.rangeStart < startWeek) flight.rangeStart = startWeek;
      if (flight.rangeEnd > endWeek) flight.rangeEnd = endWeek;
      flight.weeks = flight.rangeEnd - flight.rangeStart;
      periods.push(flight);
      if (isFirst) isFirst = false; 
      previousFlight = flight;

      if (flight.rangeStart <= this.currentWeekNumber && flight.rangeEnd >= this.currentWeekNumber){
        this.currentLevel = flight.level;
      }
      
      
    });

    if (previousFlight.rangeEnd != 48){
      let newFlight = {level: 0, rangeStart: previousFlight.rangeEnd, rangeEnd: endWeek, weeks: endWeek - previousFlight.rangeEnd };
        periods.push(newFlight);
    }

    this.flightTimes = periods;
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

}
