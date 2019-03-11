import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { Creature } from '../../objects/creature';
import { Stats } from '../../objects/stats';
import { SightingsForCreaturePage } from '../sightings-for-creature/sightings-for-creature';

/**
 * Generated class for the SightingsForCreatureStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sightings-for-creature-stats',
  templateUrl: 'sightings-for-creature-stats.html',
})
export class SightingsForCreatureStatsPage {

  loadingIndicator;
  creature: Creature;
  stats: Stats = new Stats;
  tableToShow: String = "perYear";
  public barChartLabels: any[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [{data: []}];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions: any = {
    responsive: true,
    legend: {position: 'right'}
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.creature = navParams.get('creature');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingsForCreatureStatsPage');

    this.getStats();
  }

  getStats(){
    this.presentLoading();
    this.wildlifeProvider.getStatsForCreature(this.creature.id).subscribe(
      (stats: Stats) => {
          this.stats = stats;
          this.createYearData();
          this.createMonthData();
          console.log(stats);
          this.loadingIndicator.dismiss();
          
      },
      err => {
          // Log errors if any
          console.log(err);
      })
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      content: 'Getting images...'
    });
    await this.loadingIndicator.present();
  }

  segmentChanged(event){

    this.tableToShow = event._value;
    console.log(event._value);
  }

  createYearData(){
    let data = [];
    this.stats.sightingsPerYear.forEach(row => {
      this.barChartLabels.push(row.year);
      data.push(row.total);
    });

    return this.barChartData = [{data : data, label: 'Sightings'}];
  }

  createMonthData(){

    this.stats.sightingsPerMonth.forEach(row => {
      this.doughnutChartData.push(row.total);
      this.doughnutChartLabels.push(this.getMonthName(row.month));
    });

  }

  viewSightingsForMonth(creature, month){

    this.navCtrl.push(SightingsForCreaturePage, {
      creature: creature,
      filter: "month",
      month: month
    });

  }

  viewSightingsForYear(creature, year){

    this.navCtrl.push(SightingsForCreaturePage, {
      creature: creature,
      filter: "year",
      year: year
    });

  }


  getMonthName(month){
    if (month == 1) return "Jan";
    else if (month == 2) return "Feb";
    else if (month == 3) return "Mar";
    else if (month == 4) return "Apr";
    else if (month == 5) return "May";
    else if (month == 6) return "Jun";
    else if (month == 7) return "Jul";
    else if (month == 8) return "Aug";
    else if (month == 9) return "Sep";
    else if (month == 10) return "Oct";
    else if (month == 11) return "Nov";
    else if (month == 12) return "Dec";
  }

}
