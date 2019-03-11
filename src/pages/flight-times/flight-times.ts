import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';

/**
 * Generated class for the FlightTimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-times',
  templateUrl: 'flight-times.html',
})
export class FlightTimesPage {

  //@ViewChild('myChart')
  //myChart: BaseChartDirective;

  loadingIndicator;
  creature: Creature;
  flightTimes: any[] = [];
  weeks = [];
  currentWeekNumber = 0;
  currentLevel = 0;

  public barChartLabels: any[] = [1];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    }
  };
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData: any[] = [{data: [3], label: "no flight", backgroundColor: ["rgb(0, 0, 0"]},{data: [2], label: "flight"},{data: [6], label: "flight"},{data: [3], label: "flight"}];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.creature = navParams.get('creature');

      for (var i=4;i<48;i++){
        this.weeks.push(i);
      }
  }

  ionViewDidLoad() {
    this.barChartData[0].fillColor = "#000";
    console.log('ionViewDidLoad FlightTimesPage');
    this.currentWeekNumber = this.getWeekNumber();
    this.getFlightTimes();
    
  }

  getFlightTimes(){
    this.presentLoading();
    this.wildlifeProvider.getFlightTimes(this.creature.id).subscribe(
      (flightTimes: any[]) => {
          this.flightTimes = flightTimes;
          console.log(flightTimes);
          this.processFlightTimes(flightTimes);
          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
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

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting sightings...'
    });
    await this.loadingIndicator.present();
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
